import { Check } from "lucide-react";
import { Link } from "react-router-dom";

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-[var(--bg-elevated)] border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">Transparent, scalable pricing.</h2>
          <p className="text-lg text-[var(--text-secondary)]">No per-shipment fees. No hidden costs. Scale as you grow.</p>
          
          <div className="inline-flex items-center bg-[var(--bg-surface)] p-1 rounded-full border border-[var(--border-strong)] mt-8">
            <button className="px-6 py-2 rounded-full text-sm font-medium bg-[var(--bg-active)] text-[var(--text-primary)] shadow">Monthly</button>
            <button className="px-6 py-2 rounded-full text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Annual — <span className="text-[var(--status-success)]">Save 20%</span></button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Starter */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-xl)] p-8 flex flex-col">
            <h3 className="text-xl font-display font-medium text-[var(--text-primary)] mb-2">Starter</h3>
            <div className="text-[var(--text-secondary)] text-sm mb-6">For small logistics companies, 1-50 vehicles</div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-[var(--text-primary)]">₹49k</span>
              <span className="text-[var(--text-secondary)]">/mo</span>
            </div>
            
            <div className="flex-1 space-y-4 mb-8">
              {['Real-time tracking (50 vehicles)', 'Basic predictive analytics', 'Shipment dashboard', '3 user seats', 'Email support'].map((feat, i) => (
                <div key={i} className="flex gap-3 text-sm text-[var(--text-secondary)] items-center">
                  <Check className="w-4 h-4 text-[var(--status-success)] shrink-0" /> {feat}
                </div>
              ))}
            </div>
            
            <Link to="/auth/demo" className="w-full text-center py-3 rounded-[var(--radius-md)] border border-[var(--border-strong)] text-[var(--text-primary)] font-medium hover:bg-[var(--bg-hover)] transition-colors">
              Start Free Trial
            </Link>
          </div>

          {/* Enterprise */}
          <div className="bg-[var(--bg-surface)] border-2 border-[var(--accent-primary)] rounded-[var(--radius-xl)] p-8 flex flex-col relative shadow-[var(--shadow-glow-accent)] transform md:-translate-y-4">
            <div className="absolute top-0 inset-x-0 flex justify-center -translate-y-1/2">
              <span className="bg-[var(--accent-primary)] text-black text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">Most Popular</span>
            </div>
            <h3 className="text-xl font-display font-medium text-[var(--text-primary)] mb-2">Enterprise</h3>
            <div className="text-[var(--text-secondary)] text-sm mb-6">For mid-to-large ops, 50-500 vehicles</div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-[var(--text-primary)]">₹1.9L</span>
              <span className="text-[var(--text-secondary)]">/mo</span>
            </div>
            
            <div className="flex-1 space-y-4 mb-8">
              {['Unlimited vehicles & shipments', 'All 12 intelligence modules', 'Advanced AI predictions', '25 user seats', 'Priority support & dedicated CSM', 'Full API access + ERP integration'].map((feat, i) => (
                <div key={i} className="flex gap-3 text-sm text-[var(--text-primary)] items-start">
                  <Check className="w-4 h-4 text-[var(--accent-primary)] shrink-0 mt-0.5" /> <span className="leading-snug">{feat}</span>
                </div>
              ))}
            </div>
            
            <Link to="/auth/demo" className="w-full text-center py-3 rounded-[var(--radius-md)] bg-[image:var(--gradient-accent)] text-white font-medium hover:brightness-110 shadow-[var(--shadow-glow-accent)] transition-all">
              Request Demo
            </Link>
          </div>

          {/* Government */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-xl)] p-8 flex flex-col">
            <h3 className="text-xl font-display font-medium text-[var(--text-primary)] mb-2">Government</h3>
            <div className="text-[var(--text-secondary)] text-sm mb-6">For govt deps, ports, smart cities</div>
            <div className="mb-6">
              <span className="text-2xl font-bold text-[var(--text-primary)] leading-[1.6]">Custom</span>
            </div>
            
            <div className="flex-1 space-y-4 mb-8">
              {['Everything in Enterprise', 'Government Operations Center', 'Custom compliance reporting', 'On-premise deployment option', 'Dedicated implementation team', 'SLA: 99.9% uptime guarantee'].map((feat, i) => (
                <div key={i} className="flex gap-3 text-sm text-[var(--text-secondary)] items-start">
                  <Check className="w-4 h-4 text-[var(--status-neutral)] shrink-0 mt-0.5" /> <span className="leading-snug">{feat}</span>
                </div>
              ))}
            </div>
            
            <Link to="/auth/demo" className="w-full text-center py-3 rounded-[var(--radius-md)] border border-[var(--border-strong)] text-[var(--text-primary)] font-medium hover:bg-[var(--bg-hover)] transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
        
        <div className="mt-16 text-center text-sm font-mono text-[var(--text-muted)]">
          SOC 2 Type II Certified | ISO 27001 | GDPR Compliant | 99.9% SLA
        </div>
      </div>
    </section>
  );
}
