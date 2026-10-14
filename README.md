# Split the Bill

A task for the ReDI School workshop on agentic development. After the workshop we have dinner together. Build an app that splits a shared bill fairly, and make sure the AI agent gets the math right.

**What you practise:** spec first. Write down what "correct" means before the agent writes code, then hold the agent to it.

The project starts from the workshop's React, TypeScript and Vite template, which displays **Hello World**. [APP_BRIEF.md](APP_BRIEF.md) describes the first version of the app, [AGENTS.md](AGENTS.md) the rules for the agent.

## Get Started

1. **Fork:** on GitHub, click *Fork* at the top of this page. GitHub creates your own copy of the repository.
2. **Check Git:** open Command Prompt (Windows) or Terminal (macOS, Linux) and run `git config user.name` and `git config user.email`. Each should print a value. If not, set them with `git config --global user.name "Your Name"` and `git config --global user.email "you@example.com"`. If your e-mail address should not become public on GitHub, use your GitHub no-reply address (GitHub → *Settings* → *Emails*).
3. **Clone and run:** on your fork's page, click *Code* and copy the HTTPS URL. Then run:

   ```sh
   git clone https://github.com/<your-user-name>/redischool-workshop-split-the-bill.git
   cd redischool-workshop-split-the-bill
   npm ci
   npm run dev
   ```

   Open the local URL printed in the terminal, usually http://localhost:5173. You should see **Hello World**. If forking does not work, clone this repository directly; you can still commit locally.
4. **Start the agent:** `npm run dev` keeps running in this window. Open a second window in the same folder and start your AI coding agent there, for example `claude` for Claude Code or `codex` for OpenAI Codex. With GitHub Copilot, open the folder in VS Code and use Copilot Chat in agent mode.
5. **Check the rules:** ask the agent *"Which instructions apply in this repository?"* It should name the rules from [AGENTS.md](AGENTS.md). If it does not, see [If the agent does not know the rules](#if-the-agent-does-not-know-the-rules).
6. **Read the brief:** read [APP_BRIEF.md](APP_BRIEF.md) together, then follow the steps below.

If you get stuck, ask a facilitator in the room.

## How You Work

### Roles

- **Pilot** (less experience): writes the prompts, runs the app, keeps the loop log.
- **Navigator** (more experience): reviews plans and changes, asks "How do we know it works?", helps with Git. The navigator does not take over the keyboard.
- **Scribe** (only in a group of three): keeps the loop log and checks the acceptance criteria.

Swap roles at least once, at the latest at the checkpoint.

### Steps

| Time | Step | What you do |
|---|---|---|
| 14:45 | Setup | [Get started](#get-started). |
| 14:55 | Brief | Read and complete [APP_BRIEF.md](APP_BRIEF.md). |
| 15:10 | Plan | Ask the agent for a plan, review it, cut it down to the first version. |
| 15:20 | First version | Describe → build → verify → improve. Commit after each working step. |
| 15:45 | Checkpoint | The first version runs. If not, cut scope with a facilitator. Swap roles. |
| 15:45 | Level-ups | Later challenge steps, level-ups, side quests. |
| 16:20 | Presentation | Prepare five minutes from your loop log. |

### Loop Log

Write one line per loop into [LOOP_LOG.md](LOOP_LOG.md): what you asked, what happened, what you changed. It is the basis of your presentation.
## Agent Challenge

During *Brief* and *Plan*:

1. Read the acceptance criteria in [APP_BRIEF.md](APP_BRIEF.md) together. The navigator adds one more tricky case the agent might get wrong, for example an amount with three decimals like 10.005 €.
2. 100 € for three people leaves one cent over. Decide who carries it and record it under *Project decisions*.
3. Before implementation, ask: *"How will you make sure the amounts always add up to the cent?"* Review the answer.

During *First version*:

4. Check every criterion in the browser. Report errors with exact numbers: not "the split is wrong", but "100 € for three people shows +66.67 € for the payer and −33.33 € for both others, so the balances add up to 0.01 €".

## Level-Ups

After the checkpoint, pick what you like:

- Who pays whom: settle all debts with as few transfers as possible.
- Unequal splits: an expense for only some people, or by shares.
- Categories and a spending summary per category.
- Let the agent prove it: ask for automated tests of the calculation. The template has no test tool yet, so the agent adds one and a `test` script; record that under *Project decisions*. Then break the calculation on purpose and see whether the tests catch it.
- A summary text to copy into a group chat.

## Make It Yours

Use the same steps for a variant: shared flat budget, trip budget with fixed sample exchange rates, personal expense tracker with monthly budgets. Update [APP_BRIEF.md](APP_BRIEF.md) first.

## Side Quests

These fit after the checkpoint.

- **Explain it to me:** a fresh agent session explains one file to the pilot in beginner language. The navigator checks whether the explanation is correct.
- **Break it on purpose:** the navigator secretly introduces a bug. The pilot describes only the symptom to the agent. How quickly does it find the cause?
- **Git explained:** ask the agent to show and explain the last three commits. Useful if Git is new to you.

## Save Your Work on GitHub

Optional. [AGENTS.md](AGENTS.md) tells the agent never to push. To put your commits on your fork, either run `git push` yourself, or tell the agent explicitly that it may push to your fork and record that under *Explicit overrides* in [APP_BRIEF.md](APP_BRIEF.md).

## If the Agent Does Not Know the Rules

If the setup question does not name the rules from `AGENTS.md`:

- **Claude Code:** reads `AGENTS.md` directly from version 2.1.277 and shows a line like *"AGENTS.md loaded"* at the start of a session. It does not when a `CLAUDE.md` or `CLAUDE.local.md` exists in the folder or above it. Fix: update Claude Code, or create a `CLAUDE.md` containing only `@AGENTS.md` ([documentation](https://code.claude.com/docs/en/memory#agents-md)).
- **Any tool:** start the first prompt with *"Read AGENTS.md and APP_BRIEF.md and follow them."*

## Install prerequisites

To run the app, you need **Node.js 24 LTS**, **npm** (included with Node.js), and a web browser. Install **Git** to clone the repository and save changes. React, TypeScript, and Vite are installed locally by `npm ci`; they do not need separate system-wide installations.

Complete this setup before the workshop:

| System | Node.js and npm | Git | Terminal to use |
| --- | --- | --- | --- |
| macOS | On the [Node.js download page](https://nodejs.org/en/download), select Node 24 LTS and macOS, then download and run the `.pkg` installer. | Run `xcode-select --install` and follow the prompts. See the [macOS Git guide](https://git-scm.com/install/mac). | Terminal |
| Linux | Follow the [nvm installation guide](https://github.com/nvm-sh/nvm#installing-and-updating), reopen your terminal, then run `nvm install 24` and `nvm use 24`. See also the [Node/npm installation guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/). | Use your distribution's package manager: for Ubuntu/Debian, run `sudo apt update` followed by `sudo apt install git`. See the [Linux Git guide](https://git-scm.com/install/linux) for other distributions. | Your usual terminal |
| Windows | On the [Node.js download page](https://nodejs.org/en/download), select Node 24 LTS and Windows, then download and run the `.msi` installer with the default settings. | Install [Git for Windows](https://git-scm.com/install/windows) with the default settings. | Command Prompt |

Reopen your terminal after installing, then verify:

```sh
node --version
npm --version
git --version
```

Node should print `v24.x.x`; npm and Git should each print a version number. If a command is not found, check that installation finished and reopen the terminal.

If you already use nvm on macOS or Linux, run `nvm install` and `nvm use` inside this repository to select the version in `.nvmrc`.

## Run locally

1. Clone your fork using its Git URL, then open a terminal in the cloned folder.
2. Install the dependencies:

   ```sh
   npm ci
   ```

3. Start the development server:

   ```sh
   npm run dev
   ```

4. Open the local URL printed in the terminal, usually http://localhost:5173.
   You should see **Hello World**. Edits to `src/App.tsx` update the page automatically.

Press `Ctrl+C` in the terminal to stop the server.

## Check and build

```sh
npm run lint
npm run build
```

The build command checks TypeScript and creates the production files in `dist/`.
To view the built app locally, run `npm run preview` after building and open the URL printed in the terminal.
