import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message: string;
}

interface ToastContextValue {
  toasts: Toast[];
  showToast: (type: ToastType, title: string, message: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (type: ToastType, title: string, message: string) => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).slice(2, 5);
    setToasts(prev => [...prev, { id, type, title, message }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
}

// ─── ToastItem ────────────────────────────────────────────────────────────────

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onRemove, 4000);
    return () => clearTimeout(timer);
  }, [onRemove]);

  const borderColor = {
    success: 'var(--status-success)',
    error: 'var(--status-critical)',
    warning: 'var(--status-warning)',
    info: 'var(--accent-primary)',
  }[toast.type];

  const Icon = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertTriangle,
    info: Info,
  }[toast.type];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border-strong)',
        borderLeft: `4px solid ${borderColor}`,
        borderRadius: 8,
        padding: '12px 14px',
        minWidth: 280,
        maxWidth: 360,
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        animation: 'toast-slide-in 0.25s ease-out',
        position: 'relative',
      }}
    >
      <Icon size={16} style={{ color: borderColor, flexShrink: 0, marginTop: 2 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>
          {toast.title}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
          {toast.message}
        </div>
      </div>
      <button
        onClick={onRemove}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--text-muted)',
          padding: 0,
          flexShrink: 0,
        }}
      >
        <X size={14} />
      </button>
    </div>
  );
}

// ─── ToastContainer ───────────────────────────────────────────────────────────

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <>
      <style>{`
        @keyframes toast-slide-in {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
      <div
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        {toasts.map(t => (
          <ToastItem key={t.id} toast={t} onRemove={() => removeToast(t.id)} />
        ))}
      </div>
    </>
  );
}
