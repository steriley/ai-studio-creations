import React, { useState } from 'react';
import { CHAIR_STE_RILEY } from '../data/mockVenues';

interface HeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onSelectArmenianDocket?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onTabChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chairRole, setChairRole] = useState<'Ste Riley' | 'Dame Clara Finch'>('Ste Riley');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'venues', label: 'Venues' },
    { id: 'pending', label: 'Pending' },
    { id: 'suggestions', label: 'Suggestions' },
    { id: 'bribery-record', label: 'Bribery Record' },
    { id: 'users', label: 'Users' },
    { id: 'account', label: 'Account' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FBF6EA]/95 backdrop-blur-md shadow-[0_1px_8px_rgba(22,19,15,0.06)] border-b border-[#D9CFB8]">
      <div className="h-20 max-w-[1440px] mx-auto px-margin-desktop flex items-center justify-between gap-space-md">
        {/* BRAND & COMMITTEE SEAL */}
        <div className="flex items-center gap-space-lg shrink-0">
          <button 
            onClick={() => onTabChange('venues')}
            className="flex items-center gap-space-sm text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full bg-[#1b2f6b] border border-[#001854] flex items-center justify-center text-white shadow-sm shrink-0 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-lg">verified</span>
            </div>
            <div className="flex flex-col">
              <span className="font-title-editorial text-title-editorial text-[#001854] tracking-tight leading-none group-hover:text-[#1b2f6b] transition-colors">
                MCR Lunch Club
              </span>
              <span className="font-label-ledger text-label-ledger text-[#454650] uppercase tracking-wider mt-1">
                Chairs' Area — Sovereign Food Ledger
              </span>
            </div>
          </button>

          <div className="h-7 w-px bg-[#D9CFB8] hidden xl:block"></div>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden xl:flex items-center gap-1.5">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`font-label-button text-label-button px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#1b2f6b] text-white font-bold shadow-sm'
                      : 'text-[#454650] hover:text-[#1e1b17] hover:bg-[#F3ECDB]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* CHAIR PROFILE & AUTH STATUS */}
        <div className="flex items-center gap-space-md shrink-0">
          {/* Chair Indicator */}
          <div 
            onClick={() => setChairRole(r => r === 'Ste Riley' ? 'Dame Clara Finch' : 'Ste Riley')}
            title="Click to alternate presiding chair signatory"
            className="flex items-center gap-space-sm pl-space-sm py-1 pr-2 rounded-full bg-[#F3ECDB] border border-[#D9CFB8] cursor-pointer hover:border-[#8a5100]/60 transition-colors shadow-xs"
          >
            <img
              alt={chairRole}
              className="w-8 h-8 rounded-full object-cover border border-[#D9CFB8] shrink-0"
              src={CHAIR_STE_RILEY.avatarUrl}
            />
            <div className="flex flex-col pr-space-md hidden sm:flex">
              <span className="font-body-sm text-body-sm font-semibold text-[#1e1b17] leading-tight flex items-center gap-1">
                {chairRole}
                <span className="material-symbols-outlined text-xs text-[#8a5100]">swap_horiz</span>
              </span>
              <span className="font-label-ledger text-label-ledger text-[#8a5100] leading-tight uppercase font-bold">
                Presiding Chair
              </span>
            </div>
          </div>

          {/* Sign Out or Registry Action */}
          <button
            onClick={() => onTabChange('venues')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#D9CFB8] bg-[#F7F0DF] hover:bg-[#F3ECDB] font-label-button text-label-button text-[#1e1b17] transition-colors cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-sm leading-none text-[#8a5100]">history_edu</span>
            <span className="hidden md:inline">Ledger</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-10 h-10 rounded-lg flex items-center justify-center text-[#1e1b17] hover:bg-[#F3ECDB] border border-[#D9CFB8] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* MOBILE EXPANDED MENU */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FBF6EA] border-b border-[#D9CFB8] px-4 py-3 flex flex-col gap-1 shadow-lg animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                setMobileMenuOpen(false);
              }}
              className={`text-left font-label-button text-label-button px-3 py-2 rounded-lg transition-colors ${
                currentTab === item.id
                  ? 'bg-[#1b2f6b] text-white font-bold'
                  : 'text-[#454650] hover:bg-[#F3ECDB]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
