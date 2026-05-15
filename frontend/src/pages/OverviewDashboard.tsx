import { useState, useMemo } from "react";
import { AlertTriangle, TrendingUp, CheckCircle, Clock } from "lucide-react";
import { DataCard } from "../components/ui/DataCard";
import { LiveIndicator } from "../components/ui/LiveIndicator";
import { StatusBadge } from "../components/ui/StatusBadge";
import { useLiveActivity } from "../hooks/useLiveActivity";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAppContext } from "../context/AppContext";
import { useToast } from "../components/ui/Toast";
import Modal from "../components/ui/Modal";
import { useNavigate } from "react-router-dom";

export default function OverviewDashboard() {
  const { state, dispatch, logAction } = useAppContext();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const activities = useLiveActivity();

  const [bannerVisible, setBannerVisible] = useState(true);
  const [newShipmentOpen, setNewShipmentOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    origin: "", destination: "", driver: "", vehicle: "", cargo: "", weight: ""
  });
  const [formError, setFormError] = useState("");

  const activeShipments = state.shipments.filter(s => s.status === 'active').length;
  const delayedShipments = state.shipments.filter(s => s.status === 'delayed').length;
  const activeVehicles = state.vehicles.filter(v => v.status === 'active').length;
  
  const delivered = state.shipments.filter(s => s.status === 'delivered').length;
  const total = state.shipments.length;
  const opScore = total > 0 ? Math.round((delivered / total) * 100) : 94;

  const chartData = useMemo(() => {
    return Array.from({length: 7}, (_, i) => {
      const d = new Date(); d.setDate(d.getDate() - (6 - i));
      return {
        date: d.toLocaleDateString('en-IN', {weekday: 'short'}),
        active: Math.floor(Math.random() * 5) + activeShipments - 2,
        delayed: Math.floor(Math.random() * 3) + delayedShipments - 1,
      };
    });
  }, [activeShipments, delayedShipments]);

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
    logAction('Dashboard', 'New Shipment Created', `${id}: ${formData.origin} → ${formData.destination}`, 'success');
    showToast('success', 'Shipment Created', `Shipment ${id} added successfully.`);
    setNewShipmentOpen(false);
    setFormData({ origin: "", destination: "", driver: "", vehicle: "", cargo: "", weight: "" });
    setFormError("");
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6 animate-[fade-up_0.4s_ease-out]">
      {/* Critical Alert Banner */}
      {bannerVisible && (
        <div className="bg-[var(--status-critical-soft)] border border-[var(--status-critical)] rounded-[var(--radius-md)] p-3 flex items-center justify-between shadow-[var(--shadow-glow-critical)]">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-[var(--status-critical)]" />
            <span className="text-sm font-medium text-[var(--text-primary)]">
              <strong className="text-[var(--status-critical)]">CRITICAL:</strong> 2 active shipment delays detected — AI recommends immediate rerouting
            </span>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate('/dashboard/risk')} className="text-xs font-semibold px-3 py-1.5 bg-[var(--status-critical)] text-white rounded-[var(--radius-sm)] hover:brightness-110 transition-all">View Alerts</button>
            <button onClick={() => setBannerVisible(false)} className="text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)]">Dismiss</button>
          </div>
        </div>
      )}

      {/* Row 1: KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DataCard
          title="Total Active Shipments"
          value={activeShipments.toString()}
          change="+8%"
          changeType="up"
          colorVar="--kpi-deliveries"
          subInfo={`${state.shipments.length - activeShipments - delayedShipments} pending/delivered | ${delayedShipments} delayed`}
        />
        <DataCard
          title="Active Fleet Vehicles"
          value={activeVehicles.toString()}
          change="-3"
          changeType="neutral"
          colorVar="--kpi-fleet"
          subInfo={`${state.vehicles.length - activeVehicles} idle/maintenance`}
        />
        <DataCard
          title="Delayed Shipments"
          value={delayedShipments.toString()}
          change="-2"
          changeType="down"
          colorVar="--kpi-delay"
          subInfo="AI: 2 preventable | 2 weather-related"
        />
        <DataCard
          title="Operational Score"
          value={opScore + "%"}
          change="+1.4%"
          changeType="up"
          colorVar="--status-success"
          subInfo="Fuel: ₹4.2L saved today | CO₂: 2.4T reduced"
        />
      </div>

      {/* Row 2: Trend Chart + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-5 shadow-[var(--shadow-card)] flex flex-col">
          <h3 className="font-semibold text-[var(--text-primary)] mb-4">Shipment Volume (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" />
              <XAxis dataKey="date" stroke="var(--text-secondary)" fontSize={11} />
              <YAxis stroke="var(--text-secondary)" fontSize={11} />
              <Tooltip contentStyle={{background: 'var(--bg-elevated)', border: '1px solid var(--border-strong)'}} />
              <Area type="monotone" dataKey="active" stroke="var(--accent-primary)" fill="var(--accent-primary)" fillOpacity={0.1} name="Active" />
              <Area type="monotone" dataKey="delayed" stroke="var(--status-warning)" fill="var(--status-warning)" fillOpacity={0.1} name="Delayed" />
            </AreaChart>
          </ResponsiveContainer>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-auto pt-6">
            <button onClick={() => setNewShipmentOpen(true)} className="py-2 bg-[var(--bg-elevated)] border border-[var(--border-strong)] rounded hover:border-[var(--accent-primary)] text-sm font-medium transition-colors">New Shipment</button>
            <button onClick={() => navigate('/dashboard/routes')} className="py-2 bg-[var(--bg-elevated)] border border-[var(--border-strong)] rounded hover:border-[var(--accent-primary)] text-sm font-medium transition-colors">Optimize Routes</button>
            <button onClick={() => navigate('/dashboard/fleet')} className="py-2 bg-[var(--bg-elevated)] border border-[var(--border-strong)] rounded hover:border-[var(--accent-primary)] text-sm font-medium transition-colors">Fleet Status</button>
            <button onClick={() => navigate('/dashboard/risk')} className="py-2 bg-[var(--bg-elevated)] border border-[var(--border-strong)] rounded hover:border-[var(--status-critical)] hover:text-[var(--status-critical)] text-sm font-medium transition-colors">Risk Overview</button>
          </div>
        </div>

        {/* Right: Live Feed */}
        <div className="lg:col-span-1 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] flex flex-col overflow-hidden max-h-[400px]">
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
                  {act.type === "error" && <AlertTriangle className="h-4 w-4 text-[var(--status-critical)]" />}
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

      <Modal isOpen={newShipmentOpen} onClose={() => setNewShipmentOpen(false)} title="New Shipment">
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
            <button type="button" onClick={() => setNewShipmentOpen(false)} style={{ flex: 1, padding: '10px 20px', background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-default)', borderRadius: 6, cursor: 'pointer' }}>Cancel</button>
            <button type="submit" style={{ flex: 1, padding: '10px 20px', background: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>Create</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
