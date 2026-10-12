export const vitePressSlugify = (value: string): string => value
  .normalize('NFKD')
  .replace(/[\u0300-\u036F]/g, '')
  .replace(/[\u0000-\u001F]/g, '')
  .replace(/[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'“”‘’<>,.?/]+/g, '-')
  .replace(/-{2,}/g, '-')
  .replace(/^-+|-+$/g, '')
  .replace(/^(\d)/, '_$1')
  .toLowerCase();

export function normalizeDocumentationFragment(
  fragment: string,
  explicitIds: ReadonlySet<string> = new Set()
): string {
  return explicitIds.has(fragment) ? fragment : vitePressSlugify(fragment);
}
