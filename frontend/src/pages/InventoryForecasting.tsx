import { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Plus } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { useToast } from "../components/ui/Toast";
import Modal from "../components/ui/Modal";
import Spinner from "../components/ui/Spinner";

type Category = 'All Categories' | 'Electronics' | 'Automotive';

export default function InventoryForecasting() {
  const { logAction } = useAppContext();
  const { showToast } = useToast();

  const [skus, setSkus] = useState([
    { id: 'SKU-2401', name: 'Brake Pads (Premium)', category: 'Automotive', stock: 45, reorderPoint: 100, unit: 'units', ordered: false },
    { id: 'SKU-2402', name: 'Micro Processors i7', category: 'Electronics', stock: 12, reorderPoint: 50, unit: 'units', ordered: false },
    { id: 'SKU-2403', name: 'Engine Oil 5W-30', category: 'Automotive', stock: 89, reorderPoint: 150, unit: 'litres', ordered: false },
    { id: 'SKU-2404', name: 'SSD 1TB NVMe', category: 'Electronics', stock: 8, reorderPoint: 30, unit: 'units', ordered: false },
    { id: 'SKU-2405', name: 'Spark Plugs (Set)', category: 'Automotive', stock: 234, reorderPoint: 300, unit: 'sets', ordered: false },
  ]);

  const [category, setCategory] = useState<Category>('All Categories');
  const [timeRange, setTimeRange] = useState<30 | 90>(30);
  const [orderingId, setOrderingId] = useState<string | null>(null);
  const [accuracy, setAccuracy] = useState(94.2);
  const [addSkuOpen, setAddSkuOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    id: "", name: "", category: "Electronics", stock: "", reorderPoint: ""
  });

  const CHART_DATA = useMemo(() => {
    const points = timeRange === 30 ? 6 : 9;
    const gap = timeRange / points;
    return Array.from({length: points}, (_, i) => ({
      day: 'Day ' + Math.round((i+1)*gap),
      Electronics: Math.floor(Math.random()*80)+40,
      Automotive: Math.floor(Math.random()*120)+60,
      All: Math.floor(Math.random()*180)+100,
    }));
  }, [timeRange]);

  const chartDataKey = category === 'All Categories' ? 'All' : category;

  const shortages = skus
    .filter(s => s.stock < s.reorderPoint)
    .filter(s => category === 'All Categories' || s.category === category);

  const handleOrder = async (sku: any) => {
    setOrderingId(sku.id);
    await new Promise(r => setTimeout(r, 1000));
    setSkus(prev => prev.map(s => s.id === sku.id ? {...s, ordered: true} : s));
    setAccuracy(prev => Math.min(99.9, prev + 0.1));
    setOrderingId(null);
    logAction('Inventory', 'Purchase Order Created', `${sku.id}: ${sku.name}`, 'success');
    showToast('success', 'Order Placed', `Purchase order created for ${sku.name}`);
  };

  const handleAddSku = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id || !formData.name || !formData.stock || !formData.reorderPoint) {
      showToast('error', 'Error', 'Please fill all fields');
      return;
    }
    const newSku = {
      id: formData.id,
      name: formData.name,
      category: formData.category,
      stock: Number(formData.stock),
      reorderPoint: Number(formData.reorderPoint),
      unit: 'units',
      ordered: false
    };
    setSkus(prev => [...prev, newSku]);
    logAction('Inventory', 'SKU Added', `${newSku.id}: ${newSku.name}`, 'info');
    showToast('success', 'SKU Added', `${newSku.name} added to inventory.`);
    setAddSkuOpen(false);
    setFormData({ id: "", name: "", category: "Electronics", stock: "", reorderPoint: "" });
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6 animate-[fade-up_0.4s_ease-out]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-display text-[var(--text-primary)]">Inventory Forecasting</h1>
          <p className="text-sm text-[var(--text-secondary)]">Machine learning demand prediction and stockout prevention</p>
        </div>
        <div className="flex bg-[var(--bg-input)] rounded-[var(--radius-md)] p-1 border border-[var(--border-default)]">
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value as Category)}
            className="bg-transparent text-sm text-[var(--text-primary)] outline-none px-2 pr-4 border-r border-[var(--border-subtle)] appearance-none"
          >
             <option>All Categories</option>
             <option>Electronics</option>
             <option>Automotive</option>
          </select>
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(Number(e.target.value) as 30|90)}
            className="bg-transparent text-sm text-[var(--text-primary)] outline-none px-2 pl-4 appearance-none"
          >
             <option value={30}>Next 30 Days</option>
             <option value={90}>Next 90 Days</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] p-5">
           <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-[var(--text-primary)]">Demand Forecast Model (Prophet v1.4)</h3>
              <span className="text-xs bg-[var(--status-success-soft)] text-[var(--status-success)] px-2 py-0.5 rounded font-mono transition-all">Accuracy: {accuracy.toFixed(1)}%</span>
           </div>
           <div className="h-[300px] w-full">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                  <Area type="monotone" dataKey={chartDataKey} stroke="var(--accent-primary)" fillOpacity={1} fill="url(#colorForecast)" strokeWidth={2} />
                </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Shortages Table */}
        <div className="lg:col-span-1 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] overflow-hidden flex flex-col">
           <div className="p-4 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)] flex justify-between items-center">
             <h3 className="font-semibold text-[var(--text-primary)] text-sm flex items-center gap-2">
               <AlertTriangle className="w-4 h-4 text-[var(--status-warning)]" />
               Predicted Shortages
             </h3>
             <button onClick={() => setAddSkuOpen(true)} className="text-xs flex items-center gap-1 bg-[var(--accent-primary)] text-white px-2 py-1 rounded hover:opacity-90">
                <Plus className="w-3 h-3" /> SKU
             </button>
           </div>
           <div className="flex-1 overflow-y-auto p-2 space-y-2">
             {shortages.map((s) => {
                const isCrit = s.stock < s.reorderPoint * 0.5;
                return (
                 <div key={s.id} className={`p-3 rounded-[var(--radius-md)] border ${isCrit ? 'bg-[var(--status-critical-soft)] border-[var(--status-critical)]' : 'bg-[var(--status-warning-soft)] border-[var(--status-warning)]'}`}>
                    <div className="flex justify-between items-start mb-1">
                       <span className="text-xs font-mono font-medium text-[var(--text-primary)]">{s.id}</span>
                       <span className={`text-[10px] font-bold uppercase ${isCrit ? 'text-[var(--status-critical)]' : 'text-[var(--status-warning)]'}`}>Shortage</span>
                    </div>
                    <p className="text-sm text-[var(--text-primary)] mb-2 truncate">{s.name}</p>
                    <div className="flex justify-between items-center text-xs text-[var(--text-secondary)] mb-3">
                       <span>Stock: {s.stock}</span>
                       <span>Reorder: {s.reorderPoint}</span>
                    </div>
                    {s.ordered ? (
                      <button disabled className="w-full py-1.5 rounded text-xs font-medium bg-[var(--bg-elevated)] text-[var(--text-success)] border border-[var(--status-success)] cursor-not-allowed">Ordered ✓</button>
                    ) : (
                      <button 
                        onClick={() => handleOrder(s)}
                        disabled={orderingId === s.id}
                        className={`w-full py-1.5 rounded text-xs font-medium transition-colors flex items-center justify-center gap-2 ${isCrit ? 'bg-[var(--status-critical)] text-white hover:brightness-110' : 'bg-[var(--status-warning)] text-white hover:brightness-110'} disabled:opacity-70`}
                      >
                        {orderingId === s.id ? <Spinner size="sm" /> : 'Order Now'}
                      </button>
                    )}
                 </div>
                );
             })}
             {shortages.length === 0 && (
               <p className="text-sm text-[var(--text-secondary)] text-center py-4">No shortages predicted for {category}.</p>
             )}
           </div>
        </div>
      </div>

      <Modal isOpen={addSkuOpen} onClose={() => setAddSkuOpen(false)} title="Add SKU">
        <form onSubmit={handleAddSku}>
          <label style={{ display: 'block', marginBottom: 4, fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>SKU ID</label>
          <input value={formData.id} onChange={e => setFormData({...formData, id: e.target.value})} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', borderRadius: 6, color: 'var(--text-primary)', fontSize: 14, marginBottom: 12 }} />
          
          <label style={{ display: 'block', marginBottom: 4, fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Product Name</label>
          <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', borderRadius: 6, color: 'var(--text-primary)', fontSize: 14, marginBottom: 12 }} />
          
          <label style={{ display: 'block', marginBottom: 4, fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Category</label>
          <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', borderRadius: 6, color: 'var(--text-primary)', fontSize: 14, marginBottom: 12 }}>
            <option>Electronics</option>
            <option>Automotive</option>
          </select>
          
          <label style={{ display: 'block', marginBottom: 4, fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Current Stock</label>
          <input type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', borderRadius: 6, color: 'var(--text-primary)', fontSize: 14, marginBottom: 12 }} />
          
          <label style={{ display: 'block', marginBottom: 4, fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Reorder Point</label>
          <input type="number" value={formData.reorderPoint} onChange={e => setFormData({...formData, reorderPoint: e.target.value})} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', borderRadius: 6, color: 'var(--text-primary)', fontSize: 14, marginBottom: 12 }} />
          
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <button type="button" onClick={() => setAddSkuOpen(false)} style={{ flex: 1, padding: '10px 20px', background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-default)', borderRadius: 6, cursor: 'pointer' }}>Cancel</button>
            <button type="submit" style={{ flex: 1, padding: '10px 20px', background: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>Save</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
