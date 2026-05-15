import { useState } from "react";
import { User, Mail, Shield, Smartphone, Key } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { useToast } from "../components/ui/Toast";
import Modal from "../components/ui/Modal";
import Spinner from "../components/ui/Spinner";

export default function Profile() {
  const { state, dispatch, logAction } = useAppContext();
  const { showToast } = useToast();

  const user = state.profile;

  const [editOpen, setEditOpen] = useState(false);
  const [formData, setFormData] = useState({ name: user.name, title: user.role, email: user.email, phone: user.phone });
  const [saving, setSaving] = useState(false);

  const [mfaActive, setMfaActive] = useState(true);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    dispatch({ type: 'UPDATE_USER', payload: formData });
    setSaving(false);
    setEditOpen(false);
    logAction('Profile', 'Profile Updated', 'User updated contact details', 'success');
    showToast('success', 'Profile Updated', 'Your profile information has been saved.');
  };

  const toggleMfa = async () => {
    const nextState = !mfaActive;
    setMfaActive(nextState);
    logAction('Security', nextState ? '2FA Enabled' : '2FA Disabled', 'User modified 2FA settings', nextState ? 'success' : 'warning');
    showToast(nextState ? 'success' : 'warning', nextState ? '2FA Enabled' : '2FA Disabled', nextState ? 'Two-factor authentication activated.' : 'Two-factor authentication disabled.');
  };

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
            <div className="bg-[image:var(--gradient-card)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-card)] text-center relative overflow-hidden flex flex-col items-center">
               <div className="absolute top-0 inset-x-0 h-16 bg-[var(--bg-active)] border-b border-[var(--border-subtle)]" />
               <div className="w-20 h-20 rounded-full bg-[var(--accent-primary)] border-4 border-[var(--bg-surface)] text-black flex items-center justify-center font-bold text-2xl relative z-10 mt-6 shadow-[var(--shadow-glow-accent)] uppercase">
                 {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
               </div>
               <h2 className="text-lg font-medium text-[var(--text-primary)] mt-4">{user.name}</h2>
               <p className="text-xs text-[var(--accent-primary)] font-medium mb-1">{user.role}</p>
               <p className="text-xs text-[var(--text-muted)] mb-6">Nexus Logistics India</p>

               <button onClick={() => setEditOpen(true)} className="w-full py-2 bg-[var(--bg-input)] border border-[var(--border-strong)] rounded text-sm text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors">Edit Profile</button>
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
                       <span className="text-sm text-[var(--text-primary)]">{user.email}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[var(--text-muted)] font-bold mb-1">Phone Number</label>
                    <div className="flex items-center gap-3 bg-[var(--bg-input)] border border-[var(--border-default)] p-3 rounded">
                       <Smartphone className="w-4 h-4 text-[var(--text-secondary)]" />
                       <span className="text-sm text-[var(--text-primary)]">{user.phone}</span>
                    </div>
                  </div>
               </div>
            </div>

            <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] p-6">
               <h3 className="font-semibold text-[var(--text-primary)] mb-6">Security</h3>
               
               <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4 mb-4">
                  <div className="flex items-center gap-3">
                     <Shield className={`w-5 h-5 ${mfaActive ? 'text-[var(--status-success)]' : 'text-[var(--status-warning)]'}`} />
                     <div>
                       <p className="text-sm font-medium text-[var(--text-primary)]">Two-Factor Authentication (2FA)</p>
                       <p className="text-xs text-[var(--text-secondary)]">{mfaActive ? 'Currently active via Authenticator app' : 'Disabled — highly recommended'}</p>
                     </div>
                  </div>
                  <button onClick={toggleMfa} className="text-xs border border-[var(--border-strong)] px-3 py-1.5 rounded text-[var(--text-primary)] hover:bg-[var(--bg-hover)]">
                    {mfaActive ? 'Disable' : 'Enable'}
                  </button>
               </div>

               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <Key className="w-5 h-5 text-[var(--text-muted)]" />
                     <div>
                       <p className="text-sm font-medium text-[var(--text-primary)]">Account Password</p>
                       <p className="text-xs text-[var(--text-secondary)]">Last changed 45 days ago</p>
                     </div>
                  </div>
                  <button onClick={() => showToast('info', 'Password Reset', 'A password reset link has been sent to your email.')} className="text-xs bg-[var(--bg-input)] border border-[var(--border-strong)] px-3 py-1.5 rounded text-[var(--text-primary)] hover:bg-[var(--bg-hover)]">Update</button>
               </div>
            </div>
         </div>
      </div>

      <Modal isOpen={editOpen} onClose={() => !saving && setEditOpen(false)} title="Edit Profile">
        <form onSubmit={handleSave}>
          <label style={{ display: 'block', marginBottom: 4, fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Full Name</label>
          <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} disabled={saving} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', borderRadius: 6, color: 'var(--text-primary)', fontSize: 14, marginBottom: 12 }} />
          
          <label style={{ display: 'block', marginBottom: 4, fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Job Title</label>
          <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} disabled={saving} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', borderRadius: 6, color: 'var(--text-primary)', fontSize: 14, marginBottom: 12 }} />
          
          <label style={{ display: 'block', marginBottom: 4, fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Email</label>
          <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} disabled={saving} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', borderRadius: 6, color: 'var(--text-primary)', fontSize: 14, marginBottom: 12 }} />
          
          <label style={{ display: 'block', marginBottom: 4, fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Phone Number</label>
          <input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} disabled={saving} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', borderRadius: 6, color: 'var(--text-primary)', fontSize: 14, marginBottom: 12 }} />
          
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <button type="button" onClick={() => setEditOpen(false)} disabled={saving} style={{ flex: 1, padding: '10px 20px', background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-default)', borderRadius: 6, cursor: saving ? 'not-allowed' : 'pointer' }}>Cancel</button>
            <button type="submit" disabled={saving} style={{ flex: 1, padding: '10px 20px', background: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: 6, cursor: saving ? 'not-allowed' : 'pointer', fontWeight: 600, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {saving ? <Spinner size="sm" /> : 'Save Changes'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
