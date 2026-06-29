"use client";

/**
 * AppHeader — fixed-height top navigation bar for the dashboard shell.
 *
 * Occupies a 64px-tall (`h-16`) strip above the main content area, offset
 * by the sidebar width so it aligns with the content column. Includes a
 * breadcrumb or title region, a search field, and action controls built
 * with shadcn/ui Button, Input, Avatar, and DropdownMenu primitives.
 */

import Link from "next/link";
import { Bell, ChevronRight, Search } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import type { BreadcrumbItem } from "./types";

/** Fixed header height in pixels — must stay in sync with AppShell padding. */
export const HEADER_HEIGHT_PX = 64;

type AppHeaderProps = {
  className?: string;
  title?: string;
  breadcrumbs?: BreadcrumbItem[];
};

export function AppHeader({
  className,
  title = "Dashboard",
  breadcrumbs,
}: AppHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-16 shrink-0 items-center gap-4 border-b border-border bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/80",
        className,
      )}
    >
      {/* Title / breadcrumb region */}
      <div className="flex min-w-0 flex-1 items-center">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;

                return (
                  <li key={`${crumb.label}-${index}`} className="flex items-center gap-1">
                    {index > 0 && (
                      <ChevronRight
                        className="size-3.5 shrink-0 text-muted-foreground/60"
                        aria-hidden
                      />
                    )}
                    {crumb.href && !isLast ? (
                      <Link
                        href={crumb.href}
                        className="truncate transition-colors hover:text-foreground"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span
                        className={cn(
                          "truncate",
                          isLast && "font-medium text-foreground",
                        )}
                        aria-current={isLast ? "page" : undefined}
                      >
                        {crumb.label}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        ) : (
          <h1 className="truncate text-lg font-semibold tracking-tight">
            {title}
          </h1>
        )}
      </div>

      {/* Global search — centered on large screens, hidden on small */}
      <div className="relative hidden w-full max-w-sm md:block">
        <Search
          className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          type="search"
          placeholder="Search..."
          className="h-9 pl-8"
          aria-label="Search dashboard"
        />
      </div>

      {/* Action cluster — notifications and user menu */}
      <div className="flex shrink-0 items-center gap-1">
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="size-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                className="relative h-9 gap-2 px-2"
                aria-label="Open user menu"
              >
                <Avatar size="sm">
                  <AvatarFallback>EW</AvatarFallback>
                </Avatar>
                <span className="hidden text-sm font-medium sm:inline">
                  Account
                </span>
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuLabel>My account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Preferences</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">Sign out</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
