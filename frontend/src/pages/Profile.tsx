import { User, Mail, Shield, Smartphone } from "lucide-react";

export default function Profile() {
  return (
    <div className="space-y-6 pb-20 md:pb-6 animate-[fade-up_0.4s_ease-out]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-display text-[var(--text-primary)]">My Profile</h1>
          <p className="text-sm text-[var(--text-secondary)]">Manage your account settings and preferences</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="md:col-span-1">
            <div className="bg-[image:var(--gradient-card)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-card)] text-center relative overflow-hidden">
               <div className="absolute top-0 inset-x-0 h-16 bg-[var(--bg-active)] border-b border-[var(--border-subtle)]" />
               <div className="w-20 h-20 rounded-full bg-[var(--accent-primary)] border-4 border-[var(--bg-surface)] text-black flex items-center justify-center font-bold text-2xl mx-auto relative z-10 mt-6 shadow-[var(--shadow-glow-accent)]">
                 SD
               </div>
               <h2 className="text-lg font-medium text-[var(--text-primary)] mt-4">Sanjay Director</h2>
               <p className="text-xs text-[var(--accent-primary)] font-medium mb-1">Global supply Chain Head</p>
               <p className="text-xs text-[var(--text-muted)] mb-6">Nexus Logistics India</p>

               <button className="w-full py-2 bg-[var(--bg-input)] border border-[var(--border-strong)] rounded text-sm text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors">Edit Profile</button>
            </div>
         </div>

         <div className="md:col-span-2 space-y-6">
            <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] p-6">
               <h3 className="font-semibold text-[var(--text-primary)] mb-6">Contact Information</h3>
               
               <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] font-bold mb-1">Email Address</label>
                    <div className="flex items-center gap-3 bg-[var(--bg-input)] border border-[var(--border-default)] p-3 rounded">
                       <Mail className="w-4 h-4 text-[var(--text-secondary)]" />
                       <span className="text-sm text-[var(--text-primary)]">sanjay.d@nexuslogix.com</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] font-bold mb-1">Phone Number</label>
                    <div className="flex items-center gap-3 bg-[var(--bg-input)] border border-[var(--border-default)] p-3 rounded">
                       <Smartphone className="w-4 h-4 text-[var(--text-secondary)]" />
                       <span className="text-sm text-[var(--text-primary)]">+91 98765 43210</span>
                    </div>
                  </div>
               </div>
            </div>

            <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] p-6">
               <h3 className="font-semibold text-[var(--text-primary)] mb-6">Security</h3>
               
               <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4 mb-4">
                  <div className="flex items-center gap-3">
                     <Shield className="w-5 h-5 text-[var(--status-success)]" />
                     <div>
                       <p className="text-sm font-medium text-[var(--text-primary)]">Two-Factor Authentication (2FA)</p>
                       <p className="text-xs text-[var(--text-secondary)]">Currently active via Authenticator app</p>
                     </div>
                  </div>
                  <button className="text-xs border border-[var(--border-strong)] px-3 py-1.5 rounded text-[var(--text-primary)] hover:bg-[var(--bg-hover)]">Configure</button>
               </div>

               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <Key className="w-5 h-5 text-[var(--text-muted)]" />
                     <div>
                       <p className="text-sm font-medium text-[var(--text-primary)]">Account Password</p>
                       <p className="text-xs text-[var(--text-secondary)]">Last changed 45 days ago</p>
                     </div>
                  </div>
                  <button className="text-xs bg-[var(--bg-input)] border border-[var(--border-strong)] px-3 py-1.5 rounded text-[var(--text-primary)] hover:bg-[var(--bg-hover)]">Update</button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

import { Key } from "lucide-react";
