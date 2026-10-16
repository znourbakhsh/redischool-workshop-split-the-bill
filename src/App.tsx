import { useState } from 'react'
import type { FormEvent } from 'react'

type Person = { id: number; name: string }
type Expense = { description: string; cents: number; payer: number; peopleCount: number; included: boolean }
const money = (cents: number) => new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(cents / 100)

// Combine expenses for the same group before rounding to whole cents.
function calculateShares(expenses: Expense[], peopleCount: number) {
  const shares = Array<number>(peopleCount).fill(0)
  const groups = new Map<number, Expense[]>()
  for (const expense of expenses.filter(expense => expense.included)) {
    const group = groups.get(expense.peopleCount) ?? []
    group.push(expense)
    groups.set(expense.peopleCount, group)
  }
  for (const [count, group] of groups) {
    const total = group.reduce((sum, expense) => sum + expense.cents, 0)
    const roundedUp = Math.ceil(total / count)
    const discountCount = roundedUp * count - total
    const payers = [...new Set(group.map(expense => expense.payer))]
    const discountOrder = [...payers, ...Array.from({ length: count }, (_, index) => index).filter(index => !payers.includes(index))]
    for (let index = 0; index < count; index++) {
      shares[index] += roundedUp - (discountOrder.indexOf(index) < discountCount ? 1 : 0)
    }
  }
  return shares
}

export default function App() {
  const [people, setPeople] = useState<Person[]>([])
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [payer, setPayer] = useState('')
  const [personError, setPersonError] = useState('')
  const [expenseError, setExpenseError] = useState('')
  const [settled, setSettled] = useState(false)
  const selectedExpenses = expenses.filter(expense => expense.included)
  const total = selectedExpenses.reduce((sum, expense) => sum + expense.cents, 0)
  const shares = calculateShares(expenses, people.length)

  function addPerson(event: FormEvent) {
    event.preventDefault()
    const trimmed = name.trim()
    if (!trimmed || people.some(person => person.name.toLowerCase() === trimmed.toLowerCase())) {
      setPersonError(trimmed ? 'This name is already in the group. Use a different name.' : 'Enter a name to add someone.')
      return
    }
    const id = people.length
    setPeople([...people, { id, name: trimmed }])
    if (!payer) setPayer(String(id))
    setName('')
    setPersonError('')
  }

  function addExpense(event: FormEvent) {
    event.preventDefault()
    const normalized = amount.trim().replace(',', '.')
    const cents = Math.round(Number(normalized) * 100)
    if (!/^\d+(\.\d{1,2})?$/.test(normalized) || !Number.isSafeInteger(cents) || cents <= 0 || cents > 100_000_000) {
      setExpenseError('Enter an amount from €0.01 to €1,000,000 with up to two decimal places.')
      return
    }
    if (payer === '' || !people.some(person => person.id === Number(payer))) {
      setExpenseError('Add a person and choose who paid first.')
      return
    }
    if (!description.trim()) {
      setExpenseError('Give the expense a short description.')
      return
    }
    setExpenses([...expenses, { description: description.trim(), cents, payer: Number(payer), peopleCount: people.length, included: true }])
    setSettled(false)
    setAmount('')
    setDescription('')
    setExpenseError('')
  }

  function clearPaidTab() {
    setExpenses([])
    setExpenseError('')
    setSettled(true)
  }

  return (
    <main>
      <header><a className="brand" href="./"><span className="brand-icon">÷</span> split the bill.</a><span className="tag">GOOD TIMES, SHARED FAIRLY</span></header>
      <section className="intro"><span className="eyebrow">LESS MATH. MORE MEMORIES.</span><h1>Great company.<br /><span>Even splits.</span></h1><p>Dinner, a weekend away, or just coffee. Keep track of what everyone paid and let the numbers take care of themselves.</p></section>
      <div className="workspace">
        <div className="forms">
          <section className="card"><div className="heading"><span className="step">01</span><h2>Who's in?</h2><span className="count">{people.length} people</span></div><p className="hint">Start by adding your friends.</p>
            <form onSubmit={addPerson} noValidate><label htmlFor="name">Name</label><div className="inline"><input id="name" value={name} onChange={event => setName(event.target.value)} placeholder="e.g. Ana" maxLength={40} aria-describedby={personError ? 'person-error' : undefined} aria-invalid={!!personError} /><button type="submit">Add person +</button></div>{personError && <p className="error" id="person-error" role="alert">{personError}</p>}</form>
            <div className="people">{people.map(person => <span className="person" key={person.id}><span className="avatar">{person.name[0].toUpperCase()}</span>{person.name}</span>)}</div>
            {people.length === 0 && <p className="empty">Your group starts here. Add your first person above.</p>}
          </section>
          <section className="card"><div className="heading"><span className="step">02</span><h2>Add an expense</h2></div><p className="hint">One person paid. Everyone shares equally.</p>
            <form onSubmit={addExpense} noValidate><label htmlFor="description">What was it for?</label><input id="description" value={description} onChange={event => setDescription(event.target.value)} placeholder="e.g. Friday night dinner" maxLength={100} /><div className="field-row"><div><label htmlFor="amount">Amount (€)</label><input id="amount" inputMode="decimal" value={amount} onChange={event => setAmount(event.target.value)} placeholder="0.00" /></div><div><label htmlFor="payer">Paid by</label><select id="payer" value={payer} onChange={event => setPayer(event.target.value)}><option value="" disabled>Choose a person</option>{people.map(person => <option key={person.id} value={person.id}>{person.name}</option>)}</select></div></div>{expenseError && <p className="error" role="alert">{expenseError}</p>}<button className="wide" type="submit">Add expense <span aria-hidden="true">↗</span></button></form>
            <p className="footnote">Shared with everyone currently in the group.</p>
          </section>
        </div>
        <aside className="card balance-card"><div className="heading"><span className="step">03</span><h2>The balance</h2><span className="count">LIVE</span></div><div className="total"><span>Selected total</span><strong>{money(total)}</strong><span>{selectedExpenses.length} selected expenses · {people.length} people</span></div>
          <div aria-live="polite">{people.length === 0 ? <div className="empty-balance"><span aria-hidden="true">↔</span><h3>A little balance goes a long way.</h3><p>Add your group and an expense.<br />Everyone's share will appear here.</p></div> : people.map(person => {
            const paid = selectedExpenses.reduce((sum, expense) => sum + (expense.payer === person.id ? expense.cents : 0), 0)
            const balance = paid - shares[person.id]
            return <div className="balance-row" key={person.id}><span className="avatar">{person.name[0].toUpperCase()}</span><div className="balance-name"><strong>{person.name}</strong><span>Share {money(shares[person.id])} · paid {money(paid)}</span><span>{balance > 0 ? 'gets back' : balance < 0 ? 'owes' : 'all square'}</span></div><strong className={balance > 0 ? 'positive' : balance < 0 ? 'negative' : ''}>{balance > 0 ? '+' : balance < 0 ? '−' : ''}{money(Math.abs(balance))}</strong></div>
          })}</div><p className="balance-note">Every cent accounted for.<br />Selected costs are added before splitting.<br />Payers get the smaller share when rounding is needed.</p>
          {expenses.length > 0 && <div className="settle-tab"><button type="button" className="wide" onClick={clearPaidTab}>Everyone has paid — clear tab</button><p className="footnote">Use after everyone has paid their share. Removes these expenses and keeps your group.</p></div>}
          <div role="status">{settled && <p className="settled-message">All settled! Previous expenses cleared. Your group is ready for the next meal.</p>}</div>
        </aside>
      </div>
      <section className="card activity"><div className="heading"><h2>The shared tab</h2><span className="count">{expenses.length} expenses</span></div><p className="hint">Check expenses to include them in the total. Uncheck paid expenses to leave them out; check again to add them back.</p>{expenses.length === 0 ? <p className="empty">No expenses yet. Your next shared memory goes here.</p> : <ul>{expenses.map((expense, index) => <li key={index}><input className="expense-checkbox" type="checkbox" aria-label={`Include ${expense.description}, ${money(expense.cents)}, paid by ${people[expense.payer].name}`} checked={expense.included} onChange={event => {
        setExpenses(expenses.map((item, itemIndex) => itemIndex === index ? { ...item, included: event.target.checked } : item))
      }} /><div><strong>{expense.description}</strong><p>{people[expense.payer].name} paid · split between {expense.peopleCount}</p></div><strong>{money(expense.cents)}</strong></li>)}</ul>}</section>
      <footer>Made for sharing, without the awkward maths.<span>This session only · Refreshing clears your group.</span></footer>
    </main>
  )
}
