import { existsSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import ts from 'typescript';

export type RelativeDeclarationTarget = 'file' | 'directory';

export type RelativeDeclarationTargetResolver = (
  specifier: string
) => RelativeDeclarationTarget | undefined;

const RUNTIME_EXTENSION_PATTERN = /\.(?:[cm]?js|json|node)$/;
const SOURCE_FILE_EXTENSIONS = ['.ts', '.tsx', '.mts', '.cts'] as const;

function moduleSpecifierLiteral(node: ts.Node): ts.StringLiteralLike | undefined {
  if (
    (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
    node.moduleSpecifier &&
    ts.isStringLiteralLike(node.moduleSpecifier)
  ) {
    return node.moduleSpecifier;
  }

  if (
    ts.isExternalModuleReference(node) &&
    node.expression &&
    ts.isStringLiteralLike(node.expression)
  ) {
    return node.expression;
  }

  if (
    ts.isImportTypeNode(node) &&
    ts.isLiteralTypeNode(node.argument) &&
    ts.isStringLiteralLike(node.argument.literal)
  ) {
    return node.argument.literal;
  }

  return undefined;
}

export function rewriteNodeNextDeclarationSpecifiers(
  declarationPath: string,
  content: string,
  resolveTarget: RelativeDeclarationTargetResolver
): string {
  const sourceFile = ts.createSourceFile(
    declarationPath,
    content,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS
  );
  const replacements: Array<{ start: number; end: number; value: string }> = [];

  const visit = (node: ts.Node): void => {
    const literal = moduleSpecifierLiteral(node);
    if (literal) {
      const specifier = literal.text;
      if (specifier.startsWith('.') && !RUNTIME_EXTENSION_PATTERN.test(specifier)) {
        const target = resolveTarget(specifier);
        if (!target) {
          throw new Error(
            `Cannot resolve declaration specifier "${specifier}" from ${declarationPath}`
          );
        }

        replacements.push({
          start: literal.getStart(sourceFile) + 1,
          end: literal.getEnd() - 1,
          value: target === 'directory' ? `${specifier}/index.js` : `${specifier}.js`,
        });
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);

  return replacements
    .sort((left, right) => right.start - left.start)
    .reduce(
      (rewritten, replacement) =>
        `${rewritten.slice(0, replacement.start)}${replacement.value}${rewritten.slice(replacement.end)}`,
      content
    );
}

export function resolveDeclarationTargetFromSource(
  declarationRoot: string,
  sourceRoot: string,
  declarationPath: string,
  specifier: string
): RelativeDeclarationTarget | undefined {
  const declarationRelativePath = relative(declarationRoot, declarationPath);
  const sourceFileBase = resolve(sourceRoot, declarationRelativePath.replace(/\.d\.[cm]?ts$/, ''));
  const sourceTargetBase = resolve(dirname(sourceFileBase), specifier);

  if (SOURCE_FILE_EXTENSIONS.some((extension) => existsSync(`${sourceTargetBase}${extension}`))) {
    return 'file';
  }

  if (
    SOURCE_FILE_EXTENSIONS.some((extension) =>
      existsSync(join(sourceTargetBase, `index${extension}`))
    )
  ) {
    return 'directory';
  }

  return undefined;
}
