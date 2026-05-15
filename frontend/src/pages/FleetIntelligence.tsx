import { useState } from "react";
import { Truck, AlertTriangle, TrendingUp, Filter, Settings, Activity, X } from "lucide-react";
import { DataCard } from "../components/ui/DataCard";
import { useAppContext, Vehicle } from "../context/AppContext";
import { useToast } from "../components/ui/Toast";
import Modal from "../components/ui/Modal";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function FleetIntelligence() {
  const { state, dispatch, logAction } = useAppContext();
  const { showToast } = useToast();

  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<'id' | 'status' | 'fuelEff' | 'speed'>('id');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [driverModalOpen, setDriverModalOpen] = useState(false);
  const [maintModalOpen, setMaintModalOpen] = useState(false);
  
  const [coachingAlerts, setCoachingAlerts] = useState([
    { id: 'c1', driver: 'Rajan Kumar', vehicle: 'VH-001', issue: 'Harsh braking detected — 12 events in last 500km', severity: 'warning' },
    { id: 'c2', driver: 'Suresh Patel', vehicle: 'VH-002', issue: 'Fuel efficiency 18% below fleet average', severity: 'error' },
    { id: 'c3', driver: 'Vikram Rao', vehicle: 'VH-004', issue: 'Idle time exceeds recommended threshold', severity: 'info' },
  ]);

  const activeVehiclesCount = state.vehicles.filter(v => v.status === 'active').length;
  const maintenanceCount = state.vehicles.filter(v => v.status === 'maintenance').length;
  const avgFuelEff = state.vehicles.length ? (state.vehicles.reduce((sum, v) => sum + v.fuelEff, 0) / state.vehicles.length).toFixed(1) : "0.0";
  const utilization = state.vehicles.length ? Math.round((activeVehiclesCount / state.vehicles.length) * 100) : 0;

  const filteredVehicles = state.vehicles
    .filter(v => v.id.toLowerCase().includes(search.toLowerCase()) || v.driver.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      let valA = a[sortKey];
      let valB = b[sortKey];
      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortDir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      } else if (typeof valA === 'number' && typeof valB === 'number') {
        return sortDir === 'asc' ? valA - valB : valB - valA;
      }
      return 0;
    });

  const handleSort = (key: 'id' | 'status' | 'fuelEff' | 'speed') => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const handleMaintenance = (v: Vehicle) => {
    if (v.status !== 'maintenance') {
      dispatch({ type: 'UPDATE_VEHICLE', payload: { ...v, status: 'maintenance' } });
      logAction('Fleet', 'Maintenance Scheduled', `${v.id} (${v.driver})`, 'warning');
      showToast('warning', 'Maintenance Scheduled', `${v.id} sent to maintenance.`);
    } else {
      showToast('info', 'Already in Maintenance', `${v.id} is already scheduled.`);
    }
  };

  const dismissAlert = (alert: any) => {
    setCoachingAlerts(prev => prev.filter(a => a.id !== alert.id));
    logAction('Fleet', 'Alert Dismissed', `${alert.driver}: ${alert.issue}`, 'info');
    showToast('info', 'Alert Dismissed', `${alert.driver}'s alert removed.`);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6 animate-[fade-up_0.4s_ease-out]">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-display text-[var(--text-primary)]">Fleet Intelligence</h1>
          <p className="text-sm text-[var(--text-secondary)]">Real-time driver analytics and performance optimization</p>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DataCard title="Active Vehicles" value={activeVehiclesCount.toString()} change={`${state.vehicles.length} total`} changeType="neutral" colorVar="--kpi-fleet" subInfo={`${maintenanceCount} in maintenance`} />
        <DataCard title="In Maintenance" value={maintenanceCount.toString()} change="Scheduled" changeType="down" colorVar="--status-critical" subInfo="View schedule below" />
        <DataCard title="Avg Fuel Efficiency" value={`${avgFuelEff} km/L`} change="+0.4 km/L" changeType="up" colorVar="--status-success" subInfo="vs last month" />
        <DataCard title="Fleet Utilization" value={`${utilization}%`} change="+2%" changeType="up" colorVar="--status-info" subInfo="Active vs Total" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Roster Table */}
        <div className="lg:col-span-2 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] overflow-hidden flex flex-col">
          <div className="p-4 border-b border-[var(--border-subtle)] flex justify-between items-center bg-[var(--bg-elevated)]">
            <h3 className="font-semibold text-[var(--text-primary)]">Live Fleet Roster</h3>
            <div className="flex gap-2">
              <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="Search vehicle or driver..." className="bg-[var(--bg-input)] border border-[var(--border-default)] rounded-[var(--radius-sm)] py-1 px-2 text-sm focus:border-[var(--accent-primary)] outline-none" />
              <button className="text-xs flex items-center gap-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] bg-[var(--bg-input)] px-2 py-1 rounded-[var(--radius-sm)] border border-[var(--border-default)]"><Filter className="w-3 h-3"/> Filter</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[var(--bg-active)] text-[var(--text-secondary)] select-none">
                <tr>
                  <th className="px-4 py-3 font-medium cursor-pointer hover:text-[var(--text-primary)]" onClick={() => handleSort('id')}>Vehicle ID {sortKey === 'id' && (sortDir === 'asc' ? '↑' : '↓')}</th>
                  <th className="px-4 py-3 font-medium cursor-pointer hover:text-[var(--text-primary)]" onClick={() => handleSort('status')}>Status {sortKey === 'status' && (sortDir === 'asc' ? '↑' : '↓')}</th>
                  <th className="px-4 py-3 font-medium cursor-pointer hover:text-[var(--text-primary)]" onClick={() => handleSort('fuelEff')}>Efficiency {sortKey === 'fuelEff' && (sortDir === 'asc' ? '↑' : '↓')}</th>
                  <th className="px-4 py-3 font-medium cursor-pointer hover:text-[var(--text-primary)]" onClick={() => handleSort('speed')}>Speed {sortKey === 'speed' && (sortDir === 'asc' ? '↑' : '↓')}</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-primary)]">
                {filteredVehicles.map((v) => (
                  <tr key={v.id} className="hover:bg-[var(--bg-hover)] transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-mono text-[var(--text-primary)]">{v.id}</div>
                      <div className="text-xs text-[var(--text-secondary)]">{v.driver}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
                        ${v.status === 'active' ? 'bg-[var(--status-success-soft)] text-[var(--status-success)]' : 
                          v.status === 'idle' ? 'bg-[var(--status-warning-soft)] text-[var(--status-warning)]' : 
                          'bg-[var(--status-critical-soft)] text-[var(--status-critical)]'}`}>
                        {v.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[var(--accent-primary)] font-mono">{v.fuelEff} km/L</td>
                    <td className="px-4 py-3 text-[var(--text-secondary)] font-mono">{v.speed} km/h</td>
                    <td className="px-4 py-3 flex gap-2">
                      <button onClick={() => { setSelectedVehicle(v); setDriverModalOpen(true); }} className="text-xs bg-[var(--bg-elevated)] border border-[var(--border-strong)] px-2 py-1 rounded hover:border-[var(--accent-primary)]">Profile</button>
                      <button onClick={() => handleMaintenance(v)} className="text-xs bg-[var(--bg-elevated)] border border-[var(--border-strong)] px-2 py-1 rounded hover:border-[var(--status-warning)]">Service</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Fuel Efficiency Bar Chart */}
          <div className="p-4 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]">
            <h4 className="text-sm font-medium text-[var(--text-secondary)] mb-4">Fleet Fuel Efficiency Distribution</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={state.vehicles.map(v => ({ name: v.id, efficiency: v.fuelEff, driver: v.driver, status: v.status }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" />
                <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={11} />
                <YAxis stroke="var(--text-secondary)" fontSize={11} unit=" km/L" />
                <Tooltip contentStyle={{background:'var(--bg-elevated)', border:'1px solid var(--border-strong)'}} formatter={(val: number) => [val + ' km/L', 'Fuel Efficiency']} />
                <Bar dataKey="efficiency" radius={[4,4,0,0]}>
                  {state.vehicles.map((v) => (
                    <Cell key={v.id} fill={v.status === 'active' ? 'var(--accent-primary)' : v.status === 'maintenance' ? 'var(--status-critical)' : 'var(--status-warning)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
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
              {coachingAlerts.map(alert => (
                <div key={alert.id} className={`p-3 border rounded flex gap-3 items-start relative ${alert.severity === 'warning' ? 'bg-[var(--status-warning-soft)] border-[var(--status-warning)]' : alert.severity === 'error' ? 'bg-[var(--status-critical-soft)] border-[var(--status-critical)]' : 'bg-[var(--status-info-soft)] border-[var(--status-info)]'}`}>
                  <button onClick={() => dismissAlert(alert)} className="absolute top-2 right-2 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                    <X className="w-3 h-3" />
                  </button>
                  {alert.severity === 'warning' && <AlertTriangle className="w-4 h-4 text-[var(--status-warning)] shrink-0 mt-0.5" />}
                  {alert.severity === 'error' && <AlertTriangle className="w-4 h-4 text-[var(--status-critical)] shrink-0 mt-0.5" />}
                  {alert.severity === 'info' && <TrendingUp className="w-4 h-4 text-[var(--status-info)] shrink-0 mt-0.5" />}
                  <div className="pr-4">
                    <p className="text-xs text-[var(--text-primary)] font-medium mb-1">{alert.issue}</p>
                    <p className={`text-[10px] ${alert.severity === 'warning' ? 'text-[var(--status-warning)]' : alert.severity === 'error' ? 'text-[var(--status-critical)]' : 'text-[var(--status-info)]'}`}>
                      {alert.driver} ({alert.vehicle})
                    </p>
                  </div>
                </div>
              ))}
              {coachingAlerts.length === 0 && (
                <p className="text-sm text-[var(--text-secondary)] text-center py-4">No coaching alerts pending.</p>
              )}
            </div>
          </div>
          
          <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] p-5 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10"><Settings className="w-16 h-16"/></div>
             <h3 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-1">Predictive Maintenance</h3>
             <div className="text-3xl font-display text-[var(--text-primary)] mb-1">{maintenanceCount} Vehicles</div>
             <p className="text-sm text-[var(--text-secondary)] mb-4">Require service currently or soon.</p>
             <button onClick={() => setMaintModalOpen(true)} className="w-full py-2 bg-[var(--bg-input)] hover:bg-[var(--bg-hover)] border border-[var(--border-strong)] rounded text-sm font-medium transition-colors">View Schedule</button>
          </div>
        </div>
      </div>

      {/* Driver Modal */}
      <Modal isOpen={driverModalOpen} onClose={() => setDriverModalOpen(false)} title={`Driver: ${selectedVehicle?.driver}`}>
        {selectedVehicle && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
              <div><span style={{color:'var(--text-secondary)', fontSize: 13}}>Vehicle ID</span><div style={{fontWeight: 500}}>{selectedVehicle.id}</div></div>
              <div><span style={{color:'var(--text-secondary)', fontSize: 13}}>Type</span><div style={{fontWeight: 500}}>{selectedVehicle.type}</div></div>
              <div style={{gridColumn: '1 / -1'}}><span style={{color:'var(--text-secondary)', fontSize: 13}}>Location</span><div style={{fontWeight: 500}}>{selectedVehicle.location}</div></div>
              <div><span style={{color:'var(--text-secondary)', fontSize: 13}}>Mileage</span><div style={{fontWeight: 500}}>{selectedVehicle.mileage.toLocaleString()} km</div></div>
              <div><span style={{color:'var(--text-secondary)', fontSize: 13}}>Last Service</span><div style={{fontWeight: 500}}>{selectedVehicle.lastService}</div></div>
              <div><span style={{color:'var(--text-secondary)', fontSize: 13}}>Speed</span><div style={{fontWeight: 500}}>{selectedVehicle.speed} km/h</div></div>
              <div style={{gridColumn: '1 / -1'}}>
                <span style={{color:'var(--text-secondary)', fontSize: 13}}>Fuel Level ({selectedVehicle.fuelLevel}%)</span>
                <div style={{width: '100%', background: 'var(--bg-secondary)', height: 8, borderRadius: 4, marginTop: 4}}>
                  <div style={{width: `${selectedVehicle.fuelLevel}%`, background: selectedVehicle.fuelLevel > 20 ? 'var(--accent-primary)' : 'var(--status-critical)', height: '100%', borderRadius: 4}} />
                </div>
              </div>
            </div>
            
            <h4 style={{fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12}}>Weekly Efficiency Trend</h4>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={Array.from({length: 7}, (_, i) => {
                const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                return { day: days[i], eff: Number((selectedVehicle.fuelEff + (Math.random() - 0.5)).toFixed(1)) };
              })}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" vertical={false} />
                <XAxis dataKey="day" stroke="var(--text-secondary)" fontSize={11} />
                <YAxis domain={['dataMin - 1', 'dataMax + 1']} stroke="var(--text-secondary)" fontSize={11} width={30} />
                <Tooltip contentStyle={{background:'var(--bg-elevated)', border:'1px solid var(--border-strong)', fontSize: 12}} formatter={(val: number) => [val + ' km/L', 'Efficiency']} />
                <Bar dataKey="eff" fill="var(--accent-primary)" radius={[2,2,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </Modal>

      {/* Maintenance Modal */}
      <Modal isOpen={maintModalOpen} onClose={() => setMaintModalOpen(false)} title="Maintenance Schedule">
        {state.vehicles.filter(v => v.status === 'maintenance').length > 0 ? (
          <table className="w-full text-left text-sm mt-2">
            <thead className="bg-[var(--bg-active)] text-[var(--text-secondary)]">
              <tr>
                <th className="px-3 py-2 font-medium">Vehicle ID</th>
                <th className="px-3 py-2 font-medium">Driver</th>
                <th className="px-3 py-2 font-medium">Last Service</th>
                <th className="px-3 py-2 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-primary)]">
              {state.vehicles.filter(v => v.status === 'maintenance').map((v) => (
                <tr key={v.id}>
                  <td className="px-3 py-3 font-mono">{v.id}</td>
                  <td className="px-3 py-3">{v.driver}</td>
                  <td className="px-3 py-3 text-[var(--text-muted)]">{v.lastService}</td>
                  <td className="px-3 py-3">
                    <button onClick={() => {
                      dispatch({ type: 'UPDATE_VEHICLE', payload: { ...v, status: 'active', lastService: new Date().toISOString().split('T')[0] } });
                      logAction('Fleet', 'Maintenance Completed', `${v.id} returned to active duty`, 'success');
                      showToast('success', 'Maintenance Completed', `${v.id} is now active.`);
                    }} className="text-xs bg-[var(--status-success)] text-white px-2 py-1 rounded">Mark Done</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-sm text-[var(--text-secondary)] py-4 text-center">No vehicles currently scheduled for maintenance.</p>
        )}
      </Modal>
    </div>
  );
}
