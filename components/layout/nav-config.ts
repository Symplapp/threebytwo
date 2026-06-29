/**
 * Default sidebar navigation configuration for the enterprise dashboard.
 *
 * Centralizing nav items here keeps AppSidebar presentational: it only
 * renders whatever groups and links this file exports. Replace or extend
 * these entries as new dashboard sections are added, or swap this module
 * for a server-fetched config when navigation becomes dynamic.
 */

import {
  BarChart3,
  FolderKanban,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";

import type { NavGroup } from "./types";

export const defaultNavGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Analytics",
        href: "/analytics",
        icon: BarChart3,
      },
    ],
  },
  {
    label: "Workspace",
    items: [
      {
        title: "Projects",
        href: "/projects",
        icon: FolderKanban,
      },
      {
        title: "Team",
        href: "/team",
        icon: Users,
      },
    ],
  },
  {
    label: "System",
    items: [
      {
        title: "Settings",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
];
