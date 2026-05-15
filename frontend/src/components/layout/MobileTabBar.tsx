import { Link, useLocation } from "react-router-dom";
import { Home, Package, Truck, ShieldAlert, MoreHorizontal } from "lucide-react";
import { cn } from "../../lib/utils";

export function MobileTabBar() {
  const location = useLocation();
  
  const tabs = [
    { id: "overview", path: "/dashboard", icon: Home, label: "Home" },
    { id: "tracking", path: "/dashboard/tracking", icon: Package, label: "Tracking" },
    { id: "fleet", path: "/dashboard/fleet", icon: Truck, label: "Fleet" },
    { id: "risk", path: "/dashboard/risk", icon: ShieldAlert, label: "Risk" },
    { id: "more", path: "/dashboard/ai-insights", icon: MoreHorizontal, label: "Insights" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] flex items-center justify-around px-2 z-50 pb-safe">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        const Icon = tab.icon;
        return (
          <Link
            key={tab.id}
            to={tab.path}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full space-y-1",
              isActive ? "text-[var(--accent-primary)]" : "text-[var(--text-muted)]"
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
