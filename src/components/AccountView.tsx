import React, { useState } from 'react';
import { CHAIR_STE_RILEY } from '../data/mockVenues';

export const AccountView: React.FC = () => {
  const [delegationActive, setDelegationActive] = useState(false);
  const [digestEmail, setDigestEmail] = useState('steriley228@gmail.com');
  const [savedNotification, setSavedNotification] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  return (
    <div className="w-full pt-20 bg-[#FBF6EA] min-h-screen">
      <div className="max-w-[1000px] mx-auto px-margin-desktop py-space-xl flex flex-col gap-space-xl">
        
        {/* HEADER */}
        <div className="flex flex-col gap-1 pb-space-lg border-b border-[#D9CFB8]">
          <span className="font-label-ledger text-label-ledger uppercase text-[#8a5100] tracking-widest font-bold">
            Chair Signatory Profile & Seal Registry
          </span>
          <h1 className="font-headline-xl text-headline-xl text-[#001854] font-bold tracking-tight">
            Presiding Chair Credentials
          </h1>
          <p className="font-body-md text-body-md text-[#454650]">
            Official state of Presiding Chair Ste Riley's sovereign credentials and warrant of office.
          </p>
        </div>

        {savedNotification && (
          <div className="p-3 bg-[#E8F5EE] border border-[#1E7A4E] text-[#1E7A4E] rounded-xl text-sm font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-base">check_circle</span>
            <span>Chair credentials and alert preferences ratified.</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg items-start">
          
          {/* PROFILE CARD */}
          <div className="bg-[#F3ECDB] border border-[#D9CFB8] rounded-xl p-space-lg shadow-xs flex flex-col items-center text-center gap-3">
            <div className="relative">
              <img
                src={CHAIR_STE_RILEY.avatarUrl}
                alt={CHAIR_STE_RILEY.name}
                className="w-24 h-24 rounded-full object-cover border-2 border-[#D9CFB8] shadow-md"
              />
              <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#1b2f6b] text-white flex items-center justify-center text-xs border border-white">
                <span className="material-symbols-outlined text-xs">verified</span>
              </span>
            </div>

            <div className="flex flex-col">
              <h2 className="font-headline-sm text-xl text-[#001854] font-bold">
                {CHAIR_STE_RILEY.name}
              </h2>
              <span className="font-label-ledger text-xs text-[#8a5100] uppercase font-bold tracking-wider">
                {CHAIR_STE_RILEY.title}
              </span>
              <span className="font-mono text-[11px] text-[#454650] mt-1">
                Warrant: {CHAIR_STE_RILEY.warrantNumber}
              </span>
            </div>

            <div className="w-full pt-3 border-t border-[#D9CFB8] flex flex-col gap-1 text-xs text-[#454650]">
              <div className="flex justify-between">
                <span>Jurisdiction:</span>
                <span className="font-semibold text-[#1e1b17]">MCR Central</span>
              </div>
              <div className="flex justify-between">
                <span>Session:</span>
                <span className="font-semibold text-[#1e1b17]">2026 Michaelmas</span>
              </div>
              <div className="flex justify-between">
                <span>Voting Quorum Weight:</span>
                <span className="font-semibold text-[#1e1b17]">1.0 (Full Prerogative)</span>
              </div>
            </div>
          </div>

          {/* SETTINGS FORM */}
          <div className="md:col-span-2 bg-[#F3ECDB] border border-[#D9CFB8] rounded-xl p-space-lg shadow-xs flex flex-col gap-space-md">
            <div className="flex items-center justify-between pb-space-sm border-b border-[#D9CFB8]">
              <h3 className="font-headline-sm text-headline-sm text-[#001854] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#8a5100]">settings</span>
                <span>Registry Preferences & Dispatch Dispatching</span>
              </h3>
            </div>

            <form onSubmit={handleSave} className="flex flex-col gap-space-md text-sm">
              <div>
                <label className="block font-label-ledger text-xs uppercase text-[#454650] mb-1">
                  Official Gazette Alert Email
                </label>
                <input
                  type="email"
                  value={digestEmail}
                  onChange={(e) => setDigestEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#D9CFB8] rounded-lg font-mono text-sm text-[#1e1b17] focus:outline-none"
                />
                <span className="text-[11px] text-[#454650]">
                  Immediate dispatch upon second-chair cosigning of active motions.
                </span>
              </div>

              <div className="p-3 bg-[#F7F0DF] rounded-lg border border-[#D9CFB8] flex items-center justify-between gap-3">
                <div className="flex flex-col">
                  <span className="font-label-button text-sm text-[#001854] font-bold">
                    Temporary Chair Delegation Mode
                  </span>
                  <span className="text-[11px] text-[#454650]">
                    Allows Dame Clara Finch to cast decisive casting votes during official luncheons.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={delegationActive}
                  onChange={(e) => setDelegationActive(e.target.checked)}
                  className="w-5 h-5 rounded border-[#D9CFB8] text-[#1b2f6b] cursor-pointer"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-[#1b2f6b] text-white hover:bg-[#001854] font-label-button text-xs font-bold shadow-xs cursor-pointer"
                >
                  Save Account Directives
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};
