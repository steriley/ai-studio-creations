import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#F7F0DF] border-t border-[#D9CFB8] py-space-lg mt-auto">
      <div className="max-w-[1440px] mx-auto px-margin-desktop flex flex-col md:flex-row items-center justify-between gap-space-sm text-[#454650]">
        <div className="flex items-center gap-space-sm flex-wrap justify-center md:justify-start">
          <span className="font-title-editorial text-title-editorial text-[#001854] font-bold">
            MCR Lunch Club
          </span>
          <span className="text-[#D9CFB8]">—</span>
          <span className="font-body-sm text-body-sm">
            By Warrant of the Sovereign Food Committee, Manchester Registry
          </span>
        </div>

        <div className="flex items-center gap-space-md text-xs">
          <span className="font-label-ledger text-label-ledger uppercase tracking-wider text-[#8a5100] font-bold">
            Archival Session 2026-Michaelmas
          </span>
          <span className="font-body-sm text-body-sm text-[#454650]">
            © 2026 Sovereign Food Ledger
          </span>
        </div>
      </div>
    </footer>
  );
};
