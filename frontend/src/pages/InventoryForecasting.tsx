import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, Plus, Zap, AlertTriangle } from "lucide-react";

const DEMAND_DATA = [
  { day: '01', historical: 400, forecast: 420 },
  { day: '05', historical: 300, forecast: 290 },
  { day: '10', historical: 550, forecast: 580 },
  { day: '15', historical: 450, forecast: 460 },
  { day: '20', historical: null, forecast: 700 }, // Future
  { day: '25', historical: null, forecast: 650 },
  { day: '30', historical: null, forecast: 800 },
];

const SHORTAGES = [
  { sku: "EL-2941", product: "Li-ion Battery Pack", stock: 124, outDate: "Day 12", conf: 87, rank: "critical" },
  { sku: "AM-8812", product: "Brake Pads Set", stock: 45, outDate: "Day 14", conf: 92, rank: "critical" },
  { sku: "FM-0012", product: "Canned Goods Assortment", stock: 2100, outDate: "Day 24", conf: 75, rank: "warning" },
];

export default function InventoryForecasting() {
  return (
    <div className="space-y-6 pb-20 md:pb-6 animate-[fade-up_0.4s_ease-out]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-display text-[var(--text-primary)]">Inventory Forecasting</h1>
          <p className="text-sm text-[var(--text-secondary)]">Machine learning demand prediction and stockout prevention</p>
        </div>
        <div className="flex bg-[var(--bg-input)] rounded-[var(--radius-md)] p-1 border border-[var(--border-default)]">
          <select className="bg-transparent text-sm text-[var(--text-primary)] outline-none px-2 pr-4 border-r border-[var(--border-subtle)] appearance-none">
             <option>All Categories</option>
             <option>Electronics</option>
             <option>Automotive</option>
          </select>
          <select className="bg-transparent text-sm text-[var(--text-primary)] outline-none px-2 pl-4 appearance-none">
             <option>Next 30 Days</option>
             <option>Next 90 Days</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] p-5">
           <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-[var(--text-primary)]">Demand Forecast Model (Prophet v1.4)</h3>
              <span className="text-xs bg-[var(--status-success-soft)] text-[var(--status-success)] px-2 py-0.5 rounded font-mono">Accuracy: 94.2%</span>
           </div>
           <div className="h-[300px] w-full">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DEMAND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                  <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-strong)', borderRadius: '8px' }}
                    itemStyle={{ color: 'var(--text-primary)' }}
                  />
                  <Area type="monotone" dataKey="historical" stroke="var(--status-neutral)" fill="none" strokeWidth={2} />
                  <Area type="monotone" dataKey="forecast" stroke="var(--accent-primary)" fillOpacity={1} fill="url(#colorForecast)" strokeWidth={2} strokeDasharray="5 5" />
                </AreaChart>
             </ResponsiveContainer>
           </div>
           <div className="flex gap-4 mt-4 justify-center text-xs text-[var(--text-secondary)]">
               <span className="flex items-center gap-2"><div className="w-3 h-0.5 bg-[var(--status-neutral)]"></div> Historical</span>
               <span className="flex items-center gap-2"><div className="w-3 h-0.5 border-t-2 border-dashed border-[var(--accent-primary)]"></div> AI Forecast</span>
            </div>
        </div>

        {/* Shortages Table */}
        <div className="lg:col-span-1 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] overflow-hidden flex flex-col">
           <div className="p-4 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
             <h3 className="font-semibold text-[var(--text-primary)] text-sm flex items-center gap-2">
               <AlertTriangle className="w-4 h-4 text-[var(--status-warning)]" />
               Predicted Shortages
             </h3>
           </div>
           <div className="flex-1 overflow-y-auto p-2 space-y-2">
             {SHORTAGES.map((s, i) => (
                <div key={i} className={`p-3 rounded-[var(--radius-md)] border ${s.rank === 'critical' ? 'bg-[var(--status-critical-soft)] border-[var(--status-critical)]' : 'bg-[var(--bg-elevated)] border-[var(--border-default)]'}`}>
                   <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-mono font-medium text-[var(--text-primary)]">{s.sku}</span>
                      <span className={`text-[10px] font-bold uppercase ${s.rank === 'critical' ? 'text-[var(--status-critical)]' : 'text-[var(--status-warning)]'}`}>Out {s.outDate}</span>
                   </div>
                   <p className="text-sm text-[var(--text-primary)] mb-2 truncate">{s.product}</p>
                   <div className="flex justify-between items-center text-xs text-[var(--text-secondary)] mb-3">
                      <span>Stock: {s.stock}</span>
                      <span>{s.conf}% conf.</span>
                   </div>
                   <button className={`w-full py-1.5 rounded text-xs font-medium transition-colors ${s.rank === 'critical' ? 'bg-[var(--status-critical)] text-white hover:brightness-110' : 'bg-[var(--bg-hover)] border border-[var(--border-strong)] hover:text-[var(--text-primary)]'}`}>Order Now</button>
                </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
}
