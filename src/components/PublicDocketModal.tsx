import React from 'react';
import { Venue } from '../types';

interface PublicDocketModalProps {
  venue: Venue;
  isOpen: boolean;
  onClose: () => void;
}

export const PublicDocketModal: React.FC<PublicDocketModalProps> = ({ venue, isOpen, onClose }) => {
  if (!isOpen) return null;

  const getTierDisplay = (tier: string) => {
    switch (tier) {
      case 'approved':
        return { label: 'Approved (Hall of Fame)', bg: 'bg-[#E8F5EE]', text: 'text-[#1E7A4E]', border: 'border-[#1E7A4E]' };
      case 'consideration':
        return { label: 'Under Active Consideration', bg: 'bg-[#FEF5E7]', text: 'text-[#C27803]', border: 'border-[#C27803]' };
      case 'assessed':
        return { label: 'To Be Assessed', bg: 'bg-[#F0F2F5]', text: 'text-[#5A6474]', border: 'border-[#5A6474]' };
      case 'reluctant':
        return { label: 'Reluctantly Tolerated', bg: 'bg-[#F7EEF8]', text: 'text-[#7C3A82]', border: 'border-[#7C3A82]' };
      case 'rejected':
        return { label: 'Rejected / Expelled', bg: 'bg-[#FDF0F0]', text: 'text-[#B92B27]', border: 'border-[#B92B27]' };
      default:
        return { label: 'Archived', bg: 'bg-[#F4F4F5]', text: 'text-[#71717A]', border: 'border-[#71717A]' };
    }
  };

  const tierInfo = getTierDisplay(venue.tier);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#001854]/50 backdrop-blur-sm animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-[#FBF6EA] border-2 border-[#D9CFB8] rounded-2xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 flex flex-col gap-6 relative overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative corner registry marks */}
        <div className="absolute top-3 left-3 text-[10px] font-mono text-[#8a5100]/60 tracking-widest uppercase">
          MCR-GAZETTE-PARCHMENT
        </div>
        <div className="absolute top-3 right-3 text-[10px] font-mono text-[#8a5100]/60 tracking-widest uppercase">
          {venue.registryCode}
        </div>

        {/* TOP CEREMONIAL HEADER */}
        <div className="text-center border-b-2 border-[#D9CFB8] pb-6 pt-2">
          <div className="w-14 h-14 rounded-full bg-[#1b2f6b] text-white flex items-center justify-center mx-auto mb-3 shadow-md border-2 border-[#F29A2E]">
            <span className="material-symbols-outlined text-2xl text-[#ffa538]">verified</span>
          </div>
          <span className="font-label-ledger text-label-ledger text-[#8a5100] uppercase tracking-widest font-bold">
            By Warrant of the Sovereign Food Committee
          </span>
          <h2 className="font-headline-xl text-headline-xl text-[#001854] font-bold mt-1 tracking-tight">
            {venue.name}
          </h2>
          <p className="font-body-sm text-body-sm text-[#454650] max-w-md mx-auto mt-1">
            {venue.address} · {venue.district}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${tierInfo.bg} ${tierInfo.text} font-label-ledger text-label-ledger uppercase tracking-wider font-bold border ${tierInfo.border}`}>
              <span className="w-2 h-2 rounded-full bg-current"></span>
              {tierInfo.label}
            </span>
            <span className="px-2.5 py-1 rounded bg-[#F3ECDB] text-[#454650] font-label-ledger text-label-ledger border border-[#D9CFB8] uppercase">
              {venue.tag}
            </span>
            <span className="px-2.5 py-1 rounded bg-[#F3ECDB] text-[#001854] font-label-ledger text-label-ledger border border-[#D9CFB8] font-bold">
              {venue.costGrade === 1 ? '£ — Swift Lunch' : venue.costGrade === 2 ? '££ — Civilised Mid' : '£££ — Payday Splurge'}
            </span>
          </div>
        </div>

        {/* IMAGE BANNER IF PRESENT */}
        {venue.imageUrl && (
          <div className="relative rounded-xl overflow-hidden h-48 border border-[#D9CFB8] shadow-inner bg-[#e1d9d2]">
            <img 
              src={venue.imageUrl} 
              alt={venue.name}
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001854]/80 via-transparent to-transparent flex items-end p-4">
              <span className="font-title-editorial text-sm italic text-white">
                “{venue.pullQuote || 'Manchester’s subterranean sanctuary.'}”
              </span>
            </div>
          </div>
        )}

        {/* PRESCRIPTION PROCLAMATION ("EAT LIKE US") */}
        <div className="bg-[#F3ECDB] p-4 sm:p-5 rounded-xl border border-[#D9CFB8] shadow-xs">
          <div className="flex items-center justify-between mb-2 pb-1 border-b border-[#D9CFB8]/60">
            <span className="font-label-button text-label-button text-[#001854] uppercase tracking-wider font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#8a5100] text-base">stars</span>
              Official "Eat Like Us" Prescription
            </span>
            <span className="font-label-ledger text-[10px] text-[#1E7A4E] uppercase font-bold">
              Gazette Highlight
            </span>
          </div>
          <p className="font-body-md text-body-md text-[#1e1b17] leading-relaxed italic">
            "{venue.lunchSpecial}"
          </p>
        </div>

        {/* WALKING TELEMETRY & COORDINATES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="p-3.5 rounded-xl bg-[#F7F0DF] border border-[#D9CFB8] flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#ffdcbd] text-[#683c00] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-xl">directions_walk</span>
            </div>
            <div>
              <div className="font-headline-sm text-base text-[#001854] font-bold">
                {venue.walkTimeMin} min march ({venue.walkDistanceMiles} mi)
              </div>
              <div className="font-body-sm text-xs text-[#454650]">
                Departing from Spinningfields {venue.walkVia}
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F7F0DF] border border-[#D9CFB8] flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#dce1ff] text-[#001854] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-xl">gavel</span>
            </div>
            <div>
              <div className="font-headline-sm text-sm text-[#001854] font-bold">
                Dual-Chair Concord Quorum
              </div>
              <div className="font-body-sm text-xs text-[#454650]">
                {venue.dualChairConcord.affirmedCount >= 2 
                  ? 'Quorum Ratified for Today' 
                  : 'Pending Synchronous Second Signature'}
              </div>
            </div>
          </div>
        </div>

        {/* WAX SEAL FOOTER */}
        <div className="flex items-center justify-between pt-4 border-t border-[#D9CFB8] text-xs text-[#454650]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-base text-[#8a5100]">history_edu</span>
            <span>Recorded in Michaelmas Session 2026 by Chair Ste Riley</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-lg border border-[#D9CFB8] bg-[#F7F0DF] hover:bg-[#F3ECDB] font-label-button text-xs text-[#1e1b17] flex items-center gap-1 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">print</span>
              Print Slip
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-[#1b2f6b] text-white hover:bg-[#001854] font-label-button text-xs font-bold transition-colors"
            >
              Close Docket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
