import React, { useState } from 'react';
import { Venue, TierStatus } from '../types';

interface VenuesListProps {
  venues: Venue[];
  onSelectVenue: (venue: Venue) => void;
  onNewVenue: () => void;
}

export const VenuesList: React.FC<VenuesListProps> = ({ venues, onSelectVenue, onNewVenue }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'distance' | 'name' | 'tier'>('distance');

  const filteredVenues = venues.filter((venue) => {
    const matchesSearch = 
      venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.registryCode.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTier = selectedTier === 'all' || venue.tier === selectedTier;

    return matchesSearch && matchesTier;
  }).sort((a, b) => {
    if (sortBy === 'distance') return a.walkTimeMin - b.walkTimeMin;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return a.tier.localeCompare(b.tier);
  });

  const getTierBadge = (tier: TierStatus) => {
    switch (tier) {
      case 'approved':
        return { label: 'Approved (Hall of Fame)', bg: 'bg-[#E8F5EE]', text: 'text-[#1E7A4E]', dot: 'bg-[#1E7A4E]' };
      case 'consideration':
        return { label: 'Under Active Consideration', bg: 'bg-[#FEF5E7]', text: 'text-[#C27803]', dot: 'bg-[#C27803]' };
      case 'assessed':
        return { label: 'To Be Assessed', bg: 'bg-[#F0F2F5]', text: 'text-[#5A6474]', dot: 'bg-[#5A6474]' };
      case 'reluctant':
        return { label: 'If We Must (Reluctant)', bg: 'bg-[#F7EEF8]', text: 'text-[#7C3A82]', dot: 'bg-[#7C3A82]' };
      case 'rejected':
        return { label: 'Rejected / Expelled', bg: 'bg-[#FDF0F0]', text: 'text-[#B92B27]', dot: 'bg-[#B92B27]' };
      case 'shuttered':
        return { label: 'Decommissioned', bg: 'bg-[#F4F4F5]', text: 'text-[#71717A]', dot: 'bg-[#71717A]' };
    }
  };

  const getCostLabel = (cost: number) => {
    if (cost === 1) return '£ · Quick (<£10)';
    if (cost === 2) return '££ · Par (£10-£20)';
    return '£££ · Payday (>£20)';
  };

  return (
    <div className="w-full pt-20 bg-[#FBF6EA] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-margin-desktop py-space-xl">
        
        {/* MASTHEAD HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md pb-space-lg mb-space-lg border-b border-[#D9CFB8]">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="font-label-ledger text-label-ledger uppercase text-[#8a5100] tracking-widest font-bold">
                Archival Session 2026-Michaelmas · Official Roll
              </span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-[#001854] font-bold tracking-tight">
              Sovereign Venues Ledger
            </h1>
            <p className="font-body-md text-body-md text-[#454650] max-w-2xl">
              The ratified catalog of Manchester lunchtime eating houses, chophouses, vaults, and noodle dispensaries. Subject to strict dual-chair inspection.
            </p>
          </div>

          <div className="flex items-center gap-space-sm shrink-0">
            <button
              onClick={onNewVenue}
              className="px-space-md py-2.5 rounded-lg bg-[#1b2f6b] text-white hover:bg-[#001854] font-label-button text-label-button shadow-sm flex items-center gap-1.5 transition-all active:scale-[0.99] cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">add_circle</span>
              <span>New Venue Decree</span>
            </button>
          </div>
        </div>

        {/* SEARCH & FILTER CONTROLS */}
        <div className="bg-[#F3ECDB] border border-[#D9CFB8] rounded-xl p-space-md shadow-xs mb-space-lg flex flex-col gap-space-md">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-md">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#454650] text-lg">
                search
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search ledger e.g. Armenian Taverna, Dishoom, Ramen, Slice..."
                className="w-full pl-10 pr-space-md py-2.5 bg-white border border-[#D9CFB8] rounded-lg font-body-md text-sm text-[#1e1b17] focus:outline-none focus:border-[#1b2f6b]"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#454650] hover:text-[#1e1b17]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="font-label-ledger text-xs uppercase text-[#454650] font-bold">Sort:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none pl-3 pr-8 py-2 bg-white border border-[#D9CFB8] rounded-lg font-body-sm text-xs text-[#1e1b17] cursor-pointer focus:outline-none"
                >
                  <option value="distance">Walk Time (Spinningfields)</option>
                  <option value="name">Alphabetical</option>
                  <option value="tier">Judicial Tier</option>
                </select>
                <span className="material-symbols-outlined pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#454650]">
                  expand_more
                </span>
              </div>
            </div>
          </div>

          {/* VERDICT TIER PILL FILTERS */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-[#D9CFB8]/60">
            <span className="font-label-ledger text-[11px] uppercase text-[#454650] font-bold mr-1">
              Judicial Tier:
            </span>
            {[
              { id: 'all', label: 'All Registered' },
              { id: 'approved', label: 'Approved (Hall of Fame)' },
              { id: 'consideration', label: 'Under Consideration' },
              { id: 'assessed', label: 'To Be Assessed' },
              { id: 'reluctant', label: 'Reluctantly Tolerated' },
              { id: 'rejected', label: 'Rejected' },
            ].map(tier => {
              const isActive = selectedTier === tier.id;
              return (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  className={`px-3 py-1 rounded-full text-xs font-label-ledger uppercase tracking-wider font-semibold border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#1b2f6b] text-white border-[#001854] shadow-xs'
                      : 'bg-[#FBF6EA] text-[#454650] border-[#D9CFB8] hover:bg-[#F7F0DF]'
                  }`}
                >
                  {tier.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* VENUES GRID */}
        {filteredVenues.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
            {filteredVenues.map((venue) => {
              const tierInfo = getTierBadge(venue.tier);
              return (
                <div
                  key={venue.id}
                  onClick={() => onSelectVenue(venue)}
                  className="bg-[#F3ECDB] border border-[#D9CFB8] rounded-xl overflow-hidden shadow-xs hover:shadow-md hover:border-[#8a5100]/60 transition-all flex flex-col cursor-pointer group"
                >
                  {/* CARD IMAGE HEADER */}
                  <div className="relative h-44 bg-[#e1d9d2] overflow-hidden">
                    <img
                      src={venue.imageUrl || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600"}
                      alt={venue.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001854]/80 via-transparent to-transparent flex items-end justify-between p-3">
                      <span className="font-label-ledger text-[10px] text-white font-mono uppercase bg-[#001854]/80 px-2 py-0.5 rounded backdrop-blur-xs">
                        {venue.registryCode}
                      </span>
                      <span className="font-label-ledger text-[10px] text-[#ffa538] font-bold uppercase bg-[#001854]/80 px-2 py-0.5 rounded backdrop-blur-xs">
                        {venue.tag}
                      </span>
                    </div>
                  </div>

                  {/* CARD BODY */}
                  <div className="p-space-md flex flex-col flex-1 justify-between gap-3">
                    <div>
                      {/* TIER BADGE */}
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full ${tierInfo.bg} ${tierInfo.text} font-label-ledger text-[10px] uppercase tracking-wider font-bold`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${tierInfo.dot}`}></span>
                          {tierInfo.label}
                        </span>
                        <span className="font-mono text-xs font-bold text-[#001854]">
                          {getCostLabel(venue.costGrade).split('·')[0].trim()}
                        </span>
                      </div>

                      {/* VENUE TITLE */}
                      <h3 className="font-headline-sm text-lg text-[#001854] font-bold group-hover:text-[#1b2f6b] transition-colors leading-tight">
                        {venue.name}
                      </h3>
                      <p className="font-body-sm text-xs text-[#454650] mt-1 line-clamp-2">
                        {venue.address} · {venue.district}
                      </p>

                      {/* PULL QUOTE */}
                      {venue.pullQuote && (
                        <p className="font-title-editorial text-xs italic text-[#8a5100] mt-2 line-clamp-2 border-l-2 border-[#ffa538] pl-2 py-0.5">
                          "{venue.pullQuote}"
                        </p>
                      )}
                    </div>

                    {/* METRIC FOOTER */}
                    <div className="pt-3 border-t border-[#D9CFB8] flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-[#001854] font-medium">
                        <span className="material-symbols-outlined text-sm text-[#8a5100]">directions_walk</span>
                        <span className="font-bold">{venue.walkTimeMin} min</span>
                        <span className="text-[#454650]">({venue.walkDistanceMiles} mi)</span>
                      </div>

                      <div className="flex items-center gap-1 font-label-button text-xs text-[#1b2f6b] font-bold group-hover:translate-x-0.5 transition-transform">
                        <span>Examine Docket</span>
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-[#F3ECDB] border border-[#D9CFB8]">
            <span className="material-symbols-outlined text-4xl text-[#454650]/40 mb-2">menu_book</span>
            <h3 className="font-title-editorial text-lg text-[#001854] font-bold">
              No Ledger Records Found
            </h3>
            <p className="font-body-sm text-sm text-[#454650] mt-1 max-w-md mx-auto">
              No dining establishments correspond with your search or tier filter. Clear criteria or register a new venue decree.
            </p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedTier('all'); }}
              className="mt-4 px-4 py-2 rounded-lg bg-[#1b2f6b] text-white text-xs font-label-button"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
