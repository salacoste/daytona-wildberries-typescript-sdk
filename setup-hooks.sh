#!/bin/bash
# Setup script for git hooks
# Run this after cloning the repository: ./setup-hooks.sh

echo "Setting up git hooks..."

# Create pre-commit hook
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/sh
# Pre-commit hook for TypeScript type checking
# Prevents commits with TypeScript errors

echo "Running TypeScript type check..."

# Run type check
npm run type-check

# Capture exit code
TYPE_CHECK_EXIT=$?

if [ $TYPE_CHECK_EXIT -ne 0 ]; then
  echo ""
  echo "❌ TypeScript type check FAILED!"
  echo "Please fix type errors before committing."
  echo ""
  echo "To skip this check (NOT recommended), use: git commit --no-verify"
  echo ""
  exit 1
fi

echo "✅ TypeScript type check PASSED!"
exit 0
EOF

# Make it executable
chmod +x .git/hooks/pre-commit

echo "✅ Git hooks installed successfully!"
echo ""
echo "Pre-commit hook will now run 'npm run type-check' before every commit."
echo "This prevents commits with TypeScript errors."
