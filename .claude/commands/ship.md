---
description: Analyze changed files, group into logical commits, commit and push
---

# Ship Changes (Git Commit & Push)

Analyzes the current working tree, groups changes into logical commits, writes clear commit messages/descriptions, creates commits, and pushes the branch. Dont mention claude code in description of commits.

## What happens

1. Collects metadata (branch, HEAD commit, timestamp)
2. Inspects all local changes (staged + unstaged + untracked)
3. Builds a logical commit plan by grouping files/patches by intent
4. Creates commits with clean messages and detailed descriptions
5. Runs lightweight verification steps when available (tests/lint/build)
6. Pushes current branch to remote (sets upstream if missing)
7. Prints a concise summary and a resume/debug checklist

## Commit Grouping Rules

The agent MUST group changes by intent and avoid mixing unrelated concerns:

- One commit = one purpose (feature / fix / refactor / tests / docs / tooling)
- Do NOT mix formatting-only changes with behavior changes (split if feasible)
- Keep mechanical changes (rename/move, mass reformat, dependency bumps) separate
- Prefer sequencing:
  1) prep/refactor (no behavior change)
  2) behavior change (feature/fix)
  3) tests
  4) docs/chore
- If a single file contains multiple concerns, use patch staging to split hunks

## Commit Message Style

Use a consistent style, without mentioning tools or agents. Recommended:

- `feat: <summary>`
- `fix: <summary>`
- `refactor: <summary>`
- `test: <summary>`
- `docs: <summary>`
- `chore: <summary>`

Body requirements:
- Explain **what** changed and **why**
- Include impact/risk notes if relevant
- Include a quick “how to verify” when it matters

## Implementation Steps

The agent should follow this exact workflow:

### 1) Metadata & status

- `git rev-parse --show-toplevel`
- `git branch --show-current`
- `git rev-parse HEAD`
- `git status -sb`
- `git diff`
- `git diff --staged`
- `git diff --name-status`
- `git ls-files -m -o --exclude-standard`

### 2) Build commit plan

- Produce a proposed list of commits:
  - Commit title
  - Included files (and notes if patch-splitting is needed)
  - Commit body (bullets)
- Ensure minimal coupling and clean history.

### 3) Stage per commit

- If needed: `git add -p` to split hunks
- Otherwise: `git add <files...>`
- Validate staged content: `git diff --staged`

### 4) Commit

For each planned commit:
- `git commit -m "<type>: <summary>" -m "<body...>"`

### 5) Verify (best-effort)

Run the most likely checks if present in repo (choose what applies):
- JS/TS: `npm test` / `pnpm test` / `yarn test`, `npm run lint`, `npm run build`
- Python: `pytest`, `ruff`, `mypy`
- Go: `go test ./...`
- Rust: `cargo test`

If no known commands exist, skip but state that verification was not run.

### 6) Push

- Determine remote: `git remote -v`
- Push current branch:
  - If upstream missing: `git push -u origin <branch>`
  - Else: `git push`

 