import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Hexagon, Menu, X, ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 h-16 flex items-center",
        isScrolled
          ? "bg-[var(--bg-overlay)] backdrop-blur-md border-b border-[var(--border-subtle)]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Hexagon className="h-8 w-8 text-[var(--accent-primary)] fill-[var(--accent-primary-glow)]" />
          <span className="font-display font-bold text-xl tracking-wider text-[var(--text-primary)]">
            NEXUS LOGIX
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--text-secondary)]">
          <Link to="#platform" className="hover:text-[var(--text-accent)] transition-colors">Platform</Link>
          <Link to="#industries" className="hover:text-[var(--text-accent)] transition-colors">Industries</Link>
          <Link to="#ai" className="hover:text-[var(--text-accent)] transition-colors">AI Features</Link>
          <Link to="#government" className="hover:text-[var(--text-accent)] transition-colors">Government</Link>
          <Link to="#pricing" className="hover:text-[var(--text-accent)] transition-colors">Pricing</Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/auth/signin"
            className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            Log In
          </Link>
          <Link
            to="/auth/demo"
            className="text-sm font-medium px-4 py-2 rounded-[var(--radius-md)] text-white bg-[image:var(--gradient-accent)] hover:brightness-110 shadow-[var(--shadow-glow-accent)] transition-all"
          >
            Request Demo
          </Link>
          <button className="flex items-center gap-1 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            EN <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-2"
          >
             {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] md:hidden p-4 flex flex-col gap-4 shadow-xl">
           <Link to="#platform" className="text-[var(--text-primary)] font-medium p-2" onClick={() => setMobileMenuOpen(false)}>Platform</Link>
           <Link to="#industries" className="text-[var(--text-primary)] font-medium p-2" onClick={() => setMobileMenuOpen(false)}>Industries</Link>
           <Link to="#ai" className="text-[var(--text-primary)] font-medium p-2" onClick={() => setMobileMenuOpen(false)}>AI Features</Link>
           <Link to="#pricing" className="text-[var(--text-primary)] font-medium p-2" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
           
           <div className="h-px bg-[var(--border-subtle)] my-2" />
           
           <Link to="/auth/signin" className="text-[var(--text-primary)] font-medium p-2" onClick={() => setMobileMenuOpen(false)}>Log In</Link>
           <Link
            to="/auth/demo"
            className="text-center text-sm font-medium px-4 py-3 rounded-[var(--radius-md)] text-white bg-[image:var(--gradient-accent)]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Request Demo
          </Link>
        </div>
      )}
    </nav>
  );
}
