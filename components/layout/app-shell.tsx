/**
 * AppShell — root layout wrapper for authenticated dashboard pages.
 *
 * Composes AppSidebar and AppHeader into a two-column shell:
 *
 *   ┌──────────┬─────────────────────────────┐
 *   │          │ AppHeader (64px)            │
 *   │ Sidebar  ├─────────────────────────────┤
 *   │ (240px)  │                             │
 *   │          │  {children} — flexible area │
 *   │          │                             │
 *   └──────────┴─────────────────────────────┘
 *
 * The sidebar is `position: fixed`; the main column uses `pl-60` (240px)
 * so content never sits beneath it. This component is a Server Component
 * by default — only AppSidebar and AppHeader require client interactivity.
 *
 * Usage (in a route layout, not page.tsx):
 *
 *   import { AppShell } from "@/components/layout";
 *
 *   export default function DashboardLayout({ children }) {
 *     return (
 *       <AppShell title="Overview" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Overview" }]}>
 *         {children}
 *       </AppShell>
 *     );
 *   }
 */

import { cn } from "@/lib/utils";

import { AppHeader } from "./app-header";
import { AppSidebar } from "./app-sidebar";
import type { AppShellProps } from "./types";

export function AppShell({
  children,
  title,
  breadcrumbs,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />

      {/* Main column — offset by sidebar width (w-60 = 240px) */}
      <div className="flex min-h-screen flex-col pl-60">
        <AppHeader title={title} breadcrumbs={breadcrumbs} />

        {/* Flexible content region — pages render their UI here */}
        <main className="flex flex-1 flex-col">{children}</main>
      </div>
    </div>
  );
}

/**
 * AppShellContent — optional inner wrapper for consistent page padding.
 *
 * Use inside AppShell when pages need uniform horizontal spacing and
 * vertical rhythm without repeating layout classes in every view.
 */
export function AppShellContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-1 flex-col gap-6 p-6", className)}>
      {children}
    </div>
  );
}
