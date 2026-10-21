import React from 'react';
import { CHAIR_STE_RILEY } from '../data/mockVenues';

export const UsersView: React.FC = () => {
  const chairs = [
    {
      name: "Ste Riley",
      title: "Presiding Chair",
      term: "Elected 2024 · Re-ratified 2026",
      inspections: 142,
      warrant: "W-MCR-001-CHAIR",
      status: "Active on Bench",
      avatar: CHAIR_STE_RILEY.avatarUrl,
      biography: "Custodian of the Central Manchester quadrant. Noted for unsparing judgements on sourdough crumb elasticity and garlic pickle authenticity."
    },
    {
      name: "Dame Clara Finch",
      title: "Second Chair & Registrar",
      term: "Elected 2023",
      inspections: 118,
      warrant: "W-MCR-002-CHAIR",
      status: "Active on Bench",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
      biography: "Keeper of the Broadsheet archives and presiding magistrate for Chinatown and Northern Quarter expeditions."
    },
    {
      name: "Lord Humphrey B.",
      title: "Senior Inspector (Honorary)",
      term: "Life Warrant (1998)",
      inspections: 320,
      warrant: "W-MCR-003-BENCH",
      status: "Advisory / Recused",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      biography: "Chophouse purist and author of the 1999 Gravy Consistency Memorandum."
    }
  ];

  return (
    <div className="w-full pt-20 bg-[#FBF6EA] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-margin-desktop py-space-xl flex flex-col gap-space-xl">
        <div className="flex flex-col gap-1 pb-space-lg border-b border-[#D9CFB8]">
          <span className="font-label-ledger text-label-ledger uppercase text-[#8a5100] tracking-widest font-bold">
            Judicial Roll & Authority Roster
          </span>
          <h1 className="font-headline-xl text-headline-xl text-[#001854] font-bold tracking-tight">
            Presiding Chairs of the Sovereign Food Committee
          </h1>
          <p className="font-body-md text-body-md text-[#454650] max-w-2xl">
            Only warranted signatories possess the legal executive prerogative to ratify inspections, table tier decrees, and enforce isochrone limits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {chairs.map(c => (
            <div key={c.warrant} className="bg-[#F3ECDB] border border-[#D9CFB8] rounded-xl p-space-lg shadow-xs flex flex-col justify-between gap-space-md">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <img src={c.avatar} alt={c.name} className="w-14 h-14 rounded-full object-cover border-2 border-[#D9CFB8]" />
                  <div>
                    <h3 className="font-headline-sm text-lg text-[#001854] font-bold">{c.name}</h3>
                    <span className="font-label-ledger text-xs text-[#8a5100] uppercase font-bold">{c.title}</span>
                    <span className="block font-mono text-[10px] text-[#454650]">{c.warrant}</span>
                  </div>
                </div>

                <div className="p-3 bg-[#F7F0DF] rounded-lg border border-[#D9CFB8]/60 text-xs text-[#1e1b17] leading-relaxed italic">
                  "{c.biography}"
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="p-2 bg-white rounded border border-[#D9CFB8]">
                    <span className="block text-[10px] uppercase text-[#454650] font-mono">Inspections</span>
                    <span className="font-bold text-[#001854] font-headline-sm text-base">{c.inspections} logged</span>
                  </div>
                  <div className="p-2 bg-white rounded border border-[#D9CFB8]">
                    <span className="block text-[10px] uppercase text-[#454650] font-mono">Status</span>
                    <span className="font-bold text-[#1E7A4E] text-xs">{c.status}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#D9CFB8] flex items-center justify-between text-xs text-[#454650]">
                <span>{c.term}</span>
                <span className="material-symbols-outlined text-base text-[#8a5100]">verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
