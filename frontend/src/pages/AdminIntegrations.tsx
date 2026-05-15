import { useState } from "react";
import { Settings, Link as LinkIcon, Database, Key, Users } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { useToast } from "../components/ui/Toast";
import Spinner from "../components/ui/Spinner";

type Integration = { id: string; name: string; type: string; connected: boolean; loading: boolean; iconText: string; iconBg: string; iconColor: string; };

export default function AdminIntegrations() {
  const { logAction } = useAppContext();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('integrations');

  const [integrations, setIntegrations] = useState<Integration[]>([
    { id: 'sap', name: 'SAP S/4HANA', type: 'ERP', connected: true, loading: false, iconText: 'SAP', iconBg: '#ffffff', iconColor: '#000000' },
    { id: 'oracle', name: 'Oracle NetSuite', type: 'ERP', connected: false, loading: false, iconText: 'O', iconBg: '#ffffff', iconColor: '#005ea5' },
    { id: 'samsara', name: 'Samsara ELD Sync', type: 'Telematics', connected: true, loading: false, iconText: 'Samsara', iconBg: '#111111', iconColor: '#ffffff' },
    { id: 'geotab', name: 'Geotab Fleet', type: 'Telematics', connected: false, loading: false, iconText: 'Geo', iconBg: '#ffffff', iconColor: '#005596' },
  ]);

  const handleToggle = async (id: string) => {
    const integration = integrations.find(i => i.id === id);
    if (!integration) return;

    // Set loading
    setIntegrations(prev => prev.map(i => i.id === id ? { ...i, loading: true } : i));

    // Fake API delay
    await new Promise(r => setTimeout(r, 1500));

    // Update state
    const newStatus = !integration.connected;
    setIntegrations(prev => prev.map(i => i.id === id ? { ...i, connected: newStatus, loading: false } : i));

    if (newStatus) {
      logAction('Admin', 'Integration Connected', `Successfully connected to ${integration.name}`, 'success');
      showToast('success', 'Connected', `${integration.name} is now syncing.`);
    } else {
      logAction('Admin', 'Integration Disconnected', `Disconnected from ${integration.name}`, 'warning');
      showToast('warning', 'Disconnected', `${integration.name} sync has been stopped.`);
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6 animate-[fade-up_0.4s_ease-out]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-display text-[var(--text-primary)]">Admin & Integrations</h1>
          <p className="text-sm text-[var(--text-secondary)]">Configure system connections, webhooks, and permissions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-2">
           <button onClick={() => setActiveTab('integrations')} className={`w-full text-left px-4 py-2 rounded text-sm font-medium flex items-center gap-2 transition-colors ${activeTab === 'integrations' ? 'bg-[var(--bg-active)] border border-[var(--border-strong)] text-[var(--text-primary)] shadow-sm' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]'}`}>
             <LinkIcon className={`w-4 h-4 ${activeTab === 'integrations' ? 'text-[var(--accent-primary)]' : ''}`} /> Active Integrations
           </button>
           <button onClick={() => setActiveTab('keys')} className={`w-full text-left px-4 py-2 rounded text-sm font-medium flex items-center gap-2 transition-colors ${activeTab === 'keys' ? 'bg-[var(--bg-active)] border border-[var(--border-strong)] text-[var(--text-primary)] shadow-sm' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]'}`}>
             <Key className={`w-4 h-4 ${activeTab === 'keys' ? 'text-[var(--accent-primary)]' : ''}`} /> API Keys & Webhooks
           </button>
           <button onClick={() => setActiveTab('users')} className={`w-full text-left px-4 py-2 rounded text-sm font-medium flex items-center gap-2 transition-colors ${activeTab === 'users' ? 'bg-[var(--bg-active)] border border-[var(--border-strong)] text-[var(--text-primary)] shadow-sm' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]'}`}>
             <Users className={`w-4 h-4 ${activeTab === 'users' ? 'text-[var(--accent-primary)]' : ''}`} /> User Management
           </button>
           <button onClick={() => setActiveTab('data')} className={`w-full text-left px-4 py-2 rounded text-sm font-medium flex items-center gap-2 transition-colors ${activeTab === 'data' ? 'bg-[var(--bg-active)] border border-[var(--border-strong)] text-[var(--text-primary)] shadow-sm' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]'}`}>
             <Database className={`w-4 h-4 ${activeTab === 'data' ? 'text-[var(--accent-primary)]' : ''}`} /> Data Archiving
           </button>
        </div>

        <div className="md:col-span-3 space-y-6">
           {activeTab === 'integrations' && (
             <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] p-6">
                <h3 className="font-semibold text-[var(--text-primary)] mb-6 border-b border-[var(--border-subtle)] pb-4">Connected ERP Systems</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                   {integrations.filter(i => i.type === 'ERP').map(integration => (
                     <div key={integration.id} className={`border p-4 rounded-lg flex items-center justify-between transition-colors ${integration.connected ? 'border-[var(--border-success)] bg-[var(--status-success-soft)]/10' : 'border-[var(--border-strong)] bg-[var(--bg-surface)]'}`}>
                        <div className="flex items-center gap-4">
                           <div style={{ backgroundColor: integration.iconBg, color: integration.iconColor }} className="p-2 font-bold text-xl rounded shadow-sm border border-[#00000020] min-w-[48px] text-center">{integration.iconText}</div>
                           <div>
                             <h4 className="text-sm font-medium text-[var(--text-primary)]">{integration.name}</h4>
                             {integration.connected ? (
                               <p className="text-xs text-[var(--status-success)] flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[var(--status-success)]" /> Sync Active</p>
                             ) : (
                               <p className="text-xs text-[var(--text-muted)] flex items-center gap-1">Not Connected</p>
                             )}
                           </div>
                        </div>
                        <button 
                          onClick={() => handleToggle(integration.id)} 
                          disabled={integration.loading}
                          className={`text-xs border px-3 py-1.5 rounded font-medium flex justify-center items-center min-w-[80px] transition-colors disabled:opacity-70 ${integration.connected ? 'border-[var(--status-warning)] text-[var(--status-warning)] hover:bg-[var(--status-warning-soft)]' : 'bg-[var(--bg-active)] border-[var(--border-strong)] text-[var(--text-primary)] hover:border-[var(--accent-primary)]'}`}
                        >
                          {integration.loading ? <Spinner size="sm" /> : (integration.connected ? 'Disconnect' : 'Connect')}
                        </button>
                     </div>
                   ))}
                </div>

                <h3 className="font-semibold text-[var(--text-primary)] mt-8 mb-6 border-b border-[var(--border-subtle)] pb-4">Telematics & GPS</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                   {integrations.filter(i => i.type === 'Telematics').map(integration => (
                     <div key={integration.id} className={`border p-4 rounded-lg flex items-center justify-between transition-colors ${integration.connected ? 'border-[var(--border-success)] bg-[var(--status-success-soft)]/10' : 'border-[var(--border-strong)] bg-[var(--bg-surface)]'}`}>
                        <div className="flex items-center gap-4">
                           <div style={{ backgroundColor: integration.iconBg, color: integration.iconColor }} className="p-2 font-bold rounded shadow-sm border border-[#ffffff20] min-w-[48px] text-center">{integration.iconText}</div>
                           <div>
                             <h4 className="text-sm font-medium text-[var(--text-primary)]">{integration.name}</h4>
                             {integration.connected ? (
                               <p className="text-xs text-[var(--status-success)] flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[var(--status-success)]" /> Sync Active</p>
                             ) : (
                               <p className="text-xs text-[var(--text-muted)] flex items-center gap-1">Not Connected</p>
                             )}
                           </div>
                        </div>
                        <button 
                          onClick={() => handleToggle(integration.id)} 
                          disabled={integration.loading}
                          className={`text-xs border px-3 py-1.5 rounded font-medium flex justify-center items-center min-w-[80px] transition-colors disabled:opacity-70 ${integration.connected ? 'border-[var(--status-warning)] text-[var(--status-warning)] hover:bg-[var(--status-warning-soft)]' : 'bg-[var(--bg-active)] border-[var(--border-strong)] text-[var(--text-primary)] hover:border-[var(--accent-primary)]'}`}
                        >
                          {integration.loading ? <Spinner size="sm" /> : (integration.connected ? 'Disconnect' : 'Connect')}
                        </button>
                     </div>
                   ))}
                </div>
             </div>
           )}

           {activeTab !== 'integrations' && (
             <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] p-12 text-center">
                <Settings className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4 opacity-50" />
                <h3 className="font-semibold text-lg text-[var(--text-primary)] mb-2 capitalize">{activeTab} Configuration</h3>
                <p className="text-sm text-[var(--text-secondary)]">This module is currently locked by central administration. Contact IT ops to request access.</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
