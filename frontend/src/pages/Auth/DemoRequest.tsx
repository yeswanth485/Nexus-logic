import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function DemoRequest() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] p-8 flex items-center justify-center">
      <div className="w-full max-w-md bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] p-8">
        <button 
          onClick={() => navigate("/")}
          className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
        
        <div className="mb-8">
          <h2 className="text-2xl font-display font-bold tracking-tight mb-2">Request Demo Access</h2>
          <p className="text-[var(--text-secondary)] text-sm">Please fill out this form to request access to the Nexus Logix enterprise platform.</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Demo request submitted! We will contact you shortly."); navigate("/"); }}>
           <div>
             <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Work Email</label>
             <input type="email" required placeholder="you@company.com" className="w-full bg-[var(--bg-input)] border border-[var(--border-default)] rounded-[var(--radius-md)] px-4 py-2.5 text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:outline-none" />
           </div>
           <div>
             <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Company Name</label>
             <input type="text" required placeholder="Acme Logistics" className="w-full bg-[var(--bg-input)] border border-[var(--border-default)] rounded-[var(--radius-md)] px-4 py-2.5 text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:outline-none" />
           </div>
           <div>
             <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Primary Interest</label>
             <select className="w-full bg-[var(--bg-input)] border border-[var(--border-default)] rounded-[var(--radius-md)] px-4 py-2.5 text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:outline-none appearance-none">
                <option>Fleet Intelligence</option>
                <option>Warehouse Optimization</option>
                <option>Supply Chain Risk Center</option>
                <option>Full Suite (End-to-End)</option>
             </select>
           </div>
           <button type="submit" className="mt-6 w-full py-3 bg-[image:var(--gradient-accent)] text-white font-semibold rounded-[var(--radius-md)] shadow-[var(--shadow-glow-accent)] hover:brightness-110 flex items-center justify-center gap-2 transition-all">
             Submit Request <CheckCircle2 className="w-4 h-4" />
           </button>
        </form>
      </div>
    </div>
  );
}
