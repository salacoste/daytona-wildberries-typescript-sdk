export interface RequiredRenderedLink {
  sourceRoute: string;
  targetRoute: string;
}

export interface RenderedDocumentationError {
  type:
    | 'base'
    | 'fragment'
    | 'literal-script-setup'
    | 'required-favicon'
    | 'required-link'
    | 'required-route'
    | 'route';
  reference: string;
  detail: string;
}

export interface RenderedDocumentationValidationOptions {
  distDirectory: string;
  base?: string;
  siteOrigin?: string;
  requiredRoutes?: string[];
  requiredLinks?: RequiredRenderedLink[];
  requiredFavicon?: boolean;
  forbidLiteralScriptSetupRoutes?: string[];
}

export interface RenderedDocumentationValidationResult {
  base: string;
  siteOrigin: string;
  htmlRoutes: number;
  rootLocaleRoutes: number;
  russianLocaleRoutes: number;
  internalReferences: number;
  fragmentReferences: number;
  externalReferences: number;
  externalUrls: string[];
  faviconReferences: number;
  errors: RenderedDocumentationError[];
}

export function normalizeBase(base: string): string;
export function normalizeOrigin(origin: string): string;
export function validateRenderedSite(
  options: RenderedDocumentationValidationOptions
): Promise<RenderedDocumentationValidationResult>;
