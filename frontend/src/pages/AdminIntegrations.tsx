import { Settings, Link as LinkIcon, Database, Key, Users } from "lucide-react";

export default function AdminIntegrations() {
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
           <button className="w-full text-left px-4 py-2 bg-[var(--bg-active)] border border-[var(--border-strong)] text-[var(--text-primary)] rounded text-sm font-medium flex items-center gap-2 shadow-sm">
             <LinkIcon className="w-4 h-4 text-[var(--accent-primary)]" /> Active Integrations
           </button>
           <button className="w-full text-left px-4 py-2 text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] rounded text-sm font-medium flex items-center gap-2">
             <Key className="w-4 h-4" /> API Keys & Webhooks
           </button>
           <button className="w-full text-left px-4 py-2 text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] rounded text-sm font-medium flex items-center gap-2">
             <Users className="w-4 h-4" /> User Management
           </button>
           <button className="w-full text-left px-4 py-2 text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] rounded text-sm font-medium flex items-center gap-2">
             <Database className="w-4 h-4" /> Data Archiving
           </button>
        </div>

        <div className="md:col-span-3 space-y-6">
           <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] p-6">
              <h3 className="font-semibold text-[var(--text-primary)] mb-6 border-b border-[var(--border-subtle)] pb-4">Connected ERP Systems</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                 <div className="border border-[var(--border-success)] bg-[var(--status-success-soft)]/20 p-4 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="bg-white p-2 text-black font-bold text-xl rounded">SAP</div>
                       <div>
                         <h4 className="text-sm font-medium text-[var(--text-primary)]">SAP S/4HANA</h4>
                         <p className="text-xs text-[var(--status-success)] flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[var(--status-success)]" /> Sync Active</p>
                       </div>
                    </div>
                    <button className="text-xs border border-[var(--border-strong)] px-3 py-1 rounded text-[var(--text-primary)] hover:bg-[var(--bg-hover)]">Manage</button>
                 </div>
                 <div className="border border-[var(--border-strong)] p-4 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="bg-white p-2 text-[#005ea5] font-bold text-xl rounded px-3">O</div>
                       <div>
                         <h4 className="text-sm font-medium text-[var(--text-primary)]">Oracle NetSuite</h4>
                         <p className="text-xs text-[var(--text-muted)] flex items-center gap-1">Not Connected</p>
                       </div>
                    </div>
                    <button className="text-xs bg-[var(--bg-active)] border border-[var(--border-strong)] px-3 py-1 rounded text-[var(--text-primary)] hover:bg-[var(--bg-hover)]">Connect</button>
                 </div>
              </div>

              <h3 className="font-semibold text-[var(--text-primary)] mt-8 mb-6 border-b border-[var(--border-subtle)] pb-4">Telematics & GPS</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                 <div className="border border-[var(--border-success)] bg-[var(--status-success-soft)]/20 p-4 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="bg-[#111111] border border-[var(--border-strong)] text-white p-2 font-bold rounded">Samsara</div>
                       <div>
                         <h4 className="text-sm font-medium text-[var(--text-primary)]">Samsara ELD Sync</h4>
                         <p className="text-xs text-[var(--status-success)] flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[var(--status-success)]" /> Sync Active</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
