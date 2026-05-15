import { Truck, AlertTriangle, TrendingUp, Filter, Settings, Activity } from "lucide-react";
import { DataCard } from "../components/ui/DataCard";

const MOCK_VEHICLES = [
  { id: "TN-02-AB-4521", type: "Heavy Truck", driver: "Rajesh K.", status: "active", fuelEff: "14.2", speed: "65 km/h", location: "NH-48, km 340" },
  { id: "MH-14-DC-8812", type: "Medium Van", driver: "Amit S.", status: "idle", fuelEff: "12.8", speed: "0 km/h", location: "Mumbai WH-02" },
  { id: "KA-01-EF-2341", type: "Heavy Truck", driver: "Suresh M.", status: "maintenance", fuelEff: "11.1", speed: "0 km/h", location: "Service Center Bglr" },
  { id: "KL-07-GH-5566", type: "Light Truck", driver: "Priya D.", status: "active", fuelEff: "16.4", speed: "42 km/h", location: "Kochi City Limits" },
  { id: "GJ-01-KL-9988", type: "Heavy Truck", driver: "Vikram R.", status: "active", fuelEff: "13.9", speed: "78 km/h", location: "NH-44 Expressway" },
];

export default function FleetIntelligence() {
  return (
    <div className="space-y-6 pb-20 md:pb-6 animate-[fade-up_0.4s_ease-out]">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-display text-[var(--text-primary)]">Fleet Intelligence</h1>
          <p className="text-sm text-[var(--text-secondary)]">Real-time driver analytics and performance optimization</p>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <DataCard title="Total Fleet" value="89" change="67 active" changeType="up" colorVar="--kpi-fleet" subInfo="4 maintenance | 18 idle" />
        <DataCard title="Avg Fuel Efficiency" value="14.3" change="+2.1 km/L" changeType="up" colorVar="--status-success" subInfo="vs fleet avg" />
        <DataCard title="Idle Time Today" value="127h" change="₹34.2k waste" changeType="down" colorVar="--status-warning" subInfo="Total hours across fleet" />
        <DataCard title="On-Time Perf." value="94.2%" change="stable" changeType="neutral" colorVar="--status-info" subInfo="Top driver: 99.1%" />
        <DataCard title="Maintenance Due" value="6" change="1 overdue" changeType="down" colorVar="--status-critical" subInfo="Within next 7 days" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Roster Table */}
        <div className="lg:col-span-2 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] overflow-hidden flex flex-col">
          <div className="p-4 border-b border-[var(--border-subtle)] flex justify-between items-center bg-[var(--bg-elevated)]">
            <h3 className="font-semibold text-[var(--text-primary)]">Live Fleet Roster</h3>
            <button className="text-xs flex items-center gap-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]"><Filter className="w-3 h-3"/> Filter</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[var(--bg-active)] text-[var(--text-secondary)]">
                <tr>
                  <th className="px-4 py-3 font-medium">Vehicle ID</th>
                  <th className="px-4 py-3 font-medium">Driver</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Efficiency</th>
                  <th className="px-4 py-3 font-medium">Current Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-primary)]">
                {MOCK_VEHICLES.map((v) => (
                  <tr key={v.id} className="hover:bg-[var(--bg-hover)] transition-colors">
                    <td className="px-4 py-3 font-mono">{v.id}</td>
                    <td className="px-4 py-3">{v.driver}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
                        ${v.status === 'active' ? 'bg-[var(--status-success-soft)] text-[var(--status-success)]' : 
                          v.status === 'idle' ? 'bg-[var(--status-warning-soft)] text-[var(--status-warning)]' : 
                          'bg-[var(--status-critical-soft)] text-[var(--status-critical)]'}`}>
                        {v.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[var(--accent-primary)] font-mono">{v.fuelEff} km/L</td>
                    <td className="px-4 py-3 text-[var(--text-muted)]">{v.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: AI Coaching */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] p-5">
            <h3 className="font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-[var(--accent-primary)]" />
              AI Driver Coaching Alerts
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-[var(--status-warning-soft)] border border-[var(--status-warning)] rounded flex gap-3 items-start">
                <AlertTriangle className="w-4 h-4 text-[var(--status-warning)] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-[var(--text-primary)] font-medium mb-1">Harsh braking detected</p>
                  <p className="text-[10px] text-[var(--status-warning)]">Suresh M. — 23 events today. Recommend driver training.</p>
                </div>
              </div>
              <div className="p-3 bg-[var(--status-info-soft)] border border-[var(--status-info)] rounded flex gap-3 items-start">
                <TrendingUp className="w-4 h-4 text-[var(--status-info)] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-[var(--text-primary)] font-medium mb-1">Route optimization opportunity</p>
                  <p className="text-[10px] text-[var(--status-info)]">Priya D. has specific zone overlap. Potential 18km reduction/day.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] p-5 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10"><Settings className="w-16 h-16"/></div>
             <h3 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-1">Predictive Maintenance</h3>
             <div className="text-3xl font-display text-[var(--text-primary)] mb-1">6 Vehicles</div>
             <p className="text-sm text-[var(--text-secondary)] mb-4">Require service in the next 7 days.</p>
             <button className="w-full py-2 bg-[var(--bg-input)] hover:bg-[var(--bg-hover)] border border-[var(--border-strong)] rounded text-sm font-medium transition-colors">View Schedule</button>
          </div>
        </div>
      </div>
    </div>
  );
}
