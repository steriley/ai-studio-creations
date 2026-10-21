import React from 'react';
import { Venue } from '../types';

interface AuditHistoryModalProps {
  venue: Venue;
  isOpen: boolean;
  onClose: () => void;
}

export const AuditHistoryModal: React.FC<AuditHistoryModalProps> = ({ venue, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#001854]/40 backdrop-blur-sm flex flex-col justify-end sm:justify-center sm:items-center sm:p-4 animate-fadeIn" 
      onClick={onClose}
    >
      <div 
        className="bg-[#F3ECDB] border border-[#D9CFB8] w-full sm:max-w-xl max-h-[85vh] rounded-t-2xl sm:rounded-2xl p-space-md sm:p-space-lg shadow-2xl overflow-y-auto flex flex-col gap-space-md" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 bg-[#454650]/20 rounded-full mx-auto sm:hidden mb-2"></div>
        
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between pb-space-sm border-b border-[#D9CFB8]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#8a5100]">receipt_long</span>
            <div>
              <h4 className="font-title-editorial text-title-editorial text-[#001854] font-bold">
                Audit History & Judicial Log
              </h4>
              <p className="font-label-ledger text-label-ledger uppercase text-[#454650]">
                {venue.name} · {venue.registryCode}
              </p>
            </div>
          </div>
          <button 
            className="w-8 h-8 rounded-full bg-[#F7F0DF] hover:bg-[#e1d9d2] flex items-center justify-center text-[#454650] transition-colors" 
            onClick={onClose} 
            type="button"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        {/* LOG ITEMS */}
        <div className="flex flex-col gap-3">
          {venue.auditLog && venue.auditLog.length > 0 ? (
            venue.auditLog.map((log) => (
              <div 
                key={log.id} 
                className="p-3.5 rounded-lg bg-[#F7F0DF] border border-[#D9CFB8] flex flex-col gap-1.5 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-label-button text-xs font-bold text-[#001854] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#8a5100]"></span>
                    {log.action}
                  </span>
                  <span className="font-mono text-[11px] text-[#454650]">{log.date}</span>
                </div>
                <p className="font-body-sm text-xs text-[#1e1b17] leading-relaxed">
                  {log.details}
                </p>
                <div className="flex items-center justify-between text-[11px] text-[#454650] pt-1 border-t border-[#D9CFB8]/40">
                  <span className="italic">Signatory: {log.author}</span>
                  <span className="font-label-ledger uppercase tracking-wider text-[#8a5100]">Ratified Record</span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 rounded-xl bg-[#F7F0DF] text-center border border-[#D9CFB8]">
              <span className="material-symbols-outlined text-3xl text-[#454650]/40 mb-2">find_in_page</span>
              <p className="font-title-editorial text-base text-[#1e1b17] font-semibold">
                Initial Docket Phase
              </p>
              <p className="font-body-sm text-xs text-[#454650] mt-1 max-w-xs mx-auto">
                {venue.name} entered the registry in Michaelmas 2026 and awaits formal multi-chair ratification.
              </p>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="pt-2 border-t border-[#D9CFB8] flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#1b2f6b] text-white hover:bg-[#001854] font-label-button text-xs font-bold transition-colors"
          >
            Dismiss Ledger
          </button>
        </div>
      </div>
    </div>
  );
};
