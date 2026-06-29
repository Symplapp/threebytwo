/**
 * Shared TypeScript types for the application shell layout system.
 *
 * These types define the shape of navigation data consumed by AppSidebar
 * and optional breadcrumb data consumed by AppHeader. Keeping them in a
 * dedicated file avoids circular imports between layout components and
 * makes it easy to extend navigation from a CMS or API later.
 */

import type { LucideIcon } from "lucide-react";

/** A single link rendered inside the sidebar navigation. */
export type NavItem = {
  /** Visible label shown next to the icon. */
  title: string;
  /** App Router path the link navigates to. */
  href: string;
  /** Lucide icon component displayed before the label. */
  icon: LucideIcon;
  /** When true, the item is shown but not clickable (e.g. coming soon). */
  disabled?: boolean;
};

/** A labeled group of related navigation links. */
export type NavGroup = {
  /** Section heading rendered above a cluster of NavItems. */
  label: string;
  items: NavItem[];
};

/** A single segment in the header breadcrumb trail. */
export type BreadcrumbItem = {
  label: string;
  /** Omit href on the final (current) segment to render it as plain text. */
  href?: string;
};

/** Props accepted by the top-level AppShell wrapper. */
export type AppShellProps = {
  children: React.ReactNode;
  /** Page title shown in the header when no breadcrumbs are provided. */
  title?: string;
  /** Optional breadcrumb trail; takes precedence over `title` when set. */
  breadcrumbs?: BreadcrumbItem[];
};
