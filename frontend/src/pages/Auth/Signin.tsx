import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase";
import { Hexagon } from "lucide-react";

export default function Signin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError("");
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to sign in with Google.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col flex-1 bg-[var(--bg-elevated)] relative overflow-hidden p-12 border-r border-[var(--border-subtle)]">
        <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-[400px] bg-[image:var(--gradient-hero)] opacity-30 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Hexagon className="h-10 w-10 text-[var(--accent-primary)] fill-[var(--accent-primary-glow)]" />
              <span className="font-display font-bold text-3xl tracking-wider">
                NEXUS LOGIX
              </span>
            </div>
            <p className="text-xl text-[var(--text-secondary)] mb-12 max-w-md leading-relaxed">
              AI Supply Chain Control Tower
            </p>
          </div>

          <div className="space-y-6 max-w-md animate-[fade-up_0.8s_ease-out]">
            <div className="bg-[var(--bg-active)] p-6 rounded-[var(--radius-lg)] border border-[var(--border-subtle)]">
              <div className="text-3xl font-display font-bold text-[var(--text-primary)] mb-2">94.2%</div>
              <div className="text-sm text-[var(--text-muted)] uppercase tracking-wider">Prediction accuracy across all deployments</div>
            </div>
            <div className="bg-[var(--bg-active)] p-6 rounded-[var(--radius-lg)] border border-[var(--border-subtle)]">
              <div className="text-3xl font-display font-bold text-[var(--text-primary)] mb-2">₹23.4 Cr</div>
              <div className="text-sm text-[var(--text-muted)] uppercase tracking-wider">Saved by enterprise clients this month</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 sm:p-12 relative">
        {/* Mobile Logo */}
        <div className="flex lg:hidden items-center gap-3 mb-12 w-full max-w-sm">
          <Hexagon className="h-8 w-8 text-[var(--accent-primary)] fill-[var(--accent-primary-glow)]" />
          <span className="font-display font-bold text-2xl tracking-wider">
            NEXUS LOGIX
          </span>
        </div>

        <div className="w-full max-w-sm space-y-8">
          <div>
            <h2 className="text-2xl font-display font-bold tracking-tight mb-2">Sign in to Nexus Logix</h2>
            <p className="text-[var(--text-secondary)]">Access your operations control center</p>
          </div>

          {error && (
            <div className="p-3 rounded-[var(--radius-sm)] bg-[var(--status-critical-soft)] border border-[var(--status-critical)] text-[var(--status-critical)] text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex justify-center items-center gap-3 bg-white text-gray-900 border border-gray-200 rounded-[var(--radius-md)] px-4 py-3 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-primary)] transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              {loading ? "Signing in..." : "Continue with Google"}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--border-strong)]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[var(--bg-base)] text-[var(--text-muted)]">or</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Email address</label>
                <input 
                  type="email" 
                  disabled
                  placeholder="Enterprise SSD coming soon"
                  className="w-full bg-[var(--bg-input)] border border-[var(--border-default)] rounded-[var(--radius-md)] px-4 py-2.5 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] opacity-50 cursor-not-allowed"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-[var(--text-secondary)]">Password</label>
                  <span className="text-xs text-[var(--accent-primary)] cursor-pointer hover:underline">Forgot password?</span>
                </div>
                <input 
                  type="password" 
                  disabled
                  placeholder="••••••••"
                  className="w-full bg-[var(--bg-input)] border border-[var(--border-default)] rounded-[var(--radius-md)] px-4 py-2.5 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] opacity-50 cursor-not-allowed"
                />
              </div>
              
              <button disabled className="w-full flex justify-center items-center opacity-50 cursor-not-allowed gap-2 px-4 py-3 rounded-[var(--radius-md)] text-sm font-semibold text-white bg-[image:var(--gradient-accent)]">
                Sign In
              </button>
            </div>
          </div>

          <div className="text-center pt-4">
            <p className="text-sm text-[var(--text-secondary)]">
              Don't have an account? <Link to="/auth/demo" className="text-[var(--accent-primary)] hover:underline">Request access &rarr;</Link>
            </p>
          </div>
          
          <div className="text-center pt-8 border-t border-[var(--border-subtle)]">
            <p className="text-xs text-[var(--text-muted)]">
              Protected by enterprise-grade encryption.<br />SOC 2 Type II certified.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
