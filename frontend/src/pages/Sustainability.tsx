import { Leaf, Wind, Zap, BarChart3, CloudRain } from "lucide-react";
import { DataCard } from "../components/ui/DataCard";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EMISSIONS_DATA = [
  { month: 'Jan', value: 420 }, { month: 'Feb', value: 390 }, { month: 'Mar', value: 385 },
  { month: 'Apr', value: 360 }, { month: 'May', value: 320 }, { month: 'Jun', value: 290 }
];

export default function Sustainability() {
  return (
    <div className="space-y-6 pb-20 md:pb-6 animate-[fade-up_0.4s_ease-out]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-display text-[var(--text-primary)]">Sustainability & ESG</h1>
          <p className="text-sm text-[var(--text-secondary)]">Live carbon footprint tracking and clean fleet routing</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <DataCard title="Total Carbon Output" value="2,410" change="-12% vs last Q" changeType="down" colorVar="--status-success" subInfo="Metric tons CO2e" />
        <DataCard title="EV Fleet Utilization" value="42%" change="+5%" changeType="up" colorVar="--accent-primary" subInfo="Target: 60% by EOY" />
        <DataCard title="Fuel Saved" value="14k L" change="AI Routing" changeType="up" colorVar="--status-info" subInfo="Last 30 days" />
        <DataCard title="Waste Reduction" value="18%" change="Warehouse" changeType="up" colorVar="--kpi-warehouse" subInfo="Packaging & materials" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-5 shadow-[var(--shadow-card)]">
           <h3 className="font-semibold text-[var(--text-primary)] mb-6 flex items-center gap-2">
             <CloudRain className="w-5 h-5 text-[var(--status-neutral)]" />
             Emissions Trend (YTD)
           </h3>
           <div className="h-[250px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={EMISSIONS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                 <defs>
                   <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="var(--status-success)" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="var(--status-success)" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                 <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                 <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                 <Tooltip contentStyle={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-strong)', borderRadius: '8px' }} />
                 <Area type="monotone" dataKey="value" stroke="var(--status-success)" fill="url(#colorEmissions)" strokeWidth={2} />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>

        <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-5 shadow-[var(--shadow-card)]">
           <h3 className="font-semibold text-[var(--text-primary)] mb-6 flex items-center gap-2">
             <Leaf className="w-5 h-5 text-[var(--status-success)]" />
             ESG Initiatives
           </h3>
           <div className="space-y-4">
              <div className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-strong)] rounded-lg flex items-center justify-between">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-[var(--status-success-soft)] flex items-center justify-center text-[var(--status-success)]">
                     <Zap className="w-5 h-5" />
                   </div>
                   <div>
                     <h4 className="text-sm font-medium text-[var(--text-primary)]">EV Fleet Transition</h4>
                     <p className="text-xs text-[var(--text-secondary)]">Replacing 100 diesel trucks</p>
                   </div>
                 </div>
                 <div className="text-right">
                    <span className="text-lg font-bold text-[var(--text-primary)]">42%</span>
                    <p className="text-[10px] text-[var(--text-muted)] uppercase">Complete</p>
                 </div>
              </div>
              <div className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-strong)] rounded-lg flex items-center justify-between">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-[var(--status-info-soft)] flex items-center justify-center text-[var(--status-info)]">
                     <Wind className="w-5 h-5" />
                   </div>
                   <div>
                     <h4 className="text-sm font-medium text-[var(--text-primary)]">Solar Powered Hubs</h4>
                     <p className="text-xs text-[var(--text-secondary)]">Phase 2: Mumbai & Pune WH</p>
                   </div>
                 </div>
                 <div className="text-right">
                    <span className="text-lg font-bold text-[var(--text-primary)]">85%</span>
                    <p className="text-[10px] text-[var(--text-muted)] uppercase">Complete</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
