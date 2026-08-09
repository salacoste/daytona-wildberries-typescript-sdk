#!/usr/bin/env bash
# Install git hooks into .git/hooks (pre-commit: TypeScript type-check + gitleaks secret scan).
# Run once after cloning:  ./scripts/install-hooks.sh
set -eu

cd "$(git rev-parse --show-toplevel)"

mkdir -p .git/hooks
cp scripts/git-hooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit

echo "✅ Installed .git/hooks/pre-commit"
echo "   - TypeScript type-check: npm run type-check"
echo "   - Secret scan:           gitleaks (brew install gitleaks)  config: .gitleaks.toml"
echo "   Skip either (NOT recommended): git commit --no-verify"
