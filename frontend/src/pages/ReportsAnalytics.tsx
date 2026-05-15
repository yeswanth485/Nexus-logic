import { useState } from "react";
import { FileText, Download, BarChart2, Calendar, FileSpreadsheet } from "lucide-react";
import { DataCard } from "../components/ui/DataCard";
import { useAppContext } from "../context/AppContext";
import { useToast } from "../components/ui/Toast";
import Modal from "../components/ui/Modal";
import Spinner from "../components/ui/Spinner";

export default function ReportsAnalytics() {
  const { logAction } = useAppContext();
  const { showToast } = useToast();

  const [reportOpen, setReportOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  
  const [formData, setFormData] = useState({
    type: 'Fleet Performance',
    format: 'PDF',
    dateRange: 'Last 30 Days'
  });

  const [exports, setExports] = useState([
    { id: '1', name: 'May_Fleet_Report.pdf', time: '2h ago', icon: 'pdf', color: 'var(--status-critical)' },
    { id: '2', name: 'Q1_Emissions.csv', time: 'Yesterday', icon: 'csv', color: 'var(--status-success)' },
  ]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);
    await new Promise(r => setTimeout(r, 2000));
    
    const newReport = {
      id: Date.now().toString(),
      name: `${formData.type.replace(/\s+/g, '_')}_${new Date().toLocaleDateString('en-IN').replace(/\//g,'')}.${formData.format.toLowerCase()}`,
      time: 'Just now',
      icon: formData.format === 'PDF' ? 'pdf' : 'csv',
      color: formData.format === 'PDF' ? 'var(--status-critical)' : 'var(--status-success)'
    };
    
    setExports(prev => [newReport, ...prev]);
    setGenerating(false);
    setReportOpen(false);
    logAction('Analytics', 'Report Generated', newReport.name, 'success');
    showToast('success', 'Report Generated', `${newReport.name} is ready for download.`);
  };

  const handleDownload = (name: string) => {
    showToast('info', 'Downloading', `${name} download started.`);
    logAction('Analytics', 'Report Downloaded', name, 'info');
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6 animate-[fade-up_0.4s_ease-out]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-display text-[var(--text-primary)]">Reports & Analytics</h1>
          <p className="text-sm text-[var(--text-secondary)]">Custom BI dashboards and scheduled PDF exports</p>
        </div>
        <button onClick={() => setReportOpen(true)} className="bg-[image:var(--gradient-accent)] text-black px-4 py-2 rounded text-sm font-bold shadow-[var(--shadow-glow-accent)] hover:brightness-110 flex items-center gap-2">
          <FileText className="w-4 h-4" /> Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 space-y-6">
            <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-5 shadow-[var(--shadow-card)]">
               <h3 className="font-semibold text-[var(--text-primary)] mb-4">Saved Dashboards</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div onClick={() => showToast('info', 'Opening Dashboard', 'Loading Q2 Fleet Performance data...')} className="p-4 border border-[var(--border-strong)] rounded hover:border-[var(--accent-primary)] cursor-pointer transition-colors bg-[var(--bg-elevated)] group">
                     <BarChart2 className="w-6 h-6 text-[var(--accent-primary)] mb-3" />
                     <h4 className="font-medium text-[var(--text-primary)] mb-1">Q2 Fleet Performance</h4>
                     <p className="text-xs text-[var(--text-secondary)] mb-4">Metrics on fuel, idle time, and maintenance costs.</p>
                     <div className="text-xs text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] font-medium uppercase tracking-wider">Open Dashboard &rarr;</div>
                  </div>
                  <div onClick={() => showToast('info', 'Opening Dashboard', 'Loading Supplier SLA Adherence data...')} className="p-4 border border-[var(--border-strong)] rounded hover:border-[var(--accent-primary)] cursor-pointer transition-colors bg-[var(--bg-elevated)] group">
                     <BarChart2 className="w-6 h-6 text-[var(--accent-primary)] mb-3" />
                     <h4 className="font-medium text-[var(--text-primary)] mb-1">Supplier SLA Adherence</h4>
                     <p className="text-xs text-[var(--text-secondary)] mb-4">On-time delivery rates across top 50 suppliers.</p>
                     <div className="text-xs text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] font-medium uppercase tracking-wider">Open Dashboard &rarr;</div>
                  </div>
               </div>
            </div>
         </div>

         <div className="lg:col-span-1 space-y-6">
            <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-5 shadow-[var(--shadow-card)]">
               <h3 className="font-semibold text-[var(--text-primary)] mb-4">Recent Exports</h3>
               <div className="space-y-3">
                  {exports.map(exp => (
                    <div key={exp.id} className="flex items-center justify-between p-3 bg-[var(--bg-hover)] border border-[var(--border-default)] rounded">
                       <div className="flex items-center gap-3">
                          {exp.icon === 'pdf' ? <FileText className="w-4 h-4" style={{color: exp.color}} /> : <FileSpreadsheet className="w-4 h-4" style={{color: exp.color}} />}
                          <div>
                            <p className="text-sm font-medium text-[var(--text-primary)]">{exp.name}</p>
                            <p className="text-[10px] text-[var(--text-muted)]">Generated {exp.time}</p>
                          </div>
                       </div>
                       <button onClick={() => handleDownload(exp.name)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"><Download className="w-4 h-4"/></button>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      <Modal isOpen={reportOpen} onClose={() => !generating && setReportOpen(false)} title="Generate Custom Report">
        <form onSubmit={handleGenerate}>
          <label style={{ display: 'block', marginBottom: 4, fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Report Type</label>
          <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} disabled={generating} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', borderRadius: 6, color: 'var(--text-primary)', fontSize: 14, marginBottom: 12 }}>
            <option>Fleet Performance</option>
            <option>Shipment Analytics</option>
            <option>Sustainability & Emissions</option>
            <option>Inventory Optimization</option>
          </select>
          
          <label style={{ display: 'block', marginBottom: 4, fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Date Range</label>
          <select value={formData.dateRange} onChange={e => setFormData({...formData, dateRange: e.target.value})} disabled={generating} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', borderRadius: 6, color: 'var(--text-primary)', fontSize: 14, marginBottom: 12 }}>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Quarter</option>
            <option>Year to Date</option>
          </select>

          <label style={{ display: 'block', marginBottom: 4, fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Format</label>
          <div className="flex gap-4 mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="format" value="PDF" checked={formData.format === 'PDF'} onChange={e => setFormData({...formData, format: e.target.value})} disabled={generating} className="accent-[var(--accent-primary)]" />
              <span className="text-sm text-[var(--text-primary)]">PDF Document</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="format" value="CSV" checked={formData.format === 'CSV'} onChange={e => setFormData({...formData, format: e.target.value})} disabled={generating} className="accent-[var(--accent-primary)]" />
              <span className="text-sm text-[var(--text-primary)]">CSV Export</span>
            </label>
          </div>
          
          <div style={{ display: 'flex', gap: 12 }}>
            <button type="button" onClick={() => setReportOpen(false)} disabled={generating} style={{ flex: 1, padding: '10px 20px', background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-default)', borderRadius: 6, cursor: generating ? 'not-allowed' : 'pointer' }}>Cancel</button>
            <button type="submit" disabled={generating} style={{ flex: 1, padding: '10px 20px', background: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: 6, cursor: generating ? 'not-allowed' : 'pointer', fontWeight: 600, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {generating ? <Spinner size="sm" /> : 'Generate Report'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
