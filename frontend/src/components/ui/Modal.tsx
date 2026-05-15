import React, { useEffect, ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @keyframes modal-in {
          from { opacity: 0; transform: translateY(-16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.72)',
          backdropFilter: 'blur(4px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
        }}
      >
        <div
          onClick={e => e.stopPropagation()}
          style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-strong)',
            borderRadius: 12,
            padding: 24,
            width: '100%',
            maxWidth: 560,
            animation: 'modal-in 0.2s ease-out',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>
              {title}
            </h3>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                padding: 4,
                display: 'flex',
                alignItems: 'center',
                borderRadius: 4,
              }}
            >
              <X size={18} />
            </button>
          </div>

          <div style={{ height: 1, background: 'var(--border-default)', marginBottom: 16 }} />

          {/* Scrollable body */}
          <div style={{ overflowY: 'auto', maxHeight: '70vh' }}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
