import React from 'react';
import { CommitteeMotion } from '../types';

interface PendingMotionsViewProps {
  motions: CommitteeMotion[];
  onCosignMotion: (motionId: string) => void;
}

export const PendingMotionsView: React.FC<PendingMotionsViewProps> = ({ motions, onCosignMotion }) => {
  return (
    <div className="w-full pt-20 bg-[#FBF6EA] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-margin-desktop py-space-xl flex flex-col gap-space-xl">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md pb-space-lg border-b border-[#D9CFB8]">
          <div className="flex flex-col gap-1">
            <span className="font-label-ledger text-label-ledger uppercase text-[#8a5100] tracking-widest font-bold">
              Judicial Bench · Motions in Suspension
            </span>
            <h1 className="font-headline-xl text-headline-xl text-[#001854] font-bold tracking-tight">
              Pending Decrees & Cosignatures
            </h1>
            <p className="font-body-md text-body-md text-[#454650] max-w-2xl">
              Under Rule 4.B, no Tier Decree, permanent closure, or daily inspection may be ratified without two independent Chair signatures.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#FEF5E7] text-[#C27803] font-label-ledger text-xs uppercase font-bold border border-[#C27803]/30">
              {motions.filter(m => m.status.includes('Pending')).length} Pending Cosignatures
            </span>
          </div>
        </div>

        {/* MOTIONS LIST */}
        <div className="grid grid-cols-1 gap-space-md">
          {motions.map((motion) => {
            const isPending = motion.status.includes('Pending');
            return (
              <div
                key={motion.id}
                className="p-space-lg rounded-xl bg-[#F3ECDB] border border-[#D9CFB8] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-space-md"
              >
                <div className="flex flex-col gap-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="font-label-ledger text-[11px] uppercase tracking-wider text-[#8a5100] font-bold">
                      {motion.motionType}
                    </span>
                    <span className="text-[#D9CFB8]">·</span>
                    <span className="font-mono text-xs text-[#454650]">{motion.date}</span>
                  </div>

                  <h3 className="font-headline-sm text-xl text-[#001854] font-bold">
                    {motion.venueName}
                  </h3>

                  <p className="font-body-md text-sm text-[#1e1b17] leading-relaxed">
                    "{motion.notes}"
                  </p>

                  <div className="flex items-center gap-2 text-xs text-[#454650] mt-1">
                    <span className="material-symbols-outlined text-sm text-[#8a5100]">draw</span>
                    <span>Proposing Chair: <strong>{motion.proposer}</strong></span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-space-sm shrink-0">
                  <span className={`px-3 py-1 rounded-full font-label-ledger text-xs uppercase font-bold ${
                    isPending
                      ? 'bg-[#FEF5E7] text-[#C27803] border border-[#C27803]/40'
                      : 'bg-[#E8F5EE] text-[#1E7A4E] border border-[#1E7A4E]/40'
                  }`}>
                    {motion.status}
                  </span>

                  {isPending && (
                    <button
                      onClick={() => onCosignMotion(motion.id)}
                      className="px-4 py-2.5 rounded-lg bg-[#1b2f6b] text-white hover:bg-[#001854] font-label-button text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all active:scale-[0.99] cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">verified</span>
                      <span>Cosign as Second Chair</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
