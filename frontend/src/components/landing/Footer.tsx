import { Link } from "react-router-dom";
import { Hexagon } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[var(--border-subtle)] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <Hexagon className="h-8 w-8 text-[var(--accent-primary)] fill-[var(--accent-primary-glow)]" />
              <span className="font-display font-bold text-xl tracking-wider text-[var(--text-primary)]">
                NEXUS LOGIX
              </span>
            </Link>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-xs mb-6">
              From Reactive Logistics to Predictive Autonomous Operations. Turn your supply chain into a competitive advantage.
            </p>
            <div className="flex gap-4">
               {/* Social Icons Placeholder */}
               <div className="w-8 h-8 rounded-full bg-[var(--bg-surface)] border border-[var(--border-strong)] flex items-center justify-center text-[var(--text-muted)] hover:text-white transition-colors cursor-pointer">in</div>
               <div className="w-8 h-8 rounded-full bg-[var(--bg-surface)] border border-[var(--border-strong)] flex items-center justify-center text-[var(--text-muted)] hover:text-white transition-colors cursor-pointer">x</div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs">Platform</h4>
            <ul className="space-y-4 text-sm text-[var(--text-secondary)]">
              <li><a href="#" className="hover:text-[var(--accent-primary)] transition-colors">Overview Dashboard</a></li>
              <li><a href="#" className="hover:text-[var(--accent-primary)] transition-colors">Shipment Tracking</a></li>
              <li><a href="#" className="hover:text-[var(--accent-primary)] transition-colors">Route Optimization</a></li>
              <li><a href="#" className="hover:text-[var(--accent-primary)] transition-colors">Fleet Intelligence</a></li>
              <li><a href="#" className="hover:text-[var(--accent-primary)] transition-colors">AI Insights</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs">Company</h4>
            <ul className="space-y-4 text-sm text-[var(--text-secondary)]">
              <li><a href="#" className="hover:text-[var(--accent-primary)] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[var(--accent-primary)] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[var(--accent-primary)] transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-[var(--accent-primary)] transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-[var(--accent-primary)] transition-colors">Partners</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs">Legal & Support</h4>
            <ul className="space-y-4 text-sm text-[var(--text-secondary)]">
              <li><a href="#" className="hover:text-[var(--accent-primary)] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[var(--accent-primary)] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[var(--accent-primary)] transition-colors">API Documentation</a></li>
              <li><a href="#" className="hover:text-[var(--accent-primary)] transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-[var(--accent-primary)] transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[var(--status-success)]" />System Status</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-[var(--border-subtle)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--text-muted)]">
            © 2026 Nexus Logix Technologies Pvt. Ltd. | CIN: UXXXXX
          </p>
          <p className="text-xs font-mono text-[var(--text-muted)]">
            ISO 27001 Certified
          </p>
        </div>
      </div>
    </footer>
  );
}
