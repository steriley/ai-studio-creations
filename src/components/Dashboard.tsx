import React from 'react';
import { Venue, BriberyItem, CommitteeMotion } from '../types';

interface DashboardProps {
  venues: Venue[];
  briberyRecords: BriberyItem[];
  motions: CommitteeMotion[];
  onSelectVenue: (venue: Venue) => void;
  onNavigateTab: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  venues,
  briberyRecords,
  motions,
  onSelectVenue,
  onNavigateTab,
}) => {
  const armenianTaverna = venues.find(v => v.id === 'reg-029') || venues[0];

  const approvedCount = venues.filter(v => v.tier === 'approved').length;
  const considerationCount = venues.filter(v => v.tier === 'consideration').length;
  const pendingInspectionCount = venues.filter(v => v.dualChairConcord.affirmedCount === 1).length;

  return (
    <div className="w-full pt-20 bg-[#FBF6EA] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-margin-desktop py-space-xl flex flex-col gap-space-xl">
        
        {/* WELCOME CEREMONIAL MASTHEAD */}
        <div className="p-space-lg sm:p-space-xl rounded-2xl bg-[#F3ECDB] border border-[#D9CFB8] shadow-sm relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-space-lg">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1E7A4E] animate-pulse"></span>
              <span className="font-label-ledger text-label-ledger uppercase tracking-wider text-[#8a5100] font-bold">
                Presiding Session: Michaelmas Term 2026
              </span>
            </div>
            <h1 className="font-headline-xl text-3xl sm:text-4xl text-[#001854] font-bold tracking-tight">
              Good Luncheon, Presiding Chair Ste Riley.
            </h1>
            <p className="font-body-md text-body-md text-[#454650]">
              The Sovereign Food Committee sits in session. Quorums, inspections, and bribery filings stand awaiting official ink.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => onSelectVenue(armenianTaverna)}
              className="w-full sm:w-auto px-space-lg py-3 rounded-xl bg-[#1b2f6b] text-white hover:bg-[#001854] font-label-button text-label-button shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-base text-[#ffa538]">domain</span>
              <span>Open Armenian Taverna Docket</span>
            </button>
            <button
              onClick={() => onNavigateTab('pending')}
              className="w-full sm:w-auto px-space-md py-3 rounded-xl bg-[#F7F0DF] border border-[#D9CFB8] hover:bg-[#F3ECDB] text-[#1e1b17] font-label-button text-label-button shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-base text-[#8a5100]">gavel</span>
              <span>Pending Motions ({motions.length})</span>
            </button>
          </div>
        </div>

        {/* HIGH-LEVEL REGISTRY TELEMETRY STRIP */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md">
          <div className="p-space-md rounded-xl bg-[#F3ECDB] border border-[#D9CFB8] shadow-xs flex flex-col justify-between">
            <span className="font-label-ledger text-xs uppercase text-[#454650] font-bold">
              Total Enrolled Venues
            </span>
            <div className="font-headline-xl text-3xl text-[#001854] font-bold mt-2">
              {venues.length}
            </div>
            <span className="font-body-sm text-[11px] text-[#454650] mt-1">
              Registered sovereign entries
            </span>
          </div>

          <div className="p-space-md rounded-xl bg-[#E8F5EE] border border-[#1E7A4E]/30 shadow-xs flex flex-col justify-between">
            <span className="font-label-ledger text-xs uppercase text-[#1E7A4E] font-bold">
              Approved (Hall of Fame)
            </span>
            <div className="font-headline-xl text-3xl text-[#1E7A4E] font-bold mt-2">
              {approvedCount}
            </div>
            <span className="font-body-sm text-[11px] text-[#1E7A4E]/80 mt-1">
              Unanimous committee decree
            </span>
          </div>

          <div className="p-space-md rounded-xl bg-[#FEF5E7] border border-[#C27803]/30 shadow-xs flex flex-col justify-between">
            <span className="font-label-ledger text-xs uppercase text-[#C27803] font-bold">
              Under Consideration
            </span>
            <div className="font-headline-xl text-3xl text-[#C27803] font-bold mt-2">
              {considerationCount}
            </div>
            <span className="font-body-sm text-[11px] text-[#C27803]/80 mt-1">
              Active trials & tastings
            </span>
          </div>

          <div className="p-space-md rounded-xl bg-[#F0F2F5] border border-[#5A6474]/30 shadow-xs flex flex-col justify-between">
            <span className="font-label-ledger text-xs uppercase text-[#5A6474] font-bold">
              Quorums Awaiting Cosigner
            </span>
            <div className="font-headline-xl text-3xl text-[#5A6474] font-bold mt-2">
              {pendingInspectionCount}
            </div>
            <span className="font-body-sm text-[11px] text-[#5A6474] mt-1">
              Requires 2nd chair signature
            </span>
          </div>
        </div>

        {/* 2-COLUMN DASHBOARD CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
          
          {/* LEFT: PRIORITY DOCKET FOCUS (ARMENIAN TAVERNA & INSPECTIONS) */}
          <div className="lg:col-span-8 flex flex-col gap-space-lg">
            
            {/* HERO ACTIVE DOCKET SPOTLIGHT */}
            <div className="p-space-lg rounded-2xl bg-[#F3ECDB] border-2 border-[#8a5100]/40 shadow-sm flex flex-col gap-space-md relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-[#D9CFB8] pb-space-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#8a5100]">verified</span>
                  <h3 className="font-headline-sm text-headline-sm text-[#001854]">
                    Active Focus Docket: Armenian Taverna
                  </h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#F0F2F5] text-[#5A6474] font-label-ledger text-label-ledger uppercase font-bold">
                  To Be Assessed
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-space-md items-center">
                <div className="relative w-full sm:w-48 h-32 rounded-lg overflow-hidden shrink-0 bg-[#e1d9d2] border border-[#D9CFB8]">
                  <img
                    className="w-full h-full object-cover"
                    src={armenianTaverna.imageUrl}
                    alt="Armenian Taverna"
                  />
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-[#1e1b17]/80 text-[#FBF6EA] font-mono text-[10px]">
                    REG-029
                  </span>
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <div className="font-headline-sm text-lg text-[#001854] font-bold">
                    Subterranean Vault Interior View
                  </div>
                  <p className="font-body-sm text-xs text-[#454650]">
                    1–7 Princess Street, M2 4DF · Central Civic Quarter (6 min walk from Spinningfields)
                  </p>
                  <p className="font-title-editorial text-xs italic text-[#8a5100] mt-1">
                    “{armenianTaverna.pullQuote}”
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => onSelectVenue(armenianTaverna)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#1b2f6b] text-white hover:bg-[#001854] font-label-button text-xs font-bold transition-colors cursor-pointer"
                    >
                      Open Full Dossier
                    </button>
                    <span className="text-xs text-[#8a5100] font-mono font-semibold">
                      Quorum: 1/2 Signed
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* RECENT MOTIONS TABLE */}
            <div className="p-space-lg rounded-2xl bg-[#F3ECDB] border border-[#D9CFB8] shadow-xs flex flex-col gap-space-sm">
              <div className="flex items-center justify-between pb-space-sm border-b border-[#D9CFB8]">
                <h3 className="font-headline-sm text-headline-sm text-[#001854] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#8a5100]">gavel</span>
                  <span>Pending Committee Decrees</span>
                </h3>
                <button
                  onClick={() => onNavigateTab('pending')}
                  className="font-label-button text-xs text-[#1b2f6b] hover:underline cursor-pointer"
                >
                  View All Motions →
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {motions.map(motion => (
                  <div
                    key={motion.id}
                    className="p-3 rounded-lg bg-[#F7F0DF] border border-[#D9CFB8] flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs"
                  >
                    <div>
                      <div className="font-label-button text-sm text-[#001854] font-bold">
                        {motion.motionType}: {motion.venueName}
                      </div>
                      <div className="font-body-sm text-xs text-[#454650] mt-0.5">
                        Proposer: {motion.proposer} · {motion.date}
                      </div>
                      <div className="font-body-sm text-xs text-[#1e1b17] italic mt-1">
                        "{motion.notes}"
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-[#FEF5E7] text-[#C27803] font-label-ledger text-[10px] uppercase font-bold self-start sm:self-center shrink-0">
                      {motion.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT: BRIBERY RECORDS & QUICK DIRECTIVES */}
          <div className="lg:col-span-4 flex flex-col gap-space-lg">
            
            {/* LATEST BRIBERY LEDGER SNAPSHOT */}
            <div className="p-space-lg rounded-2xl bg-[#F3ECDB] border border-[#D9CFB8] shadow-xs flex flex-col gap-space-md">
              <div className="flex items-center justify-between pb-space-sm border-b border-[#D9CFB8]">
                <h3 className="font-headline-sm text-headline-sm text-[#001854] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#8a5100]">cookie</span>
                  <span>Bribery Registry</span>
                </h3>
                <button
                  onClick={() => onNavigateTab('bribery-record')}
                  className="font-label-button text-xs text-[#1b2f6b] hover:underline cursor-pointer"
                >
                  Full Docket →
                </button>
              </div>

              <p className="font-body-sm text-xs text-[#454650]">
                All unsolicited complimentary flatbreads, extra pickles, and hospitality drinks strictly logged under Code of Conduct Rule 7.
              </p>

              <div className="flex flex-col gap-2.5">
                {briberyRecords.slice(0, 3).map(item => (
                  <div key={item.id} className="p-3 rounded-lg bg-[#F7F0DF] border border-[#D9CFB8] flex flex-col gap-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#001854]">{item.venueName}</span>
                      <span className="font-mono text-[#8a5100] font-semibold">{item.estimatedValue}</span>
                    </div>
                    <div className="font-body-sm text-xs text-[#1e1b17]">
                      "{item.giftItem}"
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-[#454650] pt-1 border-t border-[#D9CFB8]/40">
                      <span>Recipient: {item.recipientChair}</span>
                      <span className="font-label-ledger uppercase text-[#1E7A4E] font-bold">
                        {item.committeeVerdict}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MOCK COMMITTEE EDICT */}
            <div className="p-space-lg rounded-2xl bg-[#1b2f6b] text-white shadow-md flex flex-col gap-3">
              <div className="flex items-center gap-2 text-[#ffa538]">
                <span className="material-symbols-outlined text-lg">gavel</span>
                <span className="font-label-ledger text-xs uppercase tracking-wider font-bold">
                  Standing Order #14
                </span>
              </div>
              <p className="font-title-editorial text-base italic leading-relaxed">
                "No Chair shall grant the Approved status upon an establishment whose walking isochrone exceeds fifteen minutes from Crown Square without explicit dispensation from the High Bench."
              </p>
              <span className="font-label-ledger text-[10px] text-white/70 uppercase tracking-widest text-right">
                — Enacted 1888, Re-ratified 2026
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
