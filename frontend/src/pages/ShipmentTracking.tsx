import { useState } from "react";
import { Search, MapPin, Package, User, Clock, Filter, Plus, MoreVertical } from "lucide-react";
import { StatusBadge } from "../components/ui/StatusBadge";
import { LiveIndicator } from "../components/ui/LiveIndicator";
import { useAppContext, ShipmentStatus, Shipment } from "../context/AppContext";
import { useToast } from "../components/ui/Toast";
import Modal from "../components/ui/Modal";
import Spinner from "../components/ui/Spinner";

export default function ShipmentTracking() {
  const { state, dispatch, logAction } = useAppContext();
  const { showToast } = useToast();
  
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ShipmentStatus>('all');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    origin: "", destination: "", driver: "", vehicle: "", cargo: "", weight: ""
  });
  const [formError, setFormError] = useState("");

  const filtered = state.shipments
    .filter(s => {
      const q = searchQuery.toLowerCase();
      return s.id.toLowerCase().includes(q) || 
             s.origin.toLowerCase().includes(q) || 
             s.destination.toLowerCase().includes(q) || 
             s.driver.toLowerCase().includes(q);
    })
    .filter(s => statusFilter === 'all' || s.status === statusFilter)
    .sort((a,b) => {
      const order = {delayed: 0, active: 1, pending: 2, delivered: 3};
      return order[a.status] - order[b.status];
    });

  const handleNewShipment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.origin || !formData.destination || !formData.driver || !formData.vehicle || !formData.cargo || !formData.weight) {
      setFormError("All fields are required");
      return;
    }
    const id = "NL-" + (2400 + state.shipments.length + 1);
    dispatch({ 
      type: 'ADD_SHIPMENT', 
      payload: { 
        id, ...formData, status: 'pending', eta: '', progress: 0, createdAt: new Date().toISOString() 
      }
    });
    logAction('Shipments', 'New Shipment Created', `${id}: ${formData.origin} → ${formData.destination}`, 'success');
    showToast('success', 'Shipment Created', `Shipment ${id} added successfully.`);
    setAddOpen(false);
    setFormData({ origin: "", destination: "", driver: "", vehicle: "", cargo: "", weight: "" });
    setFormError("");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)] animate-[fade-up_0.4s_ease-out]">
      {/* Left: Map Panel */}
      <div className="flex-1 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] overflow-hidden relative flex flex-col">
        <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
          <button className="text-xs font-medium bg-[var(--bg-elevated)] border border-[var(--border-strong)] px-3 py-1.5 rounded-[var(--radius-sm)] shadow-[var(--shadow-elevated)] hover:bg-[var(--bg-hover)] flex items-center gap-1"><Package className="w-3 h-3"/> Shipments</button>
          <button className="text-xs font-medium bg-[var(--bg-elevated)] border border-[var(--border-strong)] px-3 py-1.5 rounded-[var(--radius-sm)] shadow-[var(--shadow-elevated)] hover:bg-[var(--bg-hover)] text-[var(--status-warning)] flex items-center gap-1"><MapPin className="w-3 h-3"/> Risk Zones</button>
        </div>
        
        <div style={{background: 'var(--bg-elevated)', borderRadius: 8, padding: 16, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative'}}>
          <svg viewBox="0 0 400 500" width="100%" height="100%" style={{opacity: 0.6}}>
            <path d="M200,40 L280,80 L320,140 L300,200 L340,260 L310,320 L280,380 L240,420 L200,460 L160,420 L120,380 L90,320 L60,260 L100,200 L80,140 L120,80 Z" fill="none" stroke="var(--accent-primary)" strokeWidth="2" opacity="0.5"/>
            {state.shipments.filter(s => s.status === 'active').map((s, i) => (
              <circle key={s.id} cx={120 + (i * 40) % 160} cy={150 + (i * 55) % 200} r="8"
                fill={s.id === selectedShipment?.id ? 'var(--accent-primary)' : 'var(--status-warning)'}
                style={{cursor: 'pointer'}}
                onClick={() => setSelectedShipment(s)}
              >
                <title>{s.id}: {s.origin} → {s.destination}</title>
              </circle>
            ))}
          </svg>
          <div style={{position: 'absolute', bottom: 16, left: 16, fontSize: 11, color: 'var(--text-secondary)'}}>
            ● Active shipments shown on map
          </div>
        </div>

        {/* Selected Shipment Overlay */}
        {selectedShipment ? (
          <div className="absolute bottom-4 left-4 right-4 lg:right-auto lg:w-80 bg-[var(--bg-elevated)]/90 backdrop-blur-md border border-[var(--border-strong)] rounded-[var(--radius-md)] p-4 shadow-[var(--shadow-elevated)]">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-mono text-[var(--accent-primary)] font-semibold">{selectedShipment.id}</h3>
              <StatusBadge status={selectedShipment.status as any} pulse={selectedShipment.status === 'active'} />
            </div>
            <div className="text-sm text-[var(--text-primary)] mb-4">{selectedShipment.origin} &rarr; {selectedShipment.destination}</div>
            
            <div className="space-y-2 text-xs text-[var(--text-secondary)]">
              <div className="flex justify-between"><span>ETA:</span> <span className="text-[var(--text-primary)]">{selectedShipment.eta || 'N/A'}</span></div>
              <div className="flex justify-between"><span>Driver:</span> <span className="text-[var(--text-primary)]">{selectedShipment.driver}</span></div>
              <div className="flex justify-between"><span>Vehicle:</span> <span className="font-mono text-[var(--text-primary)]">{selectedShipment.vehicle}</span></div>
            </div>
          </div>
        ) : (
          <div className="absolute bottom-4 left-4 right-4 lg:right-auto lg:w-80 bg-[var(--bg-elevated)]/90 backdrop-blur-md border border-[var(--border-strong)] rounded-[var(--radius-md)] p-4 shadow-[var(--shadow-elevated)] text-center text-sm text-[var(--text-secondary)]">
            Click a shipment or map dot to view details
          </div>
        )}
      </div>

      {/* Right: Shipment List */}
      <div className="w-full lg:w-[400px] xl:w-[480px] bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] flex flex-col overflow-hidden">
        <div className="p-4 border-b border-[var(--border-subtle)] flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-display text-[var(--text-primary)]">Shipments</h2>
            <div className="flex items-center gap-2">
              <LiveIndicator />
              <button onClick={() => setAddOpen(true)} className="bg-[var(--accent-primary)] text-white p-1 rounded hover:opacity-90">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} type="text" placeholder="Search tracking #, origin..." className="w-full bg-[var(--bg-input)] border border-[var(--border-default)] rounded-[var(--radius-sm)] py-1.5 pl-8 pr-3 text-sm focus:border-[var(--accent-primary)] outline-none" />
            </div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)} className="bg-[var(--bg-input)] border border-[var(--border-default)] rounded-[var(--radius-sm)] text-sm px-2 text-[var(--text-secondary)] outline-none">
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="delayed">Delayed</option>
              <option value="delivered">Delivered</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
          {filtered.map((shipment) => (
            <div 
              key={shipment.id}
              onClick={() => setSelectedShipment(shipment)}
              className={`p-3 rounded-[var(--radius-md)] border cursor-pointer transition-all relative ${
                selectedShipment?.id === shipment.id 
                  ? 'bg-[var(--bg-active)] border-[var(--border-accent)]' 
                  : 'bg-[var(--bg-elevated)] border-[var(--border-default)] hover:border-[var(--border-strong)]'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-sm text-[var(--text-primary)]">{shipment.id}</span>
                <div className="flex items-center gap-2">
                  <StatusBadge status={shipment.status as any} pulse={shipment.status === 'active'} />
                  
                  {/* Actions Menu */}
                  <div className="relative" onClick={e => e.stopPropagation()}>
                    <button onClick={() => setOpenMenuId(openMenuId === shipment.id ? null : shipment.id)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    {openMenuId === shipment.id && (
                      <div className="absolute right-0 top-6 w-36 bg-[var(--bg-elevated)] border border-[var(--border-strong)] rounded shadow-lg z-20 py-1">
                        {shipment.status !== 'delivered' && (
                          <button onClick={() => {
                            dispatch({ type: 'UPDATE_SHIPMENT', payload: {...shipment, status: 'delivered', progress: 100} });
                            logAction('Shipments', 'Marked Delivered', `${shipment.id}: ${shipment.origin} → ${shipment.destination}`, 'success');
                            showToast('success', 'Shipment Delivered', `${shipment.id} marked as delivered.`);
                            setOpenMenuId(null);
                          }} className="block w-full text-left px-3 py-1.5 text-xs hover:bg-[var(--bg-hover)] text-[var(--text-primary)]">
                            Mark as Delivered
                          </button>
                        )}
                        {shipment.status !== 'delayed' && shipment.status !== 'delivered' && (
                          <button onClick={() => {
                            dispatch({ type: 'UPDATE_SHIPMENT', payload: {...shipment, status: 'delayed'} });
                            logAction('Shipments', 'Flagged as Delayed', shipment.id, 'warning');
                            showToast('warning', 'Shipment Delayed', `${shipment.id} has been flagged as delayed.`);
                            setOpenMenuId(null);
                          }} className="block w-full text-left px-3 py-1.5 text-xs hover:bg-[var(--bg-hover)] text-[var(--text-primary)]">
                            Flag as Delayed
                          </button>
                        )}
                        <button onClick={() => {
                          setSelectedShipment(shipment);
                          setDetailOpen(true);
                          setOpenMenuId(null);
                        }} className="block w-full text-left px-3 py-1.5 text-xs hover:bg-[var(--bg-hover)] text-[var(--text-primary)]">
                          View Details
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-sm font-medium text-[var(--text-primary)] mb-3">
                {shipment.origin} &rarr; {shipment.destination}
              </div>
              <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mb-2">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {shipment.eta || 'N/A'}</span>
                <span className="flex items-center gap-1"><User className="w-3 h-3"/> {shipment.driver}</span>
              </div>
              <div className="w-full bg-[var(--bg-input)] h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all ${shipment.status === 'delayed' ? 'bg-[var(--status-warning)]' : 'bg-[var(--accent-primary)]'}`} 
                  style={{ width: `${shipment.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <Modal isOpen={detailOpen} onClose={() => setDetailOpen(false)} title={`Shipment ${selectedShipment?.id}`}>
        {selectedShipment && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div><span style={{color:'var(--text-secondary)', fontSize: 13}}>Origin</span><div style={{fontWeight: 500}}>{selectedShipment.origin}</div></div>
            <div><span style={{color:'var(--text-secondary)', fontSize: 13}}>Destination</span><div style={{fontWeight: 500}}>{selectedShipment.destination}</div></div>
            <div><span style={{color:'var(--text-secondary)', fontSize: 13}}>Status</span><div><StatusBadge status={selectedShipment.status} /></div></div>
            <div><span style={{color:'var(--text-secondary)', fontSize: 13}}>ETA</span><div style={{fontWeight: 500}}>{selectedShipment.eta || 'Pending'}</div></div>
            <div><span style={{color:'var(--text-secondary)', fontSize: 13}}>Driver</span><div style={{fontWeight: 500}}>{selectedShipment.driver}</div></div>
            <div><span style={{color:'var(--text-secondary)', fontSize: 13}}>Vehicle</span><div style={{fontWeight: 500}}>{selectedShipment.vehicle}</div></div>
            <div><span style={{color:'var(--text-secondary)', fontSize: 13}}>Cargo</span><div style={{fontWeight: 500}}>{selectedShipment.cargo}</div></div>
            <div><span style={{color:'var(--text-secondary)', fontSize: 13}}>Weight</span><div style={{fontWeight: 500}}>{selectedShipment.weight}</div></div>
            <div style={{gridColumn: '1 / -1'}}><span style={{color:'var(--text-secondary)', fontSize: 13}}>Created At</span><div style={{fontWeight: 500}}>{new Date(selectedShipment.createdAt).toLocaleString('en-IN')}</div></div>
            <div style={{gridColumn: '1 / -1'}}>
              <span style={{color:'var(--text-secondary)', fontSize: 13}}>Progress ({selectedShipment.progress}%)</span>
              <div style={{width: '100%', background: 'var(--bg-secondary)', height: 8, borderRadius: 4, marginTop: 4}}>
                <div style={{width: `${selectedShipment.progress}%`, background: 'var(--accent-primary)', height: '100%', borderRadius: 4}} />
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Shipment Modal */}
      <Modal isOpen={addOpen} onClose={() => setAddOpen(false)} title="New Shipment">
        <form onSubmit={handleNewShipment}>
          {formError && <div style={{ color: 'var(--status-critical)', fontSize: 13, marginBottom: 12 }}>{formError}</div>}
          
          <label style={{ display: 'block', marginBottom: 4, fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Origin</label>
          <input value={formData.origin} onChange={e => setFormData({...formData, origin: e.target.value})} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', borderRadius: 6, color: 'var(--text-primary)', fontSize: 14, marginBottom: 12 }} />
          
          <label style={{ display: 'block', marginBottom: 4, fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Destination</label>
          <input value={formData.destination} onChange={e => setFormData({...formData, destination: e.target.value})} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', borderRadius: 6, color: 'var(--text-primary)', fontSize: 14, marginBottom: 12 }} />
          
          <label style={{ display: 'block', marginBottom: 4, fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Driver Name</label>
          <input value={formData.driver} onChange={e => setFormData({...formData, driver: e.target.value})} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', borderRadius: 6, color: 'var(--text-primary)', fontSize: 14, marginBottom: 12 }} />
          
          <label style={{ display: 'block', marginBottom: 4, fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Vehicle ID</label>
          <input value={formData.vehicle} onChange={e => setFormData({...formData, vehicle: e.target.value})} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', borderRadius: 6, color: 'var(--text-primary)', fontSize: 14, marginBottom: 12 }} />
          
          <label style={{ display: 'block', marginBottom: 4, fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Cargo Type</label>
          <input value={formData.cargo} onChange={e => setFormData({...formData, cargo: e.target.value})} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', borderRadius: 6, color: 'var(--text-primary)', fontSize: 14, marginBottom: 12 }} />
          
          <label style={{ display: 'block', marginBottom: 4, fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Weight</label>
          <input value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', borderRadius: 6, color: 'var(--text-primary)', fontSize: 14, marginBottom: 12 }} />
          
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <button type="button" onClick={() => setAddOpen(false)} style={{ flex: 1, padding: '10px 20px', background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-default)', borderRadius: 6, cursor: 'pointer' }}>Cancel</button>
            <button type="submit" style={{ flex: 1, padding: '10px 20px', background: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>Create</button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
