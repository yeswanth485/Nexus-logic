import { Menu, Search, Bell, Globe, LayoutDashboard } from "lucide-react";
import { useDashboardStore } from "../../stores/dashboardStore";
import { useLocation } from "react-router-dom";

export function TopBar() {
  const { toggleSidebar } = useDashboardStore();
  const location = useLocation();

  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path === "/dashboard") return "Operations / Overview";
    const segment = path.split("/").pop();
    const formatted = segment ? segment.charAt(0).toUpperCase() + segment.slice(1).replace("-", " ") : "Overview";
    return `Operations / ${formatted}`;
  };

  return (
    <header className="h-16 bg-[var(--bg-base)] border-b border-[var(--border-subtle)] flex items-center justify-between px-4 sm:px-6 shrink-0">
      
      {/* Left */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="md:hidden text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="hidden sm:block text-sm font-medium text-[var(--text-muted)]">
          {getBreadcrumb()}
        </div>
      </div>

      {/* Center - Search */}
      <div className="flex-1 max-w-xl px-4 hidden md:block">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)] group-focus-within:text-[var(--accent-primary)] transition-colors" />
          <input 
            type="text" 
            placeholder="Search shipments, vehicles, routes... (Cmd+K)" 
            className="w-full bg-[var(--bg-input)] border border-[var(--border-default)] rounded-[var(--radius-md)] py-1.5 pl-9 pr-4 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 sm:gap-5">
        <button className="relative text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[var(--status-critical)] border-2 border-[var(--bg-base)] rounded-full text-[8px] font-bold text-white flex items-center justify-center">
            3
          </span>
        </button>
        
        <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors hidden sm:block">
          <Globe className="h-5 w-5" />
        </button>
        
        <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors hidden sm:block">
          <LayoutDashboard className="h-5 w-5" />
        </button>

        <div className="w-8 h-8 rounded-full bg-[image:var(--gradient-accent)] flex flex-shrink-0 items-center justify-center border border-[var(--border-strong)] ml-2 sm:hidden cursor-pointer">
           <span className="text-xs font-bold text-white shadow-sm">RK</span>
        </div>
      </div>
    </header>
  );
}
