import { AlertTriangle, TrendingUp, CheckCircle, Clock } from "lucide-react";
import { DataCard } from "../components/ui/DataCard";
import { LiveIndicator } from "../components/ui/LiveIndicator";
import { StatusBadge } from "../components/ui/StatusBadge";
import { useLiveActivity } from "../hooks/useLiveActivity";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie } from 'recharts';

export default function OverviewDashboard() {
  const activities = useLiveActivity();

  return (
    <div className="space-y-6 pb-20 md:pb-6 animate-[fade-up_0.4s_ease-out]">
      {/* Critical Alert Banner */}
      <div className="bg-[var(--status-critical-soft)] border border-[var(--status-critical)] rounded-[var(--radius-md)] p-3 flex items-center justify-between shadow-[var(--shadow-glow-critical)]">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-[var(--status-critical)]" />
          <span className="text-sm font-medium text-[var(--text-primary)]">
            <strong className="text-[var(--status-critical)]">CRITICAL:</strong> 2 active shipment delays detected — AI recommends immediate rerouting
          </span>
        </div>
        <div className="flex gap-3">
          <button className="text-xs font-semibold px-3 py-1.5 bg-[var(--status-critical)] text-white rounded-[var(--radius-sm)] hover:brightness-110 transition-all">View Alerts</button>
          <button className="text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)]">Dismiss</button>
        </div>
      </div>

      {/* Row 1: KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DataCard
          title="Total Active Shipments"
          value="1,247"
          change="+8%"
          changeType="up"
          colorVar="--kpi-deliveries"
          subInfo="843 on schedule | 4 delayed | 400 pending"
        />
        <DataCard
          title="Active Fleet Vehicles"
          value="89"
          change="-3"
          changeType="neutral"
          colorVar="--kpi-fleet"
          subInfo="67 on route | 18 idle | 4 maintenance"
        />
        <DataCard
          title="Delayed Shipments"
          value="4"
          change="-2"
          changeType="down"
          colorVar="--kpi-delay"
          subInfo="AI: 2 preventable | 2 weather-related"
        />
        <DataCard
          title="Operational Score"
          value="94.2%"
          change="+1.4%"
          changeType="up"
          colorVar="--status-success"
          subInfo="Fuel: ₹4.2L saved today | CO₂: 2.4T reduced"
        />
      </div>

      {/* Row 2: Fleet Map + Live Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
        {/* Left: Map */}
        <div className="lg:col-span-2 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-card)] relative flex flex-col">
          <div className="absolute inset-0 opacity-60 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=21.1458,79.0882&zoom=5&size=800x400&maptype=roadmap&style=feature:all|element:labels|visibility:off&style=feature:water|element:geometry|color:0x04050A&style=feature:landscape|element:geometry|color:0x0B1120&style=feature:road|element:geometry|color:0x1C2A40&key=YOUR_API_KEY_HERE')] bg-cover bg-center mix-blend-screen" />
          
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            <button className="text-xs font-medium bg-[var(--bg-elevated)] border border-[var(--border-strong)] px-3 py-1.5 rounded-[var(--radius-sm)] shadow-[var(--shadow-elevated)] hover:bg-[var(--bg-hover)] transition-colors">Zoom to fit all</button>
            <button className="text-xs font-medium bg-[var(--bg-elevated)] border border-[var(--border-strong)] px-3 py-1.5 rounded-[var(--radius-sm)] shadow-[var(--shadow-elevated)] hover:bg-[var(--bg-hover)] transition-colors">Filter vehicles</button>
          </div>

          <div className="absolute top-1/2 left-1/3 w-3 h-3 rounded-full bg-[var(--status-warning)] shadow-[0_0_12px_var(--status-warning)] animate-[pulse-ring_2s_infinite]" />
          <div className="absolute top-[40%] right-1/4 w-3 h-3 rounded-full bg-[var(--status-success)] shadow-[0_0_12px_var(--status-success)] animate-[pulse-ring_2.5s_infinite]" />
          <div className="absolute top-[60%] left-[45%] w-3 h-3 rounded-full bg-[var(--status-critical)] shadow-[0_0_12px_var(--status-critical)] animate-[pulse-ring_1.5s_infinite]" />
          
        </div>

        {/* Right: Live Feed */}
        <div className="lg:col-span-1 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] flex flex-col overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">Live Activity</h3>
            <LiveIndicator />
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {activities.map((act) => (
              <div key={act.id} className="flex gap-3 items-start animate-[slide-in-right_0.3s_ease-out]">
                <div className="mt-0.5 shrink-0">
                  {act.type === "success" && <CheckCircle className="h-4 w-4 text-[var(--status-success)]" />}
                  {act.type === "warning" && <AlertTriangle className="h-4 w-4 text-[var(--status-warning)]" />}
                  {act.type === "info" && <TrendingUp className="h-4 w-4 text-[var(--status-info)]" />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-mono text-[var(--text-muted)]">{act.time}</span>
                    <StatusBadge status={act.status as any} />
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-snug">
                    <span className="text-[var(--text-primary)] font-medium">{act.title} </span>
                    {act.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
