import { Menu, Search, Bell, Globe, LayoutDashboard, LogOut } from "lucide-react";
import { useDashboardStore } from "../../stores/dashboardStore";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

export function TopBar() {
  const { toggleSidebar } = useDashboardStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/auth/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

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

        <button
          onClick={handleSignOut}
          className="text-[var(--text-secondary)] hover:text-[var(--status-critical)] transition-colors flex items-center gap-2 hidden sm:flex"
          title="Sign Out"
        >
          <LogOut className="h-5 w-5" />
        </button>

        <div className="w-8 h-8 rounded-full bg-[image:var(--gradient-accent)] flex flex-shrink-0 items-center justify-center border border-[var(--border-strong)] ml-2 cursor-pointer relative group">
          <span className="text-xs font-bold text-white shadow-sm">
            {auth.currentUser?.displayName ? auth.currentUser.displayName.charAt(0).toUpperCase() : "U"}
          </span>
          <div className="absolute top-10 right-0 hidden group-hover:block bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded p-2 z-50">
            <button onClick={handleSignOut} className="text-sm text-[var(--status-critical)] hover:underline whitespace-nowrap">Sign out</button>
          </div>
        </div>
      </div>
    </header>
  );
}
