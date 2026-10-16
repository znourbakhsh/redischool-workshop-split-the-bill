# App brief

This brief describes the first version of the app. Change it when your team decides something new; the agent follows it. Unfilled points are not requirements; the agent should ask about missing details needed for implementation.

## App name

Split the Bill

## User and problem

- Who will use it? A group of friends who share costs, for example for a dinner or a trip.
- What problem does it solve? Working out by hand who owes how much is slow and error-prone.

## Main user journey

The user adds the people in the group, enters an expense that one person paid for everyone, and finishes by seeing each person's balance.

## Must-have features

1. Add people to the group.
2. Add an expense paid by one person and shared equally by everyone.
3. Show each person's balance. A positive balance means the person gets money back; a negative balance means the person owes money.
4. Select or exclude individual expenses using checkboxes in the shared tab.
5. After everyone has paid their share, clear the tab and reset all balances while keeping the group.

## Demo acceptance criteria

- Given Ana, Ben and Cem, when Ana pays 30.00 € for everyone, then Ana's balance is +20.00 € and Ben's and Cem's balances are −10.00 € each.
- Given three people, when one of them pays 100.00 € for everyone, then all balances add up to exactly 0.00 € and every amount shows two decimals.
- Given an empty, zero or negative amount, when the user adds the expense, then a readable error message appears and no expense is added.
- After clearing a paid lunch tab, a new dinner expense affects balances on its own. Lunch expenses are removed, and the group stays available.

- Given three people and selected costs of €100 and €50, each share is exactly €50.00.
- Given €50 paid by one of three people, the payer’s share is €16.66 and the other shares are €16.67.
- Unchecking an expense excludes its cost and payer credit; rechecking restores them.

## Sample data

Fictional names and amounts only, for example Ana, Ben and Cem.

## Out of scope

- Keeping data after a page reload
- Unequal splits or expenses for only some people
- Several currencies
- Suggesting transfers to settle debts
- Level-ups from README.md, until the team adds them to this brief

## Explicit overrides

None. Use the defaults in `AGENTS.md` unless the participant explicitly requests an override.

When an override is requested, replace "None" with the specific participant decision and its scope. Only record decisions actually requested or approved by the participant; the agent must not propose alternative stacks or excluded features proactively.

## Open questions

- None for the first version.

## Project decisions

- Combine selected expenses for the same group before dividing and rounding in whole cents. Give smaller rounded shares to payers first, in expense order, then other people in group order. Balances always sum to zero.
- Each expense is shared by the people present when it is added. Adding someone later does not change earlier expenses.
- Paid expenses are removed when the user selects “Everyone has paid — clear tab”; no previous expense history is kept. This records the user's confirmation that everyone has paid; the app does not process payments.

- Each expense has an inclusion checkbox, checked by default. Unchecked expenses stay visible but do not affect totals, shares, or balances. They can be included again.
- Display each person’s share of the selected total and the amount they already paid alongside their net balance.
