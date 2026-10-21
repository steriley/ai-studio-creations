/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { VenueDocketEditor } from './components/VenueDocketEditor';
import { VenuesList } from './components/VenuesList';
import { Dashboard } from './components/Dashboard';
import { BriberyRecordView } from './components/BriberyRecordView';
import { PendingMotionsView } from './components/PendingMotionsView';
import { SuggestionsView } from './components/SuggestionsView';
import { UsersView } from './components/UsersView';
import { AccountView } from './components/AccountView';
import { NewVenueModal } from './components/NewVenueModal';
import { INITIAL_VENUES, INITIAL_BRIBERY_RECORDS, INITIAL_MOTIONS, INITIAL_SUGGESTIONS } from './data/mockVenues';
import { Venue, BriberyItem, CommitteeMotion, VenueSuggestion } from './types';

export default function App() {
  const [venues, setVenues] = useState<Venue[]>(INITIAL_VENUES);
  const [briberyRecords, setBriberyRecords] = useState<BriberyItem[]>(INITIAL_BRIBERY_RECORDS);
  const [motions, setMotions] = useState<CommitteeMotion[]>(INITIAL_MOTIONS);
  const [suggestions, setSuggestions] = useState<VenueSuggestion[]>(INITIAL_SUGGESTIONS);
  
  // By default, show the exact screen requested by the user: Armenian Taverna Venue Docket!
  const [currentTab, setCurrentTab] = useState<string>('venues');
  const [activeVenueId, setActiveVenueId] = useState<string | null>('reg-029');
  const [isNewVenueOpen, setIsNewVenueOpen] = useState<boolean>(false);

  const activeVenue = venues.find(v => v.id === activeVenueId) || venues[0];

  const handleUpdateVenue = (updatedVenue: Venue) => {
    setVenues(prev => prev.map(v => v.id === updatedVenue.id ? updatedVenue : v));
  };

  const handleDeleteVenue = (venueId: string) => {
    setVenues(prev => prev.filter(v => v.id !== venueId));
    setActiveVenueId(null);
    setCurrentTab('venues');
  };

  const handleAddNewVenue = (newVenue: Venue) => {
    setVenues(prev => [newVenue, ...prev]);
    setActiveVenueId(newVenue.id);
  };

  const handleCosignMotion = (motionId: string) => {
    setMotions(prev => prev.map(m => {
      if (m.id === motionId) {
        return {
          ...m,
          status: 'Ratified & Enacted',
          notes: `${m.notes} [Cosigned by Ste Riley]`,
        };
      }
      return m;
    }));

    // If motion was for Armenian Taverna, also update venue
    const motion = motions.find(m => m.id === motionId);
    if (motion && motion.venueId) {
      setVenues(prev => prev.map(v => {
        if (v.id === motion.venueId) {
          if (motion.proposedTier) {
            return { ...v, tier: motion.proposedTier };
          }
          if (motion.motionType === 'Inspection Seconding') {
            return {
              ...v,
              dualChairConcord: {
                ...v.dualChairConcord,
                affirmedCount: 2,
                secondSignatory: {
                  name: 'Dame Clara Finch (Second Chair)',
                  role: 'Second Chair Cosigner',
                  time: '13:00 BST',
                  affirmed: true,
                },
                latestVerifiedInspection: 'Verified today via ratified motion',
              }
            };
          }
        }
        return v;
      }));
    }
  };

  const handleAddBribery = (item: BriberyItem) => {
    setBriberyRecords(prev => [item, ...prev]);
  };

  const handleAcceptSuggestion = (sug: VenueSuggestion) => {
    setSuggestions(prev => prev.map(s => s.id === sug.id ? { ...s, status: 'Accepted to Registry' as const } : s));
    
    // Auto enrol into venues
    const regNum = Math.floor(100 + Math.random() * 900);
    const newVenue: Venue = {
      id: `reg-${regNum}`,
      registryCode: `REG-${regNum} · MCR-CENTRAL`,
      name: sug.name,
      slug: sug.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      tag: 'Enrolled via Citizen Petition',
      ledgerNumber: `#${regNum}`,
      district: 'Greater Manchester Central',
      subhead: `Autonomous Sovereign Ledger Entry #${regNum}. Registered via citizen petition from ${sug.suggestedBy}.`,
      cuisine: 'other',
      costGrade: 2,
      lunchSpecial: `Signature order pending inspection. Reason: ${sug.reason}`,
      pullQuote: sug.reason,
      websiteUrl: '',
      imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200',
      imagePlateTitle: `${sug.name} Facade`,
      imagePlateDescription: 'Preliminary photographic record.',
      address: sug.address,
      geoCoordinates: '53.480000 N, -2.240000 W',
      isManualGeo: true,
      customMapUrl: '',
      walkTimeMin: 8,
      walkDistanceMiles: 0.35,
      walkVia: 'via Albert Sq',
      isWalkEstimated: true,
      tier: 'assessed',
      lastAmended: 'Just now',
      lastAmendedBy: 'Presiding Chair Ste Riley',
      dualChairConcord: {
        targetQuorum: 2,
        affirmedCount: 0,
        firstSignatory: { name: 'Awaiting First Chair', role: 'Chair', affirmed: false },
        secondSignatory: { name: 'Awaiting Second Chair', role: 'Chair', affirmed: false },
        latestVerifiedInspection: 'Pending initial visit',
      },
      auditLog: [],
      isPermanentlyClosed: false,
    };

    setVenues(prev => [newVenue, ...prev]);
  };

  const handleDismissSuggestion = (id: string) => {
    setSuggestions(prev => prev.map(s => s.id === id ? { ...s, status: 'Disdainfully Dismissed' as const } : s));
  };

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    if (tab !== 'venues') {
      setActiveVenueId(null);
    } else {
      // If switching to venues tab directly, show the Armenian Taverna docket or list
      // If activeVenueId was null, keep list; if not, show docket
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF6EA] flex flex-col text-[#1e1b17] font-body-md antialiased selection:bg-[#ffa538]/30 selection:text-[#001854]">
      {/* GLOBAL HEADER */}
      <Header
        currentTab={activeVenueId ? 'venues' : currentTab}
        onTabChange={(tab) => {
          if (tab === 'venues') {
            setActiveVenueId('reg-029'); // Return directly to the reference screen
            setCurrentTab('venues');
          } else {
            handleTabChange(tab);
          }
        }}
      />

      {/* SCREEN ROUTING */}
      <main className="flex-1">
        {/* If an active venue is selected in the venues section, show the exact reference docket screen */}
        {activeVenueId && activeVenue ? (
          <VenueDocketEditor
            venue={activeVenue}
            onSave={handleUpdateVenue}
            onBack={() => setActiveVenueId(null)}
            onDelete={handleDeleteVenue}
          />
        ) : currentTab === 'venues' ? (
          <VenuesList
            venues={venues}
            onSelectVenue={(v) => setActiveVenueId(v.id)}
            onNewVenue={() => setIsNewVenueOpen(true)}
          />
        ) : currentTab === 'dashboard' ? (
          <Dashboard
            venues={venues}
            briberyRecords={briberyRecords}
            motions={motions}
            onSelectVenue={(v) => {
              setActiveVenueId(v.id);
              setCurrentTab('venues');
            }}
            onNavigateTab={handleTabChange}
          />
        ) : currentTab === 'bribery-record' ? (
          <BriberyRecordView
            records={briberyRecords}
            onAddRecord={handleAddBribery}
          />
        ) : currentTab === 'pending' ? (
          <PendingMotionsView
            motions={motions}
            onCosignMotion={handleCosignMotion}
          />
        ) : currentTab === 'suggestions' ? (
          <SuggestionsView
            suggestions={suggestions}
            onAcceptSuggestion={handleAcceptSuggestion}
            onDismissSuggestion={handleDismissSuggestion}
            onAddSuggestion={(s) => setSuggestions(prev => [s, ...prev])}
          />
        ) : currentTab === 'users' ? (
          <UsersView />
        ) : currentTab === 'account' ? (
          <AccountView />
        ) : (
          <VenuesList
            venues={venues}
            onSelectVenue={(v) => setActiveVenueId(v.id)}
            onNewVenue={() => setIsNewVenueOpen(true)}
          />
        )}
      </main>

      {/* NEW VENUE MODAL */}
      <NewVenueModal
        isOpen={isNewVenueOpen}
        onClose={() => setIsNewVenueOpen(false)}
        onAddVenue={handleAddNewVenue}
      />

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
