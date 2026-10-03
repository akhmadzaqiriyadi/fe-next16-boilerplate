"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Settings,
  HelpCircle,
  PanelLeftClose,
  PanelLeftOpen,
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
      <div
        className={cn(
          "flex h-16 items-center border-b border-zinc-200/80 transition-all dark:border-zinc-800/80",
          isCollapsed ? "justify-center px-2" : "justify-between px-4"
        )}
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          <button
            type="button"
            onClick={isCollapsed ? toggleCollapse : undefined}
            title={isCollapsed ? "Buka Sidebar" : brandName}
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-sm font-bold text-white shadow-xs dark:bg-emerald-500 dark:text-zinc-950",
              isCollapsed && "cursor-pointer transition-transform hover:scale-105"
            )}
          >
            {brandLogo || "F"}
          </button>
          {!isCollapsed && (
            <span className="truncate text-sm font-bold tracking-tight text-zinc-900 dark:text-white">
              {brandName}
            </span>
          )}
        </div>

        {/* In-Header Collapse Toggle Button (When Expanded) */}
        {!isCollapsed && (
          <button
            type="button"
            onClick={toggleCollapse}
            title="Ciutkan Sidebar"
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border border-zinc-200 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:border-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          >
            <PanelLeftClose className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Nav List */}
      <div className={cn("flex-1 space-y-6 overflow-y-auto py-4", isCollapsed ? "px-2" : "px-3")}>
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
                    "group flex cursor-pointer items-center rounded-lg text-left text-xs font-medium transition-colors select-none",
                    isCollapsed ? "mx-auto h-10 w-10 justify-center p-0" : "w-full gap-3 px-3 py-2",
                    isActive
                      ? "bg-zinc-900 font-semibold text-white shadow-xs dark:bg-emerald-500/15 dark:text-emerald-400"
                      : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
                  )}
                >
                  <span
                    className={cn(
                      "flex shrink-0 items-center justify-center",
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

      {/* User Footer Profile & Dedicated Toggle Button */}
      <div
        className={cn(
          "space-y-1.5 border-t border-zinc-200/80 dark:border-zinc-800/80",
          isCollapsed ? "p-2" : "p-3"
        )}
      >
        {/* Toggle Button */}
        <button
          type="button"
          onClick={toggleCollapse}
          title={isCollapsed ? "Buka Sidebar" : "Ciutkan Sidebar"}
          className={cn(
            "flex cursor-pointer items-center rounded-lg text-xs font-medium text-zinc-500 transition-colors select-none hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100",
            isCollapsed ? "mx-auto h-10 w-10 justify-center p-0" : "w-full gap-2.5 px-2.5 py-2"
          )}
        >
          {isCollapsed ? (
            <PanelLeftOpen className="h-4 w-4" />
          ) : (
            <>
              <PanelLeftClose className="h-4 w-4" />
              <span>Ciutkan Menu</span>
            </>
          )}
        </button>

        {/* User Profile */}
        <div
          className={cn(
            "flex items-center rounded-lg transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900",
            isCollapsed ? "mx-auto h-10 w-10 justify-center p-0" : "gap-2.5 p-1.5"
          )}
        >
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
