import { useState } from "react";
import { ShieldAlert, AlertCircle, Target, Globe, AlertTriangle } from "lucide-react";
import { DataCard } from "../components/ui/DataCard";
import { useAppContext, RiskAlert } from "../context/AppContext";
import { useToast } from "../components/ui/Toast";
import Modal from "../components/ui/Modal";
import Spinner from "../components/ui/Spinner";

type Anomaly = { id: string; title: string; description: string; recommendation: string; };

export default function RiskCenter() {
  const { state, dispatch, logAction } = useAppContext();
  const { showToast } = useToast();

  const [activatingId, setActivatingId] = useState<string | null>(null);
  const [affectedOpen, setAffectedOpen] = useState(false);
  const [reportRiskOpen, setReportRiskOpen] = useState(false);
  const [investigateAlert, setInvestigateAlert] = useState<Anomaly | null>(null);
  
  const [newRisk, setNewRisk] = useState({ type: 'Supplier', severity: 'medium', title: '', description: '' });

  const [anomalies] = useState<Anomaly[]>([
    { id: 'AN-01', title: 'Unusual route deviation — VH-003', description: 'Vehicle VH-003 deviated 47km from planned route at 14:32 IST.', recommendation: 'Contact driver immediately. Check for road closures on NH-44. Consider rerouting through NH-48 as alternative.' },
    { id: 'AN-02', title: 'Fuel consumption spike — VH-006', description: 'Fuel consumption 35% above average in last 200km.', recommendation: 'Schedule immediate vehicle inspection. Check for fuel system leaks or engine issues.' },
  ]);

  const subScores = {
    supplier: state.riskAlerts.find(r => r.type === 'Supplier' && !r.mitigated) ? 68 : 30,
    weather: state.riskAlerts.find(r => r.type === 'Weather' && !r.mitigated) ? 55 : 20,
    geopolitical: state.riskAlerts.find(r => r.type === 'Geopolitical' && !r.mitigated) ? 40 : 15,
    operational: state.riskAlerts.find(r => r.type === 'Operational' && !r.mitigated) ? 35 : 10,
  };
  const overallScore = Math.round(subScores.supplier * 0.4 + subScores.weather * 0.25 + subScores.geopolitical * 0.2 + subScores.operational * 0.15);

  const handleActivateBackup = async (alert: RiskAlert) => {
    setActivatingId(alert.id);
    await new Promise(r => setTimeout(r, 2000));
    dispatch({ type: 'MITIGATE_RISK', payload: alert.id });
    setActivatingId(null);
    logAction('Risk', 'Backup Supplier Activated', 'Supplier #247 backup engaged', 'success');
    showToast('success', 'Backup Activated', 'Alternative supplier activated for Supplier #247.');
  };

  const handleAcknowledge = (alert: RiskAlert) => {
    dispatch({ type: 'ACKNOWLEDGE_RISK', payload: alert.id });
    logAction('Risk', 'Alert Acknowledged', alert.title, 'info');
    showToast('info', 'Alert Acknowledged', `${alert.title} acknowledged.`);
  };

  const handleReportRisk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRisk.title || !newRisk.description) {
      showToast('error', 'Required Fields', 'Please fill all fields.');
      return;
    }
    const id = 'RA-' + Date.now();
    dispatch({ 
      type: 'ADD_RISK_ALERT', 
      payload: { 
        id, 
        type: newRisk.type as any, 
        severity: newRisk.severity as any, 
        title: newRisk.title, 
        description: newRisk.description, 
        timestamp: new Date().toISOString(), 
        acknowledged: false, 
        mitigated: false 
      }
    });
    const logSeverity = newRisk.severity === 'critical' || newRisk.severity === 'high' ? 'error' : 'warning';
    logAction('Risk', 'New Risk Reported', newRisk.title, logSeverity);
    showToast('warning', 'Risk Reported', `${newRisk.title} added to risk dashboard.`);
    setReportRiskOpen(false);
    setNewRisk({ type: 'Supplier', severity: 'medium', title: '', description: '' });
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6 animate-[fade-up_0.4s_ease-out]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-display text-[var(--text-primary)]">Supply Chain Risk Center</h1>
          <p className="text-sm text-[var(--text-secondary)]">Early warning system for anomalous behaviors and disruptions</p>
        </div>
        <button onClick={() => setReportRiskOpen(true)} className="bg-[var(--accent-primary)] text-white px-4 py-2 rounded font-medium text-sm hover:opacity-90">Report Risk</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Hero Score */}
        <div className="md:col-span-1 bg-[var(--status-warning-soft)] border border-[var(--status-warning)] rounded-[var(--radius-lg)] p-5 flex flex-col justify-center items-center shadow-[var(--shadow-glow-accent)] relative overflow-hidden">
           <ShieldAlert className="absolute -right-4 -bottom-4 w-32 h-32 text-[var(--status-warning)] opacity-10" />
           <div className="text-sm uppercase tracking-widest text-[var(--status-warning)] font-bold mb-2">Overall Risk</div>
           <div className="text-6xl font-display font-bold text-[var(--text-primary)] drop-shadow-lg">{overallScore}<span className="text-2xl text-[var(--text-secondary)]">/100</span></div>
           <div className="text-xs text-[var(--status-warning)] mt-2 font-medium">DYNAMIC RISK LEVEL</div>
           <div className="text-[10px] text-[var(--text-secondary)] mt-1">Based on {state.riskAlerts.filter(r => !r.mitigated).length} active alerts</div>
        </div>

        {/* Sub Scores */}
        <div className="md:col-span-3 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DataCard title="Supplier Risk" value={subScores.supplier.toString()} change={subScores.supplier > 50 ? "High" : "Low"} changeType={subScores.supplier > 50 ? "down" : "up"} colorVar={subScores.supplier > 50 ? "--status-critical" : "--status-success"} subInfo="Based on supplier alerts" />
          <DataCard title="Geopolitical" value={subScores.geopolitical.toString()} change={subScores.geopolitical > 50 ? "High" : "Low"} changeType={subScores.geopolitical > 50 ? "down" : "up"} colorVar={subScores.geopolitical > 50 ? "--status-critical" : "--status-success"} subInfo="Border/Customs issues" />
          <DataCard title="Weather" value={subScores.weather.toString()} change={subScores.weather > 50 ? "High" : "Low"} changeType={subScores.weather > 50 ? "down" : "up"} colorVar={subScores.weather > 50 ? "--status-critical" : "--status-success"} subInfo="Active natural events" />
          <DataCard title="Operational" value={subScores.operational.toString()} change={subScores.operational > 50 ? "High" : "Low"} changeType={subScores.operational > 50 ? "down" : "up"} colorVar={subScores.operational > 50 ? "--status-critical" : "--status-success"} subInfo="Fleet & route performance" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Alerts */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-5 shadow-[var(--shadow-card)] flex flex-col gap-4">
           <h3 className="font-semibold text-[var(--text-primary)] flex items-center gap-2">
             <AlertCircle className="w-5 h-5 text-[var(--status-critical)]" />
             Active Risk Alerts
             <span className="bg-[var(--status-critical-soft)] text-[var(--status-critical)] text-[10px] px-2 py-0.5 rounded-full ml-auto">
               {state.riskAlerts.filter(r => r.severity === 'critical' && !r.mitigated).length} Critical
             </span>
           </h3>

           {state.riskAlerts.sort((a,b) => {
             if (a.mitigated !== b.mitigated) return a.mitigated ? 1 : -1;
             const scores = {critical:4, high:3, medium:2, low:1};
             return scores[b.severity] - scores[a.severity];
           }).map((alert) => (
             <div key={alert.id} className={`p-4 border-l-4 ${alert.severity === 'critical' ? 'border-[var(--status-critical)]' : alert.severity === 'high' ? 'border-[var(--status-warning)]' : 'border-[var(--status-info)]'} bg-[var(--bg-hover)] rounded-r-[var(--radius-md)] relative transition-all ${alert.acknowledged ? 'opacity-60' : ''}`}>
               <div className="flex justify-between items-start mb-2">
                 <span className={`text-[10px] uppercase font-bold tracking-wider ${alert.severity === 'critical' ? 'text-[var(--status-critical)]' : alert.severity === 'high' ? 'text-[var(--status-warning)]' : 'text-[var(--status-info)]'}`}>Type: {alert.type}</span>
                 <span className="text-[10px] text-[var(--text-muted)]">{new Date(alert.timestamp).toLocaleDateString()}</span>
               </div>
               <h4 className="text-sm font-medium text-[var(--text-primary)] mb-2">{alert.title}</h4>
               <p className="text-xs text-[var(--text-secondary)] mb-3 leading-relaxed">{alert.description}</p>
               
               {/* Contextual actions based on alert type/mock data */}
               {alert.type === 'Supplier' && alert.severity === 'critical' && !alert.mitigated && (
                 <>
                   <div className="p-2 bg-[image:var(--gradient-card)] border border-[var(--border-strong)] rounded text-xs mb-3 text-[var(--accent-primary)] font-medium">
                     🤖 AI: Activate backup supplier (Tata Electronics) — 14-day onboarding
                   </div>
                   <div className="flex gap-2">
                     <button onClick={() => handleActivateBackup(alert)} disabled={activatingId === alert.id} className="flex items-center justify-center gap-2 bg-[var(--status-critical)] text-white px-3 py-1.5 rounded text-xs font-semibold hover:brightness-110 disabled:opacity-70 min-w-[120px]">
                       {activatingId === alert.id ? <Spinner size="sm" /> : 'Activate Backup'}
                     </button>
                     {!alert.acknowledged && (
                       <button onClick={() => handleAcknowledge(alert)} className="bg-[var(--bg-input)] text-[var(--text-secondary)] px-3 py-1.5 rounded text-xs font-medium hover:text-[var(--text-primary)]">Acknowledge</button>
                     )}
                   </div>
                 </>
               )}
               {alert.mitigated && alert.type === 'Supplier' && (
                 <div className="inline-block border border-[var(--status-success)] text-[var(--status-success)] px-3 py-1.5 rounded text-xs font-semibold">
                   ✓ Backup Active
                 </div>
               )}

               {alert.type === 'Weather' && (
                 <div className="flex gap-2">
                   <button onClick={() => setAffectedOpen(true)} className="bg-[var(--bg-input)] border border-[var(--border-strong)] text-[var(--text-primary)] px-3 py-1.5 rounded text-xs font-medium hover:bg-[var(--bg-elevated)]">View Affected Routes</button>
                   {!alert.acknowledged && (
                     <button onClick={() => handleAcknowledge(alert)} className="bg-[var(--bg-input)] text-[var(--text-secondary)] px-3 py-1.5 rounded text-xs font-medium hover:text-[var(--text-primary)]">Acknowledge</button>
                   )}
                 </div>
               )}

               {alert.type !== 'Supplier' && alert.type !== 'Weather' && (
                 <div className="flex gap-2">
                   {!alert.acknowledged ? (
                     <button onClick={() => handleAcknowledge(alert)} className="bg-[var(--bg-input)] border border-[var(--border-strong)] text-[var(--text-primary)] px-3 py-1.5 rounded text-xs font-medium hover:bg-[var(--bg-elevated)]">Acknowledge</button>
                   ) : (
                     <button disabled className="bg-transparent border border-[var(--border-default)] text-[var(--text-muted)] px-3 py-1.5 rounded text-xs font-medium cursor-not-allowed">✓ Acknowledged</button>
                   )}
                 </div>
               )}
             </div>
           ))}
        </div>

        <div className="space-y-6 flex flex-col">
          {/* Anomaly Feed */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-5 shadow-[var(--shadow-card)] flex-1">
             <h3 className="font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2 text-sm">
               <Target className="w-4 h-4 text-[var(--accent-primary)]" />
               AI Anomaly Detection
             </h3>
             <ul className="space-y-4">
               {anomalies.map((anom, idx) => (
                 <li key={anom.id} className={`flex gap-3 items-start ${idx < anomalies.length - 1 ? 'border-b border-[var(--border-subtle)] pb-4' : ''}`}>
                    <div className="mt-1 w-2 h-2 rounded-full bg-[var(--status-info)] shrink-0" />
                    <div>
                      <p className="text-xs text-[var(--text-primary)] leading-relaxed font-semibold mb-1">{anom.title}</p>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-2">{anom.description}</p>
                      <button onClick={() => setInvestigateAlert(anom)} className="text-[10px] text-[var(--text-muted)] hover:text-[var(--text-primary)] uppercase tracking-wider font-bold">Investigate &rarr;</button>
                    </div>
                 </li>
               ))}
             </ul>
          </div>
        </div>
      </div>

      {/* Affected Routes Modal */}
      <Modal isOpen={affectedOpen} onClose={() => setAffectedOpen(false)} title="Affected Shipments — Cyclone Warning">
        <table className="w-full text-left text-sm mt-2">
          <thead className="bg-[var(--bg-active)] text-[var(--text-secondary)]">
            <tr>
              <th className="px-3 py-2 font-medium">Shipment ID</th>
              <th className="px-3 py-2 font-medium">Route</th>
              <th className="px-3 py-2 font-medium">Status</th>
              <th className="px-3 py-2 font-medium">ETA</th>
              <th className="px-3 py-2 font-medium">Driver</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-primary)]">
            {state.shipments.filter(s => ['Chennai','Hyderabad','Mumbai'].some(city => s.origin.includes(city) || s.destination.includes(city))).map(s => (
              <tr key={s.id}>
                <td className="px-3 py-3 font-mono">{s.id}</td>
                <td className="px-3 py-3">{s.origin} &rarr; {s.destination}</td>
                <td className="px-3 py-3 capitalize">{s.status}</td>
                <td className="px-3 py-3">{s.eta || 'N/A'}</td>
                <td className="px-3 py-3">{s.driver}</td>
              </tr>
            ))}
            {state.shipments.filter(s => ['Chennai','Hyderabad','Mumbai'].some(city => s.origin.includes(city) || s.destination.includes(city))).length === 0 && (
              <tr><td colSpan={5} className="px-3 py-4 text-center text-[var(--text-secondary)]">No shipments currently passing through affected zones.</td></tr>
            )}
          </tbody>
        </table>
      </Modal>

      {/* Investigate Modal */}
      <Modal isOpen={!!investigateAlert} onClose={() => setInvestigateAlert(null)} title={`Investigation: ${investigateAlert?.title}`}>
        {investigateAlert && (
          <div>
            <p className="text-sm text-[var(--text-primary)] mb-4">{investigateAlert.description}</p>
            <div className="p-4 bg-[var(--bg-hover)] border border-[var(--border-strong)] rounded mb-6">
              <h4 className="text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider mb-2">Recommended Action:</h4>
              <p className="text-sm text-[var(--text-primary)]">{investigateAlert.recommendation}</p>
            </div>
            <div className="flex gap-3 justify-end">
              <button onClick={() => { showToast('info', 'Dismissed', 'Anomaly dismissed.'); setInvestigateAlert(null); }} style={{ padding: '8px 16px', background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-default)', borderRadius: 6, cursor: 'pointer' }}>Dismiss</button>
              <button onClick={() => { showToast('warning', 'Escalated', 'Issue escalated to senior management.'); setInvestigateAlert(null); }} style={{ padding: '8px 16px', background: 'var(--status-warning)', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>Escalate</button>
            </div>
          </div>
        )}
      </Modal>

      {/* Report Risk Modal */}
      <Modal isOpen={reportRiskOpen} onClose={() => setReportRiskOpen(false)} title="Report New Risk">
        <form onSubmit={handleReportRisk}>
          <label style={{ display: 'block', marginBottom: 4, fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Type</label>
          <select value={newRisk.type} onChange={e => setNewRisk({...newRisk, type: e.target.value})} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', borderRadius: 6, color: 'var(--text-primary)', fontSize: 14, marginBottom: 12 }}>
            <option>Supplier</option>
            <option>Weather</option>
            <option>Operational</option>
            <option>Geopolitical</option>
          </select>
          
          <label style={{ display: 'block', marginBottom: 4, fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Severity</label>
          <select value={newRisk.severity} onChange={e => setNewRisk({...newRisk, severity: e.target.value})} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', borderRadius: 6, color: 'var(--text-primary)', fontSize: 14, marginBottom: 12 }}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
          
          <label style={{ display: 'block', marginBottom: 4, fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Title</label>
          <input value={newRisk.title} onChange={e => setNewRisk({...newRisk, title: e.target.value})} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', borderRadius: 6, color: 'var(--text-primary)', fontSize: 14, marginBottom: 12 }} />
          
          <label style={{ display: 'block', marginBottom: 4, fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Description</label>
          <textarea value={newRisk.description} onChange={e => setNewRisk({...newRisk, description: e.target.value})} rows={3} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', borderRadius: 6, color: 'var(--text-primary)', fontSize: 14, marginBottom: 12, resize: 'vertical' }} />
          
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <button type="button" onClick={() => setReportRiskOpen(false)} style={{ flex: 1, padding: '10px 20px', background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-default)', borderRadius: 6, cursor: 'pointer' }}>Cancel</button>
            <button type="submit" style={{ flex: 1, padding: '10px 20px', background: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>Report Risk</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
