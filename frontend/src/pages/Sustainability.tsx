import { useState, useEffect } from "react";
import { Leaf, Wind, Zap, CloudRain, Plus } from "lucide-react";
import { DataCard } from "../components/ui/DataCard";
import { useAppContext } from "../context/AppContext";
import { useToast } from "../components/ui/Toast";
import Modal from "../components/ui/Modal";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Sustainability() {
  const { state, logAction } = useAppContext();
  const { showToast } = useToast();

  const [initiatives, setInitiatives] = useState([
    { id: '1', title: 'EV Fleet Transition', description: 'Replacing 100 diesel trucks', progress: 42, icon: 'Zap', color: 'var(--status-success)' },
    { id: '2', title: 'Solar Powered Hubs', description: 'Phase 2: Mumbai & Pune WH', progress: 85, icon: 'Wind', color: 'var(--status-info)' },
  ]);

  const [addOpen, setAddOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', targetDate: '' });

  // Dynamic calculations based on state (mock logic)
  const activeVehicles = state.vehicles.filter(v => v.status === 'active').length;
  const avgEfficiency = state.vehicles.reduce((acc, v) => acc + v.fuelEff, 0) / (state.vehicles.length || 1);
  const carbonOutput = Math.round(2410 - (avgEfficiency * 12) + (activeVehicles * 5)); // Just mock dynamic logic
  const fuelSaved = Math.round((avgEfficiency - 12) * activeVehicles * 30);

  const [chartData, setChartData] = useState<{month:string, value:number}[]>([]);

  useEffect(() => {
    // Animate the chart load
    const data = [
      { month: 'Jan', value: 420 }, { month: 'Feb', value: 390 }, { month: 'Mar', value: 385 },
      { month: 'Apr', value: 360 }, { month: 'May', value: 320 }, { month: 'Jun', value: 290 }
    ];
    setChartData(data.map(d => ({...d, value: 0})));
    setTimeout(() => {
      setChartData(data);
    }, 100);
  }, []);

  const handleAddInitiative = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;
    
    setInitiatives(prev => [...prev, {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      progress: 0,
      icon: 'Leaf',
      color: 'var(--kpi-warehouse)'
    }]);
    
    logAction('Sustainability', 'New Initiative Logged', formData.title, 'success');
    showToast('success', 'Initiative Logged', `${formData.title} added to ESG tracker.`);
    setAddOpen(false);
    setFormData({ title: '', description: '', targetDate: '' });
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6 animate-[fade-up_0.4s_ease-out]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-display text-[var(--text-primary)]">Sustainability & ESG</h1>
          <p className="text-sm text-[var(--text-secondary)]">Live carbon footprint tracking and clean fleet routing</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <DataCard title="Total Carbon Output" value={carbonOutput.toLocaleString()} change="-12% vs last Q" changeType="down" colorVar="--status-success" subInfo="Metric tons CO2e" />
        <DataCard title="EV Fleet Utilization" value="42%" change="+5%" changeType="up" colorVar="--accent-primary" subInfo="Target: 60% by EOY" />
        <DataCard title="Fuel Saved" value={`${fuelSaved.toLocaleString()} L`} change="AI Routing" changeType="up" colorVar="--status-info" subInfo="Last 30 days" />
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
               <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                 <Area type="monotone" dataKey="value" stroke="var(--status-success)" fill="url(#colorEmissions)" strokeWidth={2} style={{transition: 'all 1s ease-out'}} />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>

        <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] flex flex-col max-h-[380px]">
           <div className="p-5 border-b border-[var(--border-subtle)] flex items-center justify-between">
              <h3 className="font-semibold text-[var(--text-primary)] flex items-center gap-2">
                <Leaf className="w-5 h-5 text-[var(--status-success)]" />
                ESG Initiatives
              </h3>
              <button onClick={() => setAddOpen(true)} className="text-xs flex items-center gap-1 bg-[var(--bg-elevated)] border border-[var(--border-strong)] px-2 py-1 rounded hover:border-[var(--accent-primary)] transition-colors">
                <Plus className="w-3 h-3" /> Log Initiative
              </button>
           </div>
           <div className="p-5 space-y-4 overflow-y-auto custom-scrollbar flex-1">
              {initiatives.map(init => (
                <div key={init.id} className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-strong)] rounded-lg">
                   <div className="flex items-center justify-between mb-3">
                     <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--bg-surface)] border border-[var(--border-subtle)]" style={{color: init.color}}>
                         {init.icon === 'Zap' ? <Zap className="w-4 h-4"/> : init.icon === 'Wind' ? <Wind className="w-4 h-4"/> : <Leaf className="w-4 h-4"/>}
                       </div>
                       <div>
                         <h4 className="text-sm font-medium text-[var(--text-primary)]">{init.title}</h4>
                         <p className="text-xs text-[var(--text-secondary)]">{init.description}</p>
                       </div>
                     </div>
                     <div className="text-right">
                        <span className="text-lg font-bold text-[var(--text-primary)]">{init.progress}%</span>
                        <p className="text-[10px] text-[var(--text-muted)] uppercase">Complete</p>
                     </div>
                   </div>
                   <div className="w-full bg-[var(--bg-surface)] h-1.5 rounded-full overflow-hidden border border-[var(--border-subtle)]">
                     <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{width: `${init.progress}%`, backgroundColor: init.color}} />
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      <Modal isOpen={addOpen} onClose={() => setAddOpen(false)} title="Log New ESG Initiative">
        <form onSubmit={handleAddInitiative}>
          <label style={{ display: 'block', marginBottom: 4, fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Initiative Title</label>
          <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', borderRadius: 6, color: 'var(--text-primary)', fontSize: 14, marginBottom: 12 }} />
          
          <label style={{ display: 'block', marginBottom: 4, fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Description</label>
          <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', borderRadius: 6, color: 'var(--text-primary)', fontSize: 14, marginBottom: 12, resize:'none' }} />
          
          <label style={{ display: 'block', marginBottom: 4, fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Target Date</label>
          <input type="date" value={formData.targetDate} onChange={e => setFormData({...formData, targetDate: e.target.value})} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', borderRadius: 6, color: 'var(--text-primary)', fontSize: 14, marginBottom: 12, colorScheme: 'dark' }} />
          
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <button type="button" onClick={() => setAddOpen(false)} style={{ flex: 1, padding: '10px 20px', background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-default)', borderRadius: 6, cursor: 'pointer' }}>Cancel</button>
            <button type="submit" style={{ flex: 1, padding: '10px 20px', background: 'var(--status-success)', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>Save Initiative</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
