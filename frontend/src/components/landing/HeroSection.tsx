import { Link } from "react-router-dom";
import { Play, ArrowRight, CheckCircle2, Shield, Globe, Zap } from "lucide-react";
import { LiveDashboardPreview } from "./LiveDashboardPreview";

export function HeroSection() {
  return (
    <div className="relative min-h-screen pt-32 pb-16 overflow-hidden flex items-center">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[image:var(--gradient-hero)] pointer-events-none opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <div className="flex flex-col gap-8">
          <div className="flex gap-3 items-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--status-info-soft)] text-[var(--status-info)] border border-[rgba(139,92,246,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--status-info)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--status-info)]"></span>
              </span>
              AI-Powered
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[var(--bg-active)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
              Supply Chain Intelligence
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
            Predict. <br />
            Optimize. <br />
            Automate. <br />
            <span className="text-transparent bg-clip-text bg-[image:var(--gradient-accent)]">
              Logistics Intelligence.
            </span>
          </h1>

          <p className="font-body text-lg text-[var(--text-secondary)] max-w-[520px] leading-relaxed">
            Stop reacting to logistics failures. NEXUS LOGIX predicts supply chain disruptions before they happen — optimizing routes, inventory, fleet, and operations across your entire network in real time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              to="/auth/demo"
              className="inline-flex justify-center items-center gap-2 px-6 py-4 rounded-[var(--radius-lg)] text-base font-semibold text-white bg-[image:var(--gradient-accent)] hover:brightness-110 shadow-[var(--shadow-glow-accent)] transition-all group"
            >
              Request Demo
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="#demo"
              className="inline-flex justify-center items-center gap-2 px-6 py-4 rounded-[var(--radius-lg)] text-base font-semibold text-[var(--text-primary)] border border-[var(--border-strong)] hover:bg-[var(--bg-hover)] transition-all group"
            >
              <Play className="h-4 w-4 text-[var(--accent-primary)] group-hover:scale-110 transition-transform" />
              View Live Dashboard
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-[var(--border-subtle)]">
            <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] font-medium">
              <CheckCircle2 className="h-4 w-4 text-[var(--status-success)]" />
              99.2% uptime
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] font-medium">
              <Shield className="h-4 w-4 text-[var(--text-muted)]" />
              340+ enterprise clients
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] font-medium">
              <Globe className="h-4 w-4 text-[var(--text-muted)]" />
              28 countries
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] font-medium">
              <Zap className="h-4 w-4 text-[var(--status-warning)]" />
              12ms avg response
            </div>
          </div>
        </div>

        {/* Right Column - Live Dashboard Preview */}
        <div className="relative">
          <div className="absolute inset-0 bg-[var(--accent-primary)] opacity-10 blur-[100px] rounded-full" />
          <LiveDashboardPreview />
        </div>
      </div>
    </div>
  );
}
