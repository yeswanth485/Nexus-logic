import { useState } from "react";
import { Landmark, ShieldAlert, Radio, Navigation, CheckCircle2, TrendingUp, AlertTriangle, FileText } from "lucide-react";
import { DataCard } from "../components/ui/DataCard";
import { useAppContext } from "../context/AppContext";
import { useToast } from "../components/ui/Toast";
import Modal from "../components/ui/Modal";
import Spinner from "../components/ui/Spinner";

export default function GovernmentCenter() {
  const { logAction } = useAppContext();
  const { showToast } = useToast();

  const [gstinResolved, setGstinResolved] = useState(false);
  const [resolvingGstin, setResolvingGstin] = useState(false);
  
  const [disasterActive, setDisasterActive] = useState(false);
  const [activatingDisaster, setActivatingDisaster] = useState(false);

  const [gstinModalOpen, setGstinModalOpen] = useState(false);

  const handleResolveGstin = async () => {
    setResolvingGstin(true);
    await new Promise(r => setTimeout(r, 1500));
    setGstinResolved(true);
    setResolvingGstin(false);
    setGstinModalOpen(false);
    logAction('Government', 'GSTIN Reconciliation', 'Resolved mismatch in 2 invoices', 'success');
    showToast('success', 'Resolved', 'GSTIN mismatch resolved and synced with NIC portal.');
  };

  const handleActivateDisaster = async () => {
    if (disasterActive) {
      setActivatingDisaster(true);
      await new Promise(r => setTimeout(r, 1000));
      setDisasterActive(false);
      setActivatingDisaster(false);
      logAction('Government', 'Disaster Relief Deactivated', 'Green corridors disabled', 'info');
      showToast('info', 'Deactivated', 'Disaster Relief Corridor deactivated.');
      return;
    }

    setActivatingDisaster(true);
    await new Promise(r => setTimeout(r, 2000));
    setDisasterActive(true);
    setActivatingDisaster(false);
    logAction('Government', 'Disaster Relief Activated', 'Priority green corridors enabled for medical supplies', 'warning');
    showToast('warning', 'Corridor Activated', 'Disaster Relief Protocol is now ACTIVE.');
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6 animate-[fade-up_0.4s_ease-out]">
      <div className={`bg-[image:var(--gradient-card)] border-b ${disasterActive ? 'border-[var(--status-critical)] shadow-[var(--shadow-glow-critical)]' : 'border-[var(--border-strong)]'} -mx-6 -mt-6 p-6 md:p-8 flex items-center justify-between shadow-inner relative overflow-hidden transition-all duration-500`}>
        <div className="relative z-10 w-full sm:w-auto">
          <div className="flex gap-2 items-center mb-2">
            <span className="px-2 py-0.5 bg-[var(--status-critical-soft)] border border-[var(--status-critical)] rounded text-[9px] font-mono font-bold text-[var(--status-critical)] uppercase tracking-widest">RESTRICTED</span>
            <span className={`text-[10px] font-mono font-bold tracking-widest ${disasterActive ? 'text-[var(--status-critical)] animate-pulse' : 'text-[var(--text-muted)]'}`}>
              STATUS: {disasterActive ? 'EMERGENCY PROTOCOL ACTIVE' : 'NORMAL'}
            </span>
          </div>
          <h1 className="text-3xl font-display text-white tracking-tight">Smart Logistics Command</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1 tracking-wide">Public Infrastructure & Emergency Operations</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DataCard title="Emergency Corridors" value={disasterActive ? "ALL ACTIVE" : "4 Active"} change={disasterActive ? "Priority Routing" : "1 under maintenance"} changeType={disasterActive ? "up" : "down"} colorVar={disasterActive ? "--status-critical" : "--status-success"} subInfo={disasterActive ? "Disaster protocol engaged" : "Green Channel Enabled"} />
        <DataCard title="Border Clearances" value="142 Pending" change="Avg 45m delay" changeType="neutral" colorVar="--status-warning" subInfo="Customs & Excise" />
        <DataCard title="Regulatory Compliance" value={gstinResolved ? "100%" : "99.8%"} change={gstinResolved ? "Fully Compliant" : "All licenses valid"} changeType="up" colorVar="--status-info" subInfo="Next audit: 12 days" />
        <DataCard title="Infrastructure Events" value="3 Alerts" change="Highway 44 blocked" changeType="down" colorVar="--status-critical" subInfo="Live traffic integration" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-5 shadow-[var(--shadow-card)]">
          <h3 className="font-semibold text-[var(--text-primary)] mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[var(--status-info)]" />
            Compliance & Documentation
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-[var(--bg-hover)] border border-[var(--border-default)] rounded">
               <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[var(--status-success)]" />
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">E-Way Bill Generation</p>
                    <p className="text-[10px] text-[var(--text-muted)]">Live sync with NIC portal</p>
                  </div>
               </div>
               <span className="text-xs text-[var(--status-success)] font-mono">100% SUCCESS</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[var(--bg-hover)] border border-[var(--border-default)] rounded">
               <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[var(--status-success)]" />
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">Vahan & Sarathi API Sync</p>
                    <p className="text-[10px] text-[var(--text-muted)]">Driver & Vehicle verification</p>
                  </div>
               </div>
               <span className="text-xs text-[var(--status-success)] font-mono">ACTIVE</span>
            </div>
            
            {gstinResolved ? (
              <div className="flex items-center justify-between p-3 bg-[var(--bg-hover)] border border-[var(--border-default)] rounded transition-all">
                <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[var(--status-success)]" />
                    <div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">GSTIN Reconciliation</p>
                      <p className="text-[10px] text-[var(--text-muted)]">All invoices synced</p>
                    </div>
                </div>
                <span className="text-xs text-[var(--status-success)] font-mono">RESOLVED</span>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 bg-[var(--status-warning-soft)] border border-[var(--status-warning)] rounded transition-all">
                 <div className="flex items-center gap-3">
                    <AlertTriangle className="w-4 h-4 text-[var(--status-warning)]" />
                    <div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">GSTIN Reconciliation</p>
                      <p className="text-[10px] text-[var(--status-warning)]">Mismatch in 2 invoices</p>
                    </div>
                 </div>
                 <button onClick={() => setGstinModalOpen(true)} className="text-xs font-bold bg-[var(--bg-surface)] text-[var(--status-warning)] px-3 py-1.5 rounded hover:bg-[var(--status-warning)] hover:text-white transition-colors">RESOLVE</button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-5 shadow-[var(--shadow-card)] relative overflow-hidden flex flex-col">
          <div className={`absolute -right-4 -bottom-4 ${disasterActive ? 'text-[var(--status-critical)] opacity-20 animate-pulse' : 'text-[var(--text-muted)] opacity-5'}`}>
            <ShieldAlert className="w-48 h-48" />
          </div>
          <h3 className="font-semibold text-[var(--text-primary)] mb-6 flex items-center gap-2 relative z-10">
            <Radio className={`w-5 h-5 ${disasterActive ? 'text-[var(--status-critical)] animate-pulse' : 'text-[var(--text-secondary)]'}`} />
            Emergency Protocol Center
          </h3>
          <div className="space-y-4 relative z-10 flex-1 flex flex-col justify-between">
            <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
              Direct link to state emergency response and disaster management systems for priority supply chains. 
              {disasterActive && <span className="block mt-2 font-bold text-[var(--status-critical)]">EMERGENCY PROTOCOL IS CURRENTLY ACTIVE. ALL NON-ESSENTIAL SHIPMENTS MAY BE DELAYED.</span>}
            </p>
            
            <div className={`p-3 border flex items-start gap-3 rounded ${disasterActive ? 'bg-[var(--status-critical-soft)] border-[var(--status-critical)]' : 'bg-[var(--bg-elevated)] border-[var(--border-strong)]'}`}>
               <TrendingUp className={`w-4 h-4 shrink-0 mt-0.5 ${disasterActive ? 'text-[var(--status-critical)]' : 'text-[var(--accent-primary)]'}`} />
               <p className="text-xs text-[var(--text-primary)] leading-relaxed">
                 <span className="font-medium">Medical Supply Priority:</span> Pre-approved green channels for oxygen and critical pharma enabled.
               </p>
            </div>

            <button 
              onClick={handleActivateDisaster}
              disabled={activatingDisaster}
              className={`w-full py-3 mt-4 border transition-colors rounded-[var(--radius-md)] flex items-center justify-center gap-2 font-bold uppercase tracking-wider text-sm
                ${disasterActive 
                  ? 'bg-[var(--bg-surface)] border-[var(--text-muted)] text-[var(--text-primary)] hover:bg-[var(--bg-hover)]' 
                  : 'bg-[var(--bg-input)] border-[var(--status-critical)] text-[var(--status-critical)] hover:bg-[var(--status-critical)] hover:text-white'
                } disabled:opacity-70`}
            >
               {activatingDisaster ? <Spinner size="sm" /> : (
                 <>
                   <Navigation className="w-4 h-4" /> 
                   {disasterActive ? 'Deactivate Corridor' : 'Activate Disaster Relief Corridor'}
                 </>
               )}
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={gstinModalOpen} onClose={() => setGstinModalOpen(false)} title="Resolve GSTIN Mismatch">
        <p className="text-sm text-[var(--text-primary)] mb-4">Mismatch found in recent invoices regarding IGST components for Supplier #247.</p>
        <div className="p-4 bg-[var(--bg-hover)] border border-[var(--border-strong)] rounded mb-6">
          <div className="flex justify-between items-center text-sm text-[var(--text-secondary)] mb-2">
            <span>Invoice INV-0992:</span>
            <span className="font-mono text-[var(--status-critical)]">IGST ₹2,450 (System: ₹2,400)</span>
          </div>
          <div className="flex justify-between items-center text-sm text-[var(--text-secondary)]">
            <span>Invoice INV-0993:</span>
            <span className="font-mono text-[var(--status-critical)]">IGST ₹1,800 (System: ₹1,750)</span>
          </div>
        </div>
        <p className="text-xs text-[var(--text-secondary)] mb-6">Clicking 'Auto-Resolve' will align system values with the NIC portal's logged GSTIN records and trigger an update.</p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setGstinModalOpen(false)} disabled={resolvingGstin} style={{ padding: '8px 16px', background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-default)', borderRadius: 6, cursor: 'pointer' }}>Cancel</button>
          <button onClick={handleResolveGstin} disabled={resolvingGstin} className="flex justify-center items-center gap-2" style={{ minWidth: 140, padding: '8px 16px', background: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
            {resolvingGstin ? <Spinner size="sm" /> : 'Auto-Resolve Sync'}
          </button>
        </div>
      </Modal>
    </div>
  );
}
