# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development conventions

### Tests for all development

Every change ships with tests in the same commit/PR — new features, bug fixes and config changes that alter behavior (e.g. `firebase.json` redirects are covered by `src/firebaseHosting.test.ts`).

- Frontend: Jest + React Testing Library, co-located with the code (`Component/index.test.tsx`, `helpers/cpf.test.ts`). Test behavior a user sees, not implementation details. Tests live under `src/` (CRA only discovers tests there).
- UI tests: every new or changed UI (page, component, form, nav link, data-driven card/hero content) needs a UI test with React Testing Library that renders it (wrap router-dependent components in `MemoryRouter`) and asserts what the user sees and can do — visible text, links/`href`s, form validation messages, submit behavior (mock `fetch`), and interactions via `@testing-library/user-event`. Query by role/label/text, not CSS classes. Changes with no UI (functions, config) are exempt from this rule but still need the tests above.
- Bug fixes: first add a test that reproduces the bug, then fix it.
- New pages: at least a render test, plus tests for any form validation or data-driven content.
- Functions (`functions/`): add tests for new or changed handlers (mock SendGrid/Firebase; never call real services).
- Run `CI=true npm test` and make sure it passes before committing or opening a PR. If something is genuinely untestable, say why in the PR description instead of skipping silently.

CI enforces this: `deploy-hosting.yml` (`develop`) and `release-hosting.yml` (`main`) run a `test` job (`npm ci`, `npm test`), and the deploy job has `needs: test`, so nothing is deployed unless every test passes.

### Commit and PR descriptions

Always write clear descriptions.

- Commits: a Conventional-Commits-style subject (`feat(scope): what changed`, imperative, under ~72 chars) plus a body explaining what changed and why, not just the diff.
- Pull requests: a descriptive title (not the branch name) and a body with Summary, Changes (per file/area), Why (for non-obvious decisions), Testing (what was run and the result) and Notes for review (risks, follow-ups, known failures). Never leave the body empty.

### Branching: trunk-based development (target)

The target workflow is trunk-based development: one always-deployable trunk, short-lived branches, small PRs merged often, unfinished work merged hidden (unlinked route or flag) instead of kept on a long-lived branch, no direct commits to or force-pushes of the trunk.

**Current state (transition):** the repo still uses `develop` → `main` (`develop` deploys to the Firebase Hosting `develop` channel, `main` to `live`). Until the team completes the migration, branch from an up-to-date `develop`, keep branches short-lived (hours to a couple of days) and PRs small, and open PRs against `develop`. Do not open PRs directly against `main` unless asked.
