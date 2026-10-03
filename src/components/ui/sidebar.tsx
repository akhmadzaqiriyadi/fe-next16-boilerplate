"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Settings,
  HelpCircle,
} from "lucide-react";

export interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string | number;
  active?: boolean;
  onClick?: () => void;
}

export interface SidebarSection {
  title?: string;
  items: SidebarItem[];
}

export interface SidebarProps {
  sections?: SidebarSection[];
  activeId?: string;
  onSelectId?: (id: string) => void;
  brandName?: string;
  brandLogo?: React.ReactNode;
  user?: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  className?: string;
}

export function Sidebar({
  sections,
  activeId = "dashboard",
  onSelectId,
  brandName = "Forge POS",
  brandLogo,
  user = {
    name: "Ahmad Zaqi",
    role: "System Architect",
  },
  collapsed: controlledCollapsed,
  onCollapsedChange,
  className,
}: SidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = React.useState(false);
  const isCollapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;

  const toggleCollapse = () => {
    const next = !isCollapsed;
    setInternalCollapsed(next);
    onCollapsedChange?.(next);
  };

  const defaultSections: SidebarSection[] = sections || [
    {
      title: "Menu Utama",
      items: [
        { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
        {
          id: "pos",
          label: "Kasir POS",
          icon: <ShoppingCart className="h-4 w-4" />,
          badge: "Live",
        },
        {
          id: "inventory",
          label: "Inventaris & SKU",
          icon: <Package className="h-4 w-4" />,
          badge: 24,
        },
        { id: "customers", label: "Pelanggan", icon: <Users className="h-4 w-4" /> },
      ],
    },
    {
      title: "Preferensi",
      items: [
        { id: "settings", label: "Pengaturan Toko", icon: <Settings className="h-4 w-4" /> },
        { id: "help", label: "Pusat Bantuan", icon: <HelpCircle className="h-4 w-4" /> },
      ],
    },
  ];

  return (
    <aside
      className={cn(
        "relative flex flex-col border-r border-zinc-200/80 bg-white transition-all duration-300 select-none",
        "dark:border-zinc-800/80 dark:bg-[#09090b]",
        isCollapsed ? "w-[68px]" : "w-60",
        className
      )}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between border-b border-zinc-200/80 px-4 dark:border-zinc-800/80">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-zinc-900 text-xs font-bold text-white shadow-xs dark:bg-emerald-500 dark:text-zinc-950">
            {brandLogo || "F"}
          </div>
          {!isCollapsed && (
            <span className="truncate text-sm font-bold tracking-tight text-zinc-900 dark:text-white">
              {brandName}
            </span>
          )}
        </div>

        {/* Collapse Toggle Button */}
        <button
          type="button"
          onClick={toggleCollapse}
          title={isCollapsed ? "Buka Sidebar" : "Ciutkan Sidebar"}
          className="flex h-6 w-6 items-center justify-center rounded-md border border-zinc-200 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:border-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
        >
          {isCollapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
        {defaultSections.map((sec, secIdx) => (
          <div key={secIdx} className="space-y-1">
            {!isCollapsed && sec.title && (
              <p className="px-2.5 pb-1 font-mono text-[10.5px] font-semibold tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
                {sec.title}
              </p>
            )}
            {sec.items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    item.onClick?.();
                    onSelectId?.(item.id);
                  }}
                  title={isCollapsed ? item.label : undefined}
                  className={cn(
                    "group flex w-full cursor-pointer items-center gap-3 rounded-md px-2.5 py-2 text-left text-xs font-medium transition-colors select-none",
                    isActive
                      ? "bg-zinc-900 font-semibold text-white shadow-xs dark:bg-emerald-500/15 dark:text-emerald-400"
                      : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
                  )}
                >
                  <span
                    className={cn(
                      "shrink-0",
                      isActive
                        ? "text-white dark:text-emerald-400"
                        : "text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200"
                    )}
                  >
                    {item.icon}
                  </span>
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.badge && (
                        <span
                          className={cn(
                            "rounded-[4px] px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-wider uppercase",
                            isActive
                              ? "bg-white/20 text-white dark:bg-emerald-400/20 dark:text-emerald-300"
                              : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* User Footer Profile */}
      <div className="border-t border-zinc-200/80 p-3 dark:border-zinc-800/80">
        <div className="flex items-center gap-2.5 rounded-md p-1.5 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-zinc-200 text-xs font-bold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
            {user.name.slice(0, 2).toUpperCase()}
          </div>
          {!isCollapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                {user.name}
              </p>
              <p className="truncate font-mono text-[10.5px] text-zinc-400">{user.role}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
