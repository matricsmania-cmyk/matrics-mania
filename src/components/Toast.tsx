'use client';

import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-md w-full px-4 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border transition-all duration-300 transform translate-y-0 ${
        toast.type === 'success'
          ? 'bg-[#171717] text-[#F7F5F0] border-[#2E7D32]'
          : toast.type === 'error'
          ? 'bg-[#171717] text-[#F7F5F0] border-[#C62828]'
          : 'bg-[#171717] text-[#F7F5F0] border-[#B39A6B]'
      }`}
    >
      {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#4ADE80] shrink-0 mt-0.5" />}
      {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-[#F87171] shrink-0 mt-0.5" />}
      {toast.type === 'info' && <Info className="w-5 h-5 text-[#B39A6B] shrink-0 mt-0.5" />}

      <div className="flex-1 text-xs">
        <p className="font-bold text-sm text-[#F7F5F0]">{toast.title}</p>
        {toast.description && <p className="text-[#BDB7AA] mt-0.5 leading-relaxed">{toast.description}</p>}
      </div>

      <button
        onClick={() => onDismiss(toast.id)}
        className="text-[#BDB7AA] hover:text-[#F7F5F0] transition-colors p-1 rounded-md cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
