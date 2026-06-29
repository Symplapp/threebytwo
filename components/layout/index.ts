/**
 * Barrel export for the application shell layout system.
 *
 * Import from `@/components/layout` rather than individual files so
 * consumers depend on a stable public API. Internal modules (types,
 * nav-config) are re-exported for convenience when building custom
 * dashboard routes or extending navigation.
 */

export { AppShell, AppShellContent } from "./app-shell";
export { AppHeader, HEADER_HEIGHT_PX } from "./app-header";
export { AppSidebar, SIDEBAR_WIDTH_PX } from "./app-sidebar";
export { defaultNavGroups } from "./nav-config";
export type {
  AppShellProps,
  BreadcrumbItem,
  NavGroup,
  NavItem,
} from "./types";
