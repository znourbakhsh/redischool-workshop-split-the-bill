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

## Demo acceptance criteria

- Given Ana, Ben and Cem, when Ana pays 30.00 € for everyone, then Ana's balance is +20.00 € and Ben's and Cem's balances are −10.00 € each.
- Given three people, when one of them pays 100.00 € for everyone, then all balances add up to exactly 0.00 € and every amount shows two decimals.
- Given an empty, zero or negative amount, when the user adds the expense, then a readable error message appears and no expense is added.

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

- When an amount cannot be split evenly, who carries the leftover cent? Decide before implementation and record the answer under *Project decisions*.

## Project decisions

None yet.
