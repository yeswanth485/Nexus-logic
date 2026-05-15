import { Building2, Factory, Landmark, Anchor, ShoppingCart, ActivitySquare } from "lucide-react";
import { useState } from "react";

const INDUSTRIES = [
  { id: "logistics", name: "Logistics", icon: Building2, desc: "Fleet optimization | Route planning | Delivery analytics | Fuel reduction", kpis: ["99.4% on-time rate", "23% fuel reduction", "340+ vehicles"] },
  { id: "manufacturing", name: "Manufacturing", icon: Factory, desc: "Inventory forecasting | Supplier monitoring | Warehouse intel", kpis: ["31% inv. cost reduction", "94% forecast accuracy", "Zero stockouts"] },
  { id: "government", name: "Government", icon: Landmark, desc: "Public supply monitoring | Emergency logistics | Traffic analytics", kpis: ["40% faster emergency resp.", "28% delay reduction", "99.9% uptime"] },
  { id: "ports", name: "Ports", icon: Anchor, desc: "Container tracking | Ship scheduling | Customs clearance", kpis: ["45% waiting time drop", "99.1% tracking accuracy", "Automated gates"] },
  { id: "ecommerce", name: "E-Commerce", icon: ShoppingCart, desc: "Last-mile delivery | Returns logistics | Warehouse automation", kpis: ["Same-day delivery +67%", "Returns processing -44%", "High volume prep"] },
  { id: "cities", name: "Smart Cities", icon: ActivitySquare, desc: "Urban freight management | City supply chains | Waste logistics", kpis: ["34% less city congestion", "28% emissions reduction", "Zone optimization"] }
];

export function IndustriesSection() {
  const [active, setActive] = useState(INDUSTRIES[0]);

  return (
    <section id="industries" className="py-24 bg-[var(--bg-elevated)] border-y border-[var(--border-subtle)] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">Built for every supply chain.</h2>
          <p className="text-lg text-[var(--text-secondary)]">One platform. Six industry verticals. All powered by the same AI engine.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {INDUSTRIES.map((ind) => {
            const Icon = ind.icon;
            const isActive = active.id === ind.id;
            return (
              <button
                key={ind.id}
                onClick={() => setActive(ind)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-[var(--text-primary)] text-black shadow-[var(--shadow-glow-accent)]' 
                    : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:bg-[var(--bg-hover)]'
                }`}
              >
                <Icon className="w-4 h-4" />
                {ind.name}
              </button>
            )
          })}
        </div>

        <div className="bg-[var(--bg-surface)] border border-[var(--border-strong)] rounded-[var(--radius-xl)] p-8 md:p-12 shadow-[var(--shadow-elevated)] animate-[fade-up_0.4s_ease-out]">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-[var(--radius-md)] bg-[var(--bg-active)] mb-6 text-[var(--accent-primary)] border border-[var(--border-strong)]">
                <active.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-3xl font-bold text-[var(--text-primary)] mb-4">{active.name} Supply Chains</h3>
              <p className="text-[var(--text-secondary)] text-lg mb-8 leading-relaxed max-w-md">
                {active.desc}
              </p>
              <button className="text-[var(--accent-primary)] font-semibold border-b border-[var(--accent-primary)] pb-0.5 hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all">
                Read the Case Study &rarr;
              </button>
            </div>
            
            <div className="grid gap-4">
               {active.kpis.map((kpi, i) => (
                 <div key={i} className="bg-[image:var(--gradient-card)] border border-[var(--border-subtle)] p-5 rounded-[var(--radius-lg)] flex items-center justify-between group hover:border-[var(--border-strong)] transition-colors">
                    <span className="font-mono text-lg text-[var(--text-primary)]">{kpi.split(" ")[0]}</span>
                    <span className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">{kpi.split(" ").slice(1).join(" ")}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
