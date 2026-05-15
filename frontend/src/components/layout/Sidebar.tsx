import { Link, useLocation } from "react-router-dom";
import { 
  Hexagon, Home, Package, Truck, Map, 
  Warehouse, TrendingUp, ShieldAlert, Cpu,
  Landmark, Leaf, BarChart3, Settings, User
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useDashboardStore } from "../../stores/dashboardStore";

const NAV_GROUPS = [
  {
    title: "OPERATIONS",
    items: [
      { id: "overview", path: "/dashboard", icon: Home, label: "Overview Dashboard" },
      { id: "tracking", path: "/dashboard/tracking", icon: Package, label: "Shipment Tracking" },
      { id: "fleet", path: "/dashboard/fleet", icon: Truck, label: "Fleet Intelligence" },
      { id: "routes", path: "/dashboard/routes", icon: Map, label: "Route Optimization" },
    ]
  },
  {
    title: "INTELLIGENCE",
    items: [
      { id: "warehouse", path: "/dashboard/warehouse", icon: Warehouse, label: "Warehouse Intelligence" },
      { id: "inventory", path: "/dashboard/inventory", icon: TrendingUp, label: "Inventory Forecasting" },
      { id: "risk", path: "/dashboard/risk", icon: ShieldAlert, label: "Risk Center", badge: true },
      { id: "ai-insights", path: "/dashboard/ai-insights", icon: Cpu, label: "AI Insights", badge: true },
    ]
  },
  {
    title: "SPECIALIZED",
    items: [
      { id: "government", path: "/dashboard/government", icon: Landmark, label: "Government Center", beta: true },
      { id: "sustainability", path: "/dashboard/sustainability", icon: Leaf, label: "Sustainability" },
      { id: "reports", path: "/dashboard/reports", icon: BarChart3, label: "Reports & Analytics" },
    ]
  },
  {
    title: "SYSTEM",
    items: [
      { id: "admin", path: "/dashboard/admin", icon: Settings, label: "Admin & Integrations" },
      { id: "profile", path: "/dashboard/profile", icon: User, label: "My Profile" },
    ]
  }
];

export function Sidebar() {
  const { sidebarOpen } = useDashboardStore();
  const location = useLocation();

  if (!sidebarOpen) return null;

  return (
    <aside className="w-64 bg-[var(--bg-surface)] border-r border-[var(--border-subtle)] flex flex-col h-full shrink-0 hidden md:flex">
      {/* Top Section */}
      <div className="h-16 flex flex-col justify-center px-4 border-b border-[var(--border-subtle)] space-y-1">
        <Link to="/" className="flex items-center gap-2">
          <Hexagon className="h-6 w-6 text-[var(--accent-primary)] fill-[var(--accent-primary-glow)]" />
          <span className="font-display font-bold text-lg tracking-wider text-[var(--text-primary)]">
            NEXUS LOGIX
          </span>
        </Link>
      </div>

      <div className="px-4 py-3 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2 mb-2">
          <div className="text-sm font-medium text-[var(--text-primary)] cursor-pointer hover:text-[var(--text-accent)] transition-colors flex items-center gap-1">
            Apex Logistics Group <span className="text-[10px]">▼</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--status-success)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--status-success)]"></span>
          </span>
          <span className="text-[10px] font-mono tracking-wider font-semibold text-[var(--status-success)] uppercase">Live Operations</span>
        </div>
      </div>

      {/* Nav Groups */}
      <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
        {NAV_GROUPS.map((group, idx) => (
          <div key={idx} className="mb-6 px-3">
            <h3 className="text-xs font-semibold text-[var(--text-muted)] tracking-wider mb-2 px-3">
              {group.title}
            </h3>
            <div className="flex flex-col gap-1">
              {group.items.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-[var(--radius-md)] text-sm font-medium transition-all group relative",
                      isActive
                        ? "bg-[var(--bg-active)] text-[var(--text-accent)] shadow-[inset_3px_0_0_0_var(--accent-primary)]"
                        : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
                    )}
                  >
                    <Icon className={cn("h-4 w-4", isActive ? "text-[var(--accent-primary)]" : "text-[var(--text-muted)] group-hover:text-[var(--text-primary)]")} />
                    {item.label}
                    {item.badge && (
                      <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-[var(--status-critical)]" />
                    )}
                    {item.beta && (
                      <span className="absolute right-3 text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-[var(--status-info-soft)] text-[var(--status-info)]">BETA</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-[var(--bg-active)] border border-[var(--border-strong)] flex items-center justify-center text-xs font-bold text-[var(--text-primary)]">
            RK
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-[var(--text-primary)] leading-tight">Rajesh Kumar</span>
            <span className="text-xs text-[var(--text-muted)]">Operations Manager</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--status-success)]" />
          System: All Operational
        </div>
      </div>
    </aside>
  );
}
