import { useState, useRef } from "react";
import { Warehouse, Package, TrendingUp, AlertTriangle, Check } from "lucide-react";
import { DataCard } from "../components/ui/DataCard";
import { useAppContext } from "../context/AppContext";
import { useToast } from "../components/ui/Toast";
import Modal from "../components/ui/Modal";
import Spinner from "../components/ui/Spinner";

type Zone = { id: string; utilization: number; items: number; };

const INITIAL_WAREHOUSES = {
  'Chennai WH-01': { capacity: 78, activeSKUs: 4247, criticalItems: 23, throughputIn: 1247, throughputOut: 1189, staffEfficiency: 91.3, zones: Array.from({length:24}, (_,i) => ({ id: 'Z' + (i+1).toString().padStart(2,'0'), utilization: Math.floor(Math.random()*60)+30, items: Math.floor(Math.random()*200)+50 })) },
  'Mumbai WH-02':  { capacity: 54, activeSKUs: 3891, criticalItems: 8,  throughputIn: 987,  throughputOut: 1043, staffEfficiency: 87.6, zones: Array.from({length:24}, (_,i) => ({ id: 'Z' + (i+1).toString().padStart(2,'0'), utilization: Math.floor(Math.random()*50)+20, items: Math.floor(Math.random()*150)+40 })) },
};

export default function WarehouseIntelligence() {
  const { state, dispatch, logAction } = useAppContext();
  const { showToast } = useToast();

  const [selectedWH, setSelectedWH] = useState<'Chennai WH-01'|'Mumbai WH-02'|'All Sites'>('Chennai WH-01');
  const [warehouseData, setWarehouseData] = useState(INITIAL_WAREHOUSES);
  
  const [hoveredZone, setHoveredZone] = useState<Zone|null>(null);
  const [tooltipPos, setTooltipPos] = useState({x:0, y:0});
  
  const [optimizing, setOptimizing] = useState(false);
  const [rerouteOpen, setRerouteOpen] = useState(false);
  const [selectedShipments, setSelectedShipments] = useState<string[]>([]);

  // Compute metrics based on selected view
  const wh = selectedWH === 'All Sites' 
    ? {
        capacity: Math.round((warehouseData['Chennai WH-01'].capacity + warehouseData['Mumbai WH-02'].capacity) / 2),
        activeSKUs: warehouseData['Chennai WH-01'].activeSKUs + warehouseData['Mumbai WH-02'].activeSKUs,
        criticalItems: warehouseData['Chennai WH-01'].criticalItems + warehouseData['Mumbai WH-02'].criticalItems,
        throughputIn: warehouseData['Chennai WH-01'].throughputIn + warehouseData['Mumbai WH-02'].throughputIn,
        throughputOut: warehouseData['Chennai WH-01'].throughputOut + warehouseData['Mumbai WH-02'].throughputOut,
        staffEfficiency: ((warehouseData['Chennai WH-01'].staffEfficiency + warehouseData['Mumbai WH-02'].staffEfficiency) / 2).toFixed(1),
        zones: warehouseData['Chennai WH-01'].zones // Show Chennai map for "All" placeholder
      }
    : warehouseData[selectedWH];

  const handleOptimize = async () => {
    if (selectedWH === 'All Sites') {
      showToast('info', 'Select Warehouse', 'Please select a specific warehouse to optimize.');
      return;
    }
    setOptimizing(true);
    await new Promise(r => setTimeout(r, 2000));
    setWarehouseData(prev => ({ 
      ...prev, 
      [selectedWH]: { 
        ...prev[selectedWH], 
        zones: prev[selectedWH].zones.map((z, i) => [3,7,11].includes(i) ? {...z, utilization: Math.max(20, z.utilization - 10)} : z) 
      }
    }));
    setOptimizing(false);
    showToast('success', 'Layout Optimized', `12% additional space freed in ${selectedWH}`);
    logAction('Warehouse', 'Layout Optimized', `${selectedWH}: 3 zones reorganized`, 'success');
  };

  const handleReroute = () => {
    if (selectedShipments.length === 0) {
      showToast('warning', 'No Shipments Selected', 'Select at least one shipment to reroute.');
      return;
    }
    showToast('success', 'Rerouted', `Selected shipments rerouted to Zone Z08.`);
    logAction('Warehouse', 'Shipments Rerouted', `Critical overflow resolved in ${selectedWH !== 'All Sites' ? selectedWH : 'System'}`, 'warning');
    setRerouteOpen(false);
    setSelectedShipments([]);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6 animate-[fade-up_0.4s_ease-out]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-display text-[var(--text-primary)]">Warehouse Intelligence</h1>
          <p className="text-sm text-[var(--text-secondary)]">Monitor and optimize space utilization locally</p>
        </div>
        <div className="flex bg-[var(--bg-input)] rounded-[var(--radius-md)] p-1 border border-[var(--border-default)]">
          <button onClick={() => setSelectedWH('Chennai WH-01')} className={`px-3 py-1 rounded text-sm font-medium transition-colors ${selectedWH === 'Chennai WH-01' ? 'bg-[var(--bg-active)] shadow-sm text-[var(--text-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}>Chennai - WH-01</button>
          <button onClick={() => setSelectedWH('Mumbai WH-02')} className={`px-3 py-1 rounded text-sm font-medium transition-colors ${selectedWH === 'Mumbai WH-02' ? 'bg-[var(--bg-active)] shadow-sm text-[var(--text-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}>Mumbai - WH-02</button>
          <button onClick={() => setSelectedWH('All Sites')} className={`px-3 py-1 rounded text-sm font-medium transition-colors ${selectedWH === 'All Sites' ? 'bg-[var(--bg-active)] shadow-sm text-[var(--text-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}>All Sites</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DataCard title="Total Capacity" value={`${wh.capacity}%`} change={wh.capacity > 85 ? "Near full" : "Healthy"} changeType={wh.capacity > 85 ? "down" : "neutral"} colorVar={wh.capacity > 85 ? "--status-warning" : "--accent-primary"} subInfo="Current space utilization" />
        <DataCard title="Active SKUs" value={wh.activeSKUs.toLocaleString()} change={`${wh.criticalItems} critical`} changeType="down" colorVar="--status-critical" subInfo="Low stock warnings" />
        <DataCard title="Throughput Today" value={(wh.throughputIn + wh.throughputOut).toLocaleString()} change="Active" changeType="up" colorVar="--kpi-warehouse" subInfo={`${wh.throughputIn} in | ${wh.throughputOut} out`} />
        <DataCard title="Staff Efficiency" value={`${wh.staffEfficiency}%`} change="+2.1%" changeType="up" colorVar="--status-success" subInfo="Target: 90%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Floor Heatmap */}
         <div className="lg:col-span-2 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-5 shadow-[var(--shadow-card)] relative">
            <h3 className="font-semibold text-[var(--text-primary)] mb-4">Floor Utilization Heatmap {selectedWH === 'All Sites' ? '(Showing Chennai)' : ''}</h3>
            <div className="aspect-video bg-[var(--bg-elevated)] border border-[var(--border-strong)] rounded flex items-center justify-center relative overflow-hidden">
                <div className="grid grid-cols-6 grid-rows-4 gap-2 w-full h-full p-4" onMouseLeave={() => setHoveredZone(null)}>
                  {wh.zones.map((z, i) => {
                     const isCrit = z.utilization >= 90;
                     const isHigh = z.utilization >= 80 && z.utilization < 90;
                     const bg = isCrit ? 'var(--status-critical)' : isHigh ? 'var(--status-warning)' : 'var(--status-success)';
                     const opacity = isCrit ? 0.9 : isHigh ? 0.8 : (z.utilization / 100);
                     return (
                       <div key={z.id} 
                         onMouseEnter={(e) => {
                           const rect = e.currentTarget.getBoundingClientRect();
                           setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top - 10 });
                           setHoveredZone(z);
                         }}
                         style={{backgroundColor: bg, opacity: Math.max(0.2, opacity)}}
                         className={`rounded-sm border border-black/20 flex items-center justify-center transition-all hover:opacity-100 hover:border-white/50 cursor-pointer`}>
                         <span className="text-[10px] text-white font-mono font-bold shadow-sm">{z.id}</span>
                       </div>
                     )
                  })}
                </div>
            </div>
            <div className="flex gap-4 mt-4 justify-center text-xs text-[var(--text-secondary)]">
               <span className="flex items-center gap-1"><div className="w-3 h-3 bg-[var(--status-success)] opacity-50 rounded-sm"></div> Optimal (&lt;80%)</span>
               <span className="flex items-center gap-1"><div className="w-3 h-3 bg-[var(--status-warning)] opacity-80 rounded-sm"></div> Heavy (80-90%)</span>
               <span className="flex items-center gap-1"><div className="w-3 h-3 bg-[var(--status-critical)] opacity-90 rounded-sm"></div> Critical (&gt;90%)</span>
            </div>

            {hoveredZone && (
              <div style={{
                position: 'fixed',
                top: tooltipPos.y,
                left: tooltipPos.x,
                transform: 'translate(-50%, -100%)',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-strong)',
                padding: '6px 10px',
                borderRadius: 4,
                boxShadow: 'var(--shadow-elevated)',
                fontSize: 12,
                color: 'var(--text-primary)',
                pointerEvents: 'none',
                zIndex: 50,
                whiteSpace: 'nowrap'
              }}>
                <strong>Zone {hoveredZone.id}</strong> | Util: {hoveredZone.utilization}% | Items: {hoveredZone.items}
              </div>
            )}
         </div>

         {/* AI Insights & Alerts */}
         <div className="lg:col-span-1 space-y-6">
           <div className="bg-[var(--bg-hover)] border-2 border-[var(--accent-primary)] rounded-[var(--radius-lg)] p-5 relative shadow-[var(--shadow-glow-accent)]">
               <div className="absolute top-0 right-0 bg-[var(--accent-primary)] text-black text-[10px] font-bold px-2 py-0.5 rounded-bl-[var(--radius-sm)] rounded-tr-[var(--radius-lg)] uppercase tracking-wider">AI Insight</div>
               <h3 className="font-medium text-[var(--text-primary)] mb-2">Space Consolidation</h3>
               <p className="text-sm text-[var(--text-secondary)] mb-4">Zones C3 and D4 can be consolidated. 12% space freed without capacity loss.</p>
               <button 
                onClick={handleOptimize} 
                disabled={optimizing}
                className="w-full flex items-center justify-center gap-2 py-2 bg-[image:var(--gradient-accent)] text-white text-sm font-semibold rounded-[var(--radius-md)] hover:brightness-110 disabled:opacity-70">
                 {optimizing ? <Spinner size="sm" /> : 'Auto-Optimize Layout'}
               </button>
           </div>

           <div className="bg-[var(--status-critical-soft)] border border-[var(--status-critical)] rounded-[var(--radius-lg)] p-5 relative">
               <AlertTriangle className="absolute right-4 top-4 text-[var(--status-critical)] opacity-30 h-10 w-10" />
               <h3 className="font-medium text-[var(--status-critical)] mb-2">Predicted Overflow</h3>
               <p className="text-sm text-[var(--text-secondary)] mb-4">Electronics zone at capacity in 2.8 days based on incoming shipments.</p>
               <button onClick={() => setRerouteOpen(true)} className="w-full py-2 bg-[var(--bg-surface)] border border-[var(--status-critical)] text-[var(--status-critical)] text-sm font-semibold rounded-[var(--radius-md)] hover:bg-[var(--status-critical)] hover:text-white transition-colors">Route to Alternative Zone</button>
           </div>
         </div>
      </div>

      <Modal isOpen={rerouteOpen} onClose={() => setRerouteOpen(false)} title="Reroute to Alternative Zone">
        <p className="text-sm text-[var(--text-secondary)] mb-4">Select shipments to reroute to a lower-utilization zone (Zone Z08):</p>
        
        <div className="space-y-2 mb-6">
          {state.shipments.filter(s => s.status === 'active').slice(0, 3).map(s => (
            <label key={s.id} className="flex items-center gap-3 p-3 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded cursor-pointer hover:border-[var(--border-strong)]">
              <input 
                type="checkbox" 
                checked={selectedShipments.includes(s.id)} 
                onChange={(e) => {
                  if (e.target.checked) setSelectedShipments([...selectedShipments, s.id]);
                  else setSelectedShipments(selectedShipments.filter(id => id !== s.id));
                }}
                className="w-4 h-4 accent-[var(--accent-primary)]" 
              />
              <div className="flex-1">
                <div className="font-mono text-sm text-[var(--text-primary)]">{s.id}</div>
                <div className="text-xs text-[var(--text-secondary)]">{s.cargo} ({s.weight})</div>
              </div>
            </label>
          ))}
          {state.shipments.filter(s => s.status === 'active').length === 0 && (
            <p className="text-sm text-[var(--text-secondary)] text-center py-2">No active shipments available.</p>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={() => setRerouteOpen(false)} style={{ padding: '8px 16px', background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-default)', borderRadius: 6, cursor: 'pointer' }}>Cancel</button>
          <button onClick={handleReroute} style={{ padding: '8px 16px', background: 'var(--status-critical)', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>Confirm Reroute</button>
        </div>
      </Modal>

    </div>
  );
}
