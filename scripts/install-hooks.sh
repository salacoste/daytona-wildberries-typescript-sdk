#!/usr/bin/env bash
# Activate the checked-in git hooks via core.hooksPath.
# The hook runs directly from scripts/git-hooks/ (no copy to .git/hooks),
# so it is always in sync with the committed version.
# Run once after cloning:  ./scripts/install-hooks.sh
set -eu

cd "$(git rev-parse --show-toplevel)"

git config core.hooksPath scripts/git-hooks

echo "✅ core.hooksPath = scripts/git-hooks"
echo "   pre-commit: TypeScript type-check + gitleaks secret scan"
echo "   Requires:   node/npm + gitleaks (brew install gitleaks)  |  config: .gitleaks.toml"
echo "   Uninstall:  git config --unset core.hooksPath"
