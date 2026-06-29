"use client";

/**
 * AppSidebar — fixed left navigation panel for the enterprise dashboard shell.
 *
 * Renders a 240px-wide (`w-60`) column pinned to the viewport edge. Uses
 * shadcn/ui ScrollArea for overflow navigation and sidebar design tokens
 * (`bg-sidebar`, `text-sidebar-foreground`) for consistent theming.
 *
 * Active route detection uses Next.js `usePathname` so the current page
 * is highlighted without requiring each page to pass state manually.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { defaultNavGroups } from "./nav-config";
import type { NavGroup } from "./types";

/** Fixed sidebar width in pixels — must stay in sync with AppShell offset. */
export const SIDEBAR_WIDTH_PX = 240;

type AppSidebarProps = {
  /** Navigation groups to render; defaults to `defaultNavGroups`. */
  navGroups?: NavGroup[];
};

export function AppSidebar({ navGroups = defaultNavGroups }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className="fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground"
      aria-label="Main navigation"
    >
      {/* Brand block — logo mark and product name */}
      <div className="flex h-16 shrink-0 items-center gap-3 border-b border-sidebar-border px-4">
        <div
          className="grid h-8 w-8 shrink-0 grid-cols-3 grid-rows-2 gap-px rounded-md bg-sidebar-primary p-1"
          aria-hidden
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <span
              key={index}
              className="rounded-[1px] bg-sidebar-primary-foreground/80"
            />
          ))}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-tight">
            ThreeByTwo
          </p>
          <p className="truncate text-xs text-sidebar-foreground/60">
            Enterprise
          </p>
        </div>
      </div>

      {/* Scrollable navigation — grows to fill remaining sidebar height */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="flex flex-col gap-6">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="mb-2 px-2 text-xs font-medium tracking-wide text-sidebar-foreground/50 uppercase">
                {group.label}
              </p>
              <ul className="flex flex-col gap-0.5">
                {group.items.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/" && pathname.startsWith(`${item.href}/`));
                  const Icon = item.icon;

                  return (
                    <li key={item.href}>
                      {item.disabled ? (
                        <span
                          className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-sidebar-foreground/40"
                          aria-disabled
                        >
                          <Icon className="size-4 shrink-0" aria-hidden />
                          {item.title}
                        </span>
                      ) : (
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-2 py-2 text-sm transition-colors",
                            isActive
                              ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                              : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                          )}
                          aria-current={isActive ? "page" : undefined}
                        >
                          <Icon className="size-4 shrink-0" aria-hidden />
                          {item.title}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </ScrollArea>

      <Separator className="bg-sidebar-border" />

      {/* Footer slot — static org context; replace with live data as needed */}
      <div className="shrink-0 px-4 py-3">
        <p className="truncate text-xs text-sidebar-foreground/50">
          SymplApp · v0.1.0
        </p>
      </div>
    </aside>
  );
}
