import React, { useState } from 'react';
import { Venue, TierStatus, CostGrade } from '../types';
import { PublicDocketModal } from './PublicDocketModal';
import { AuditHistoryModal } from './AuditHistoryModal';

interface VenueDocketEditorProps {
  venue: Venue;
  onSave: (updatedVenue: Venue) => void;
  onBack: () => void;
  onDelete: (venueId: string) => void;
}

export const VenueDocketEditor: React.FC<VenueDocketEditorProps> = ({
  venue: initialVenue,
  onSave,
  onBack,
  onDelete,
}) => {
  const [formData, setFormData] = useState<Venue>({ ...initialVenue });
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  
  // Modals state
  const [showPublicDocket, setShowPublicDocket] = useState<boolean>(false);
  const [showAuditHistory, setShowAuditHistory] = useState<boolean>(false);
  const [showCloseModal, setShowCloseModal] = useState<boolean>(false);
  const [showExpungeModal, setShowExpungeModal] = useState<boolean>(false);
  const [expungeConfirmText, setExpungeConfirmText] = useState<string>('');
  
  // Interactive mini widgets
  const [selectedProposedTier, setSelectedProposedTier] = useState<string>('');
  const [tierProposalNotice, setTierProposalNotice] = useState<string | null>(null);
  const [isRerouting, setIsRerouting] = useState<boolean>(false);
  const [cropStyle, setCropStyle] = useState<'cover' | 'contain' | 'center'>('cover');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleChange = (field: keyof Venue, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    setIsDirty(true);
  };

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      const now = new Date();
      const updated: Venue = {
        ...formData,
        lastAmended: `${now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}, ${now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`,
        lastAmendedBy: 'Presiding Chair Ste Riley',
        auditLog: [
          {
            id: `aud-${Date.now()}`,
            date: `${now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}, ${now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`,
            author: 'Ste Riley',
            action: 'Docket Ratified',
            details: 'Presiding Chair saved modifications to registry docket.',
            motionType: 'metadata',
          },
          ...(formData.auditLog || []),
        ],
      };
      setFormData(updated);
      onSave(updated);
      setSaveStatus('saved');
      setIsDirty(false);
      triggerToast('Docket updates formally ratified and recorded into the ledger');
      setTimeout(() => setSaveStatus('idle'), 2500);
    }, 700);
  };

  const handleDiscard = () => {
    if (window.confirm(`Discard uncommitted changes to the ${formData.name} docket?`)) {
      setFormData({ ...initialVenue });
      setIsDirty(false);
      triggerToast('Uncommitted draft discarded');
    }
  };

  const handleAffirmInspection = () => {
    const isCurrentlyAffirmed = formData.dualChairConcord.secondSignatory.affirmed;
    
    if (isCurrentlyAffirmed) {
      triggerToast('Quorum is already fully second-signed for today');
      return;
    }

    const now = new Date();
    const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')} BST`;

    const updatedConcord = {
      ...formData.dualChairConcord,
      affirmedCount: 2,
      secondSignatory: {
        name: 'Dame Clara Finch (Second Chair)',
        role: 'Second Chair Cosigner',
        time: timeStr,
        affirmed: true,
      },
      latestVerifiedInspection: `Ratified today by Ste Riley & Dame Clara Finch at ${timeStr}`,
    };

    const newAuditLog = [
      {
        id: `aud-${Date.now()}`,
        date: `${now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}, ${timeStr}`,
        author: 'Dame Clara Finch',
        action: 'Quorum Reached',
        details: 'Second Chair signed today\'s inspection docket. Verification complete.',
        motionType: 'inspection' as const,
      },
      ...(formData.auditLog || []),
    ];

    setFormData(prev => ({
      ...prev,
      dualChairConcord: updatedConcord,
      auditLog: newAuditLog,
    }));
    setIsDirty(true);
    triggerToast('Dual-Chair Concord reached! Daily Quorum legally ratified.');
  };

  const handleProposeTier = () => {
    if (!selectedProposedTier) {
      alert('Please select an official tier before placing proposal upon the table.');
      return;
    }

    const tierLabels: Record<string, string> = {
      approved: 'Approved (Hall of Fame)',
      consideration: 'Under Active Consideration',
      assessed: 'To Be Assessed',
      reluctant: 'If We Must (Reluctant Tier)',
      rejected: 'Rejected / Expelled',
    };

    const targetLabel = tierLabels[selectedProposedTier] || selectedProposedTier;

    // If upgrading to approved without quorum
    if (selectedProposedTier === 'approved' && formData.dualChairConcord.affirmedCount < 2) {
      alert('Rule 4.B Violation: Promotion to "Approved" cannot take effect solely by motion. It mandates the dual-verified inspection from two independent Chairs.');
    }

    setTierProposalNotice(`Motion tabled by Chair Ste Riley: Elevate to ${targetLabel}. Awaiting cosignature.`);
    
    // Also record in audit log
    const now = new Date();
    const newLog = {
      id: `aud-mot-${Date.now()}`,
      date: `${now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}, ${now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`,
      author: 'Ste Riley',
      action: 'Tier Motion Tabled',
      details: `Formal motion introduced to alter status to "${targetLabel}".`,
      motionType: 'tier' as const,
    };

    // If motion accepted directly or updated:
    setFormData(prev => ({
      ...prev,
      tier: selectedProposedTier as TierStatus,
      auditLog: [newLog, ...(prev.auditLog || [])],
    }));
    setIsDirty(true);
    triggerToast(`Tier motion to "${targetLabel}" tabled and applied to draft.`);
  };

  const handleReroute = () => {
    setIsRerouting(true);
    setTimeout(() => {
      setIsRerouting(false);
      setFormData(prev => ({
        ...prev,
        walkTimeMin: Math.max(3, prev.walkTimeMin),
        isWalkEstimated: false,
      }));
      setIsDirty(true);
      triggerToast('Isochrone graph recalculation complete: Ped-way obstacles indexed.');
    }, 900);
  };

  const handleDecommission = () => {
    setFormData(prev => ({
      ...prev,
      isPermanentlyClosed: true,
      tier: 'shuttered',
    }));
    setShowCloseModal(false);
    setIsDirty(true);
    triggerToast(`${formData.name} has been marked as decommissioned / permanently closed.`);
  };

  const handleExpunge = () => {
    if (expungeConfirmText !== 'EXPUNGE') {
      alert('Please type "EXPUNGE" in capital letters to confirm permanent deletion.');
      return;
    }
    setShowExpungeModal(false);
    onDelete(formData.id);
  };

  const getTierDisplay = (tier: TierStatus) => {
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
        return { label: 'Decommissioned / Shuttered', bg: 'bg-[#F4F4F5]', text: 'text-[#71717A]', dot: 'bg-[#71717A]' };
    }
  };

  const currentTierInfo = getTierDisplay(formData.tier);

  return (
    <div className="w-full pt-20 bg-[#FBF6EA] min-h-screen">
      {/* FLOATING TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#001854] text-white text-xs font-label-ledger uppercase tracking-wider py-2.5 px-5 rounded-full shadow-2xl flex items-center gap-2 border border-[#ffa538]/40 animate-bounce">
          <span className="material-symbols-outlined text-sm text-[#ffa538]">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-[1440px] mx-auto px-margin-desktop py-space-xl">
        <div className="flex flex-col w-full pb-24">

          {/* BREADCRUMB & METADATA OVERLINE */}
          <div className="flex flex-wrap items-center justify-between gap-space-sm mb-space-sm">
            <div className="flex items-center gap-space-xs font-label-ledger text-label-ledger uppercase tracking-wider text-[#454650]">
              <button 
                onClick={onBack}
                className="hover:text-[#001854] transition-colors cursor-pointer flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-xs">arrow_back</span>
                Venues Ledger
              </button>
              <span className="text-[#D9CFB8]">/</span>
              <span className="text-[#8a5100] font-bold">{formData.name}</span>
              <span className="text-[#D9CFB8]">/</span>
              <span className="text-[#5A6474] font-semibold">{formData.registryCode}</span>
            </div>

            <div className="flex items-center gap-space-xs text-[#454650] font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-sm leading-none text-[#8a5100]">history_edu</span>
              <span>
                Last amended <strong>{formData.lastAmended}</strong> by {formData.lastAmendedBy}
              </span>
            </div>
          </div>

          {/* MASTHEAD TITLE & HIGH-LEVEL ACTIONS ROW */}
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-space-lg pb-space-lg mb-space-xl border-b border-[#D9CFB8]">
            <div className="flex flex-col gap-space-xs">
              <div className="flex flex-wrap items-center gap-space-sm">
                <h1 className="font-headline-xl text-headline-xl text-[#001854] font-bold tracking-tight">
                  {formData.name}
                </h1>
                <span className={`inline-flex items-center gap-1.5 px-space-md py-1 rounded-full ${currentTierInfo.bg} ${currentTierInfo.text} font-label-ledger text-label-ledger uppercase tracking-wider font-bold`}>
                  <span className={`w-2 h-2 rounded-full ${currentTierInfo.dot}`}></span>
                  {currentTierInfo.label}
                </span>
                <span className="px-space-sm py-0.5 rounded bg-[#F3ECDB] text-[#454650] font-label-ledger text-label-ledger border border-[#D9CFB8] uppercase">
                  {formData.tag}
                </span>
                {formData.isPermanentlyClosed && (
                  <span className="px-space-sm py-0.5 rounded bg-[#B92B27] text-white font-label-ledger text-label-ledger uppercase font-bold">
                    Shuttered
                  </span>
                )}
              </div>
              <p className="font-body-md text-body-md text-[#454650] max-w-3xl">
                {formData.subhead}
              </p>
            </div>

            {/* ACTION BUTTON GROUP */}
            <div className="flex flex-wrap items-center gap-space-sm shrink-0">
              <button 
                type="button"
                onClick={() => setShowPublicDocket(true)}
                className="inline-flex items-center gap-1.5 px-space-md py-space-sm rounded-lg border border-[#D9CFB8] bg-[#F7F0DF] hover:bg-[#F3ECDB] text-[#001854] font-label-button text-label-button transition-colors shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">open_in_new</span>
                <span>View Public Docket</span>
              </button>

              <button 
                type="button"
                onClick={() => setShowAuditHistory(true)}
                className="inline-flex items-center gap-1.5 px-space-md py-space-sm rounded-lg border border-[#D9CFB8] bg-[#F7F0DF] hover:bg-[#F3ECDB] text-[#1e1b17] font-label-button text-label-button transition-colors shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">receipt_long</span>
                <span>
                  Audit History{' '}
                  <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-[#f5ece5] font-mono">
                    {formData.auditLog ? formData.auditLog.length : 0}
                  </span>
                </span>
              </button>

              <button 
                type="button"
                onClick={() => setShowCloseModal(true)}
                className="inline-flex items-center gap-1.5 px-space-md py-space-sm rounded-lg border border-[#B92B27]/40 bg-[#FDF0F0] text-[#B92B27] hover:bg-[#B92B27] hover:text-white font-label-button text-label-button transition-all shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">door_front</span>
                <span>Mark Permanently Closed</span>
              </button>
            </div>
          </div>

          {/* MAIN 2-COLUMN DOSSIER GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">

            {/* ========================================== */}
            {/* LEFT COLUMN: PRIMARY DOSSIER (~65% / 8 cols) */}
            {/* ========================================== */}
            <div className="lg:col-span-8 flex flex-col gap-space-xl min-w-0">

              {/* CARD 1: VENUE BASICS */}
              <section className="bg-[#F3ECDB] border border-[#D9CFB8] rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
                <div className="flex items-center justify-between pb-space-sm border-b border-[#D9CFB8]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#001854]">domain</span>
                    <h2 className="font-headline-sm text-headline-sm text-[#001854]">Venue Basics</h2>
                  </div>
                  <span className="font-label-ledger text-label-ledger uppercase text-[#454650] font-bold">
                    Section I · Registry Metadata
                  </span>
                </div>

                {/* Legal Title */}
                <div className="flex flex-col gap-space-sm">
                  <label className="font-label-button text-label-button text-[#1e1b17] uppercase tracking-wider" htmlFor="venueName">
                    Venue Legal/Public Title <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <input
                    id="venueName"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full px-space-md py-2.5 bg-white border border-[#D9CFB8] focus:border-[#1b2f6b] focus:outline-none rounded-lg font-body-md text-[#1e1b17] text-base transition-colors"
                  />
                </div>

                {/* Cuisine and Cost */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  <div className="flex flex-col gap-space-sm">
                    <label className="font-label-button text-label-button text-[#1e1b17] uppercase tracking-wider" htmlFor="cuisineSelect">
                      Cuisine Tradition
                    </label>
                    <div className="relative">
                      <select
                        id="cuisineSelect"
                        value={formData.cuisine}
                        onChange={(e) => handleChange('cuisine', e.target.value)}
                        className="w-full appearance-none px-space-md py-2.5 bg-white border border-[#D9CFB8] focus:border-[#1b2f6b] focus:outline-none rounded-lg font-body-md text-[#1e1b17] text-sm cursor-pointer pr-10"
                      >
                        <option value="armenian">Armenian / Caucasian</option>
                        <option value="italian">Italian-American / Red Sauce</option>
                        <option value="british">Traditional British & Chophouse</option>
                        <option value="levantine">Levantine & Middle Eastern</option>
                        <option value="eastasian">East Asian / Broth & Noodle</option>
                        <option value="other">Other Sovereign Variant</option>
                      </select>
                      <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#454650] text-base">
                        expand_more
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-space-sm">
                    <label className="font-label-button text-label-button text-[#1e1b17] uppercase tracking-wider" htmlFor="costSelect">
                      Cost Grade Assessment
                    </label>
                    <div className="relative">
                      <select
                        id="costSelect"
                        value={formData.costGrade}
                        onChange={(e) => handleChange('costGrade', parseInt(e.target.value, 10) as CostGrade)}
                        className="w-full appearance-none px-space-md py-2.5 bg-white border border-[#D9CFB8] focus:border-[#1b2f6b] focus:outline-none rounded-lg font-body-md text-[#1e1b17] text-sm cursor-pointer pr-10"
                      >
                        <option value="1">£ — Swift Lunch (&lt; £10 per capita)</option>
                        <option value="2">££ — Sovereign Par (£10 – £20)</option>
                        <option value="3">£££ — Payday Treat / Extravaganza (&gt; £20)</option>
                      </select>
                      <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#454650] text-base">
                        expand_more
                      </span>
                    </div>
                  </div>
                </div>

                {/* Canonical URL Slug */}
                <div className="flex flex-col gap-space-xs pt-space-xs">
                  <label className="font-label-button text-label-button text-[#1e1b17] uppercase tracking-wider" htmlFor="venueSlug">
                    Canonical URL Slug
                  </label>
                  <div className="flex rounded-lg border border-[#D9CFB8] overflow-hidden bg-white">
                    <span className="px-space-md py-2.5 bg-[#F7F0DF] text-[#454650] border-r border-[#D9CFB8] font-mono text-xs select-none flex items-center">
                      /venues/
                    </span>
                    <input
                      id="venueSlug"
                      type="text"
                      value={formData.slug}
                      onChange={(e) => handleChange('slug', e.target.value)}
                      className="w-full px-space-md py-2.5 bg-transparent border-0 focus:outline-none font-mono text-sm text-[#001854]"
                    />
                  </div>
                  <span className="font-body-sm text-body-sm text-[#454650]">
                    Public routing anchor. Changes here break cached printed slips and archival bookmarks.
                  </span>
                </div>
              </section>

              {/* CARD 2: EDITORIAL & PUBLIC PROCLAMATIONS */}
              <section className="bg-[#F3ECDB] border border-[#D9CFB8] rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md relative overflow-hidden">
                <div className="absolute -right-12 -top-12 w-36 h-36 bg-[#8a5100]/5 rounded-full pointer-events-none"></div>

                <div className="flex items-center justify-between pb-space-sm border-b border-[#D9CFB8]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#8a5100]">rate_review</span>
                    <h2 className="font-headline-sm text-headline-sm text-[#001854]">Editorial & Public Proclamations</h2>
                  </div>
                  <span className="font-label-ledger text-label-ledger uppercase text-[#8a5100] font-bold">
                    Committee Endorsements
                  </span>
                </div>

                {/* EAT LIKE US (SIGNATURE PROCLAMATION) */}
                <div className="flex flex-col gap-space-sm bg-[#FBF6EA]/60 p-space-md rounded-lg border border-[#D9CFB8]">
                  <div className="flex items-center justify-between">
                    <label className="font-label-button text-label-button text-[#001854] font-bold uppercase tracking-wider flex items-center gap-1.5" htmlFor="lunchSpecial">
                      <span className="material-symbols-outlined text-sm text-[#8a5100]">stars</span>
                      Lunch Special — "Eat Like Us" Prescription
                    </label>
                    <span className="font-label-ledger text-label-ledger text-[#8a5100] uppercase font-semibold">
                      Priority Gazette Directive
                    </span>
                  </div>
                  <textarea
                    id="lunchSpecial"
                    rows={3}
                    value={formData.lunchSpecial}
                    onChange={(e) => handleChange('lunchSpecial', e.target.value)}
                    className="w-full px-space-md py-2.5 bg-white border border-[#D9CFB8] focus:border-[#1b2f6b] focus:outline-none rounded-lg font-body-md text-[#1e1b17] text-sm leading-relaxed"
                  />
                  <div className="flex items-center justify-between font-body-sm text-body-sm text-[#454650]">
                    <span>The prescribed protocol or set luncheon order displayed prominently upon the public docket.</span>
                    <span className="font-mono text-xs text-[#8a5100] font-semibold" id="specialCharCount">
                      {formData.lunchSpecial.length} chars
                    </span>
                  </div>
                </div>

                {/* EDITORIAL PULL QUOTE */}
                <div className="flex flex-col gap-space-sm">
                  <label className="font-label-button text-label-button text-[#1e1b17] uppercase tracking-wider" htmlFor="pullQuote">
                    Editorial Pull Quote (Optional Broadsheet Banner)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-[#8a5100] font-title-editorial text-2xl italic font-bold">
                      “
                    </span>
                    <input
                      id="pullQuote"
                      type="text"
                      value={formData.pullQuote}
                      onChange={(e) => handleChange('pullQuote', e.target.value)}
                      placeholder="Manchester's subterranean sanctuary for authentic Caucasian grilled meats."
                      className="w-full pl-9 pr-space-md py-2.5 bg-white border border-[#D9CFB8] focus:border-[#1b2f6b] focus:outline-none rounded-lg font-title-editorial text-title-editorial italic text-[#001854]"
                    />
                  </div>
                  <span className="font-body-sm text-body-sm text-[#454650]">
                    Displayed in bold broadsheet serif under the masthead on both mobile parchment cards and desktop viewports.
                  </span>
                </div>
              </section>

              {/* CARD 3: MEDIA & ARCHIVAL LINKS */}
              <section className="bg-[#F3ECDB] border border-[#D9CFB8] rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
                <div className="flex items-center justify-between pb-space-sm border-b border-[#D9CFB8]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#001854]">perm_media</span>
                    <h2 className="font-headline-sm text-headline-sm text-[#001854]">Media & Archival Records</h2>
                  </div>
                  <span className="font-label-ledger text-label-ledger uppercase text-[#454650] font-bold">
                    Plate & Telemetry
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  <div className="flex flex-col gap-space-sm">
                    <label className="font-label-button text-label-button text-[#1e1b17] uppercase tracking-wider" htmlFor="websiteUrl">
                      Website / Official Registry Link
                    </label>
                    <div className="relative flex items-center">
                      <input
                        id="websiteUrl"
                        type="url"
                        value={formData.websiteUrl}
                        onChange={(e) => handleChange('websiteUrl', e.target.value)}
                        className="w-full pl-space-md pr-10 py-2.5 bg-white border border-[#D9CFB8] focus:border-[#1b2f6b] focus:outline-none rounded-lg font-mono text-xs text-[#1e1b17]"
                      />
                      {formData.websiteUrl && (
                        <a
                          href={formData.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute right-3 text-[#454650] hover:text-[#001854]"
                          title="Open external registry link"
                        >
                          <span className="material-symbols-outlined text-base">launch</span>
                        </a>
                      )}
                    </div>
                    <span className="font-body-sm text-body-sm text-[#454650]">
                      External menu, map portal or council licensing index.
                    </span>
                  </div>

                  <div className="flex flex-col gap-space-sm">
                    <label className="font-label-button text-label-button text-[#1e1b17] uppercase tracking-wider" htmlFor="imageUrl">
                      Masthead Image Asset (URL)
                    </label>
                    <input
                      id="imageUrl"
                      type="url"
                      value={formData.imageUrl}
                      onChange={(e) => handleChange('imageUrl', e.target.value)}
                      className="w-full px-space-md py-2.5 bg-white border border-[#D9CFB8] focus:border-[#1b2f6b] focus:outline-none rounded-lg font-mono text-xs text-[#1e1b17]"
                    />
                    <span className="font-body-sm text-body-sm text-[#454650]">
                      Direct HTTPS image link. Automated Vercel Blob pipeline pending.
                    </span>
                  </div>
                </div>

                {/* VISUAL PREVIEW BANNER */}
                <div className="mt-space-sm bg-[#F7F0DF] border border-[#D9CFB8] rounded-lg p-space-sm flex flex-col sm:flex-row gap-space-md items-center">
                  <div className="relative w-full sm:w-44 h-28 rounded-md overflow-hidden shrink-0 border border-[#D9CFB8] bg-[#e1d9d2]">
                    <img
                      className={`w-full h-full object-${cropStyle}`}
                      alt="Atmospheric underground restaurant dining room in Manchester"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuASX0XPE3ocg5AnCWshgfjkmOws0KN2jsl3LvTpO-HNyXaoEDtUaJCgYYn-x97Z2sGim_TkfSFMTwVw-TQp3nWLe_LWOqk8mWFxrVOEGE-d5phRB0G9ZK1jSARWcecImDZJSXL1NbPDU9_paxDwkPJe_rE6GH8sBunvw8bYNcqr-NkOsEh8XiV1HLPA_Y1ILWIeTXx4LQ--YihsgBN6fIRicGDa79xAuvIvF6UTGwqV9-QBMmQE5Yp_"
                    />
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-[#1e1b17]/80 backdrop-blur-xs text-[#FBF6EA] font-mono text-[10px]">
                      1200×800
                    </span>
                  </div>

                  <div className="flex flex-col justify-between py-1 w-full">
                    <div className="flex items-center gap-space-xs text-[#8a5100] font-label-ledger text-label-ledger uppercase tracking-wider font-bold">
                      <span className="material-symbols-outlined text-sm">verified</span>
                      <span>Current Archival Photographic Plate</span>
                    </div>

                    <h4 className="font-title-editorial text-title-editorial text-[#001854] font-bold">
                      {formData.imagePlateTitle}
                    </h4>
                    <p className="font-body-sm text-body-sm text-[#454650] mt-0.5">
                      {formData.imagePlateDescription}
                    </p>

                    <div className="flex gap-space-sm mt-2 items-center">
                      <button
                        type="button"
                        onClick={() => {
                          setCropStyle(prev => prev === 'cover' ? 'center' : 'cover');
                          triggerToast('Reframe crop toggled');
                        }}
                        className="font-label-button text-label-button text-[#001854] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">crop</span> Reframe Crop
                      </button>
                      <span className="text-[#D9CFB8]">·</span>
                      <button
                        type="button"
                        onClick={() => {
                          handleChange('imageUrl', '');
                          triggerToast('Archival photographic plate cleared');
                        }}
                        className="font-label-button text-label-button text-[#B92B27] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span> Clear Plate
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* CARD 4: ADMINISTRATIVE DANGER ZONE */}
              <section className="bg-[#FDF0F0]/50 border border-[#B92B27]/30 rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
                <div className="flex items-center justify-between pb-space-sm border-b border-[#B92B27]/20">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#B92B27]">gavel</span>
                    <h2 className="font-headline-sm text-headline-sm text-[#B92B27]">
                      Administrative Governance & Danger Zone
                    </h2>
                  </div>
                  <span className="font-label-ledger text-label-ledger uppercase text-[#B92B27] font-bold">
                    High Authority Area
                  </span>
                </div>

                <p className="font-body-sm text-body-sm text-[#1e1b17]">
                  Destructive ledger mutations require presiding Chair ratification. Deletions erase all logged historical inspections, bribery dockets, and committee scorecards permanently.
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md p-space-md rounded-lg bg-white border border-[#D9CFB8]">
                  <div className="flex flex-col">
                    <span className="font-label-button text-label-button text-[#1e1b17] font-bold">
                      Mark Venue as Permanently Closed
                    </span>
                    <span className="font-body-sm text-body-sm text-[#454650]">
                      Retains historical reviews in the archival museum section while barring future daily inspections.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowCloseModal(true)}
                    className="px-space-md py-space-xs rounded-lg border border-[#D9CFB8] bg-[#F7F0DF] hover:bg-[#F3ECDB] font-label-button text-label-button text-[#1e1b17] shrink-0 cursor-pointer transition-colors shadow-xs"
                  >
                    Decommission Listing
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md p-space-md rounded-lg bg-white border border-[#B92B27]/40">
                  <div className="flex flex-col">
                    <span className="font-label-button text-label-button text-[#B92B27] font-bold">
                      Expunge Venue Record (Purge)
                    </span>
                    <span className="font-body-sm text-body-sm text-[#454650]">
                      Instantly wipe {formData.name} from all databases, routing indices, and member feeds.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowExpungeModal(true)}
                    className="px-space-md py-space-xs rounded-lg bg-[#B92B27] text-white hover:bg-[#B92B27]/90 font-label-button text-label-button shrink-0 shadow-sm transition-colors cursor-pointer"
                  >
                    Expunge Record
                  </button>
                </div>
              </section>
            </div>

            {/* ========================================== */}
            {/* RIGHT COLUMN: CHAIR ACTIONS & TELEMETRY (~35% / 4 cols) */}
            {/* ========================================== */}
            <div className="lg:col-span-4 flex flex-col gap-space-xl">

              {/* CARD 1: DUAL-CHAIR CONCORD (DAILY INSPECTION) */}
              <section className="bg-[#F3ECDB] border-2 border-[#8a5100]/40 rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-[#D9CFB8] pb-space-sm">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#8a5100]">verified</span>
                    <h3 className="font-headline-sm text-headline-sm text-[#001854]">Dual-Chair Concord</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#ffa538]/20 text-[#6c3e00] font-label-ledger text-label-ledger uppercase font-bold">
                    Daily Quorum
                  </span>
                </div>

                <p className="font-body-sm text-body-sm text-[#454650] leading-relaxed">
                  An inspection is legally verified only when <strong>two independent Chairs</strong> execute a synchronous visit declaration on the same calendar day (UK Time).
                </p>

                {/* LIVE DUAL CHAIR STATUS WIDGET */}
                <div className="p-space-md rounded-lg bg-white border border-[#D9CFB8] flex flex-col gap-space-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-label-ledger text-label-ledger uppercase tracking-wider text-[#454650] font-bold">
                      Quorum Concordance
                    </span>
                    <span className="font-mono text-xs font-bold text-[#8a5100]">
                      {formData.dualChairConcord.affirmedCount} / 2 AFFIRMED
                    </span>
                  </div>

                  {/* PROGRESS BAR */}
                  <div className="w-full h-2.5 rounded-full bg-[#e1d9d2] overflow-hidden flex">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        formData.dualChairConcord.affirmedCount >= 2 ? 'bg-[#1E7A4E]' : 'bg-[#8a5100]'
                      }`}
                      style={{ width: `${(formData.dualChairConcord.affirmedCount / 2) * 100}%` }}
                    ></div>
                  </div>

                  <div className="flex flex-col gap-1.5 pt-1">
                    {/* Presiding Chair Signature */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 font-medium text-[#1e1b17]">
                        <span className="material-symbols-outlined text-[#1E7A4E] text-base leading-none">
                          check_circle
                        </span>
                        {formData.dualChairConcord.firstSignatory.name}
                      </span>
                      <span className="text-[#454650] font-mono">
                        {formData.dualChairConcord.firstSignatory.time || '12:44 BST'}
                      </span>
                    </div>

                    {/* Second Chair Signature */}
                    <div className={`flex items-center justify-between text-xs ${
                      formData.dualChairConcord.secondSignatory.affirmed ? '' : 'opacity-60'
                    }`}>
                      <span className="flex items-center gap-1.5 text-[#1e1b17]">
                        <span className={`material-symbols-outlined text-base leading-none ${
                          formData.dualChairConcord.secondSignatory.affirmed ? 'text-[#1E7A4E]' : 'text-[#D9CFB8]'
                        }`}>
                          {formData.dualChairConcord.secondSignatory.affirmed ? 'check_circle' : 'radio_button_unchecked'}
                        </span>
                        {formData.dualChairConcord.secondSignatory.name}
                      </span>
                      <span className={`font-mono text-[11px] uppercase ${
                        formData.dualChairConcord.secondSignatory.affirmed ? 'text-[#1E7A4E] font-bold' : 'text-[#C27803]'
                      }`}>
                        {formData.dualChairConcord.secondSignatory.affirmed ? 'Affirmed' : 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ACTION BUTTON */}
                <button
                  type="button"
                  onClick={handleAffirmInspection}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-space-md rounded-lg font-label-button text-label-button shadow-md transition-all active:scale-[0.99] cursor-pointer ${
                    formData.dualChairConcord.affirmedCount >= 2
                      ? 'bg-[#1E7A4E] text-white hover:bg-[#1E7A4E]/90'
                      : 'bg-[#1b2f6b] text-white hover:bg-[#25315b]'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">
                    {formData.dualChairConcord.affirmedCount >= 2 ? 'task_alt' : 'assignment_turned_in'}
                  </span>
                  <span>
                    {formData.dualChairConcord.affirmedCount >= 2
                      ? 'Concord Seconded (Quorum Complete)'
                      : 'Affirm Inspection (Visited Today)'}
                  </span>
                </button>

                {/* VERIFICATION STATUS */}
                <div className="flex items-center justify-between text-xs pt-1 border-t border-[#D9CFB8]/60 text-[#454650]">
                  <span>Official Verified Status:</span>
                  <span className={`italic font-medium ${
                    formData.dualChairConcord.affirmedCount >= 2 ? 'text-[#1E7A4E]' : 'text-[#1e1b17]'
                  }`}>
                    {formData.dualChairConcord.latestVerifiedInspection}
                  </span>
                </div>
              </section>

              {/* CARD 2: TIER DECREE & ALTERATION */}
              <section className="bg-[#F3ECDB] border border-[#D9CFB8] rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
                <div className="flex items-center justify-between border-b border-[#D9CFB8] pb-space-sm">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#001854]">military_tech</span>
                    <h3 className="font-headline-sm text-headline-sm text-[#001854]">Tier Decree</h3>
                  </div>
                  <span className="font-label-ledger text-label-ledger text-[#454650] uppercase font-bold">
                    Judicial Bench
                  </span>
                </div>

                <div className="flex items-center justify-between p-space-md rounded-lg bg-white border border-[#D9CFB8]">
                  <span className="font-body-sm text-body-sm font-semibold text-[#1e1b17]">
                    Active Decree Tier:
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${currentTierInfo.bg} ${currentTierInfo.text} font-label-ledger text-label-ledger uppercase tracking-wider font-bold`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${currentTierInfo.dot}`}></span>
                    {currentTierInfo.label}
                  </span>
                </div>

                {/* TIER PROPOSAL FORM */}
                <div className="flex flex-col gap-space-sm">
                  <label className="font-label-button text-label-button text-[#1e1b17] uppercase tracking-wider" htmlFor="proposeTierSelect">
                    Propose Tier Motion
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <select
                        id="proposeTierSelect"
                        value={selectedProposedTier}
                        onChange={(e) => setSelectedProposedTier(e.target.value)}
                        className="w-full appearance-none px-space-md py-2.5 bg-white border border-[#D9CFB8] focus:border-[#1b2f6b] focus:outline-none rounded-lg font-body-md text-[#1e1b17] text-sm cursor-pointer pr-8"
                      >
                        <option value="">Choose sovereign tier...</option>
                        <option value="approved">Approved (Hall of Fame)</option>
                        <option value="consideration">Under Active Consideration</option>
                        <option value="assessed">To Be Assessed</option>
                        <option value="reluctant">If We Must (Reluctant Tier)</option>
                        <option value="rejected">Rejected / Expelled</option>
                      </select>
                      <span className="material-symbols-outlined pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#454650] text-base">
                        expand_more
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleProposeTier}
                      className="px-space-md py-2.5 rounded-lg bg-[#1b2f6b] text-white hover:bg-[#25315b] font-label-button text-label-button shrink-0 shadow-xs transition-colors cursor-pointer"
                    >
                      Propose
                    </button>
                  </div>

                  {tierProposalNotice && (
                    <div className="p-2.5 rounded-lg bg-[#FEF5E7] border border-[#C27803]/40 text-xs text-[#6c3e00] flex items-center gap-2 mt-1">
                      <span className="material-symbols-outlined text-sm text-[#C27803]">info</span>
                      <span>{tierProposalNotice}</span>
                    </div>
                  )}

                  <p className="font-body-sm text-body-sm text-[#454650] leading-tight mt-1">
                    Proposals remain in committee suspension until cosigned by a fellow presiding chair. Upgrades to <em>Approved</em> mandate a ratified inspection.
                  </p>
                </div>
              </section>

              {/* CARD 3: LOCATION & WALKING ISOCHRONES */}
              <section className="bg-[#F3ECDB] border border-[#D9CFB8] rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
                <div className="flex items-center justify-between border-b border-[#D9CFB8] pb-space-sm">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#001854]">directions_walk</span>
                    <h3 className="font-headline-sm text-headline-sm text-[#001854]">Location & Isochrone</h3>
                  </div>
                  <span className="font-label-ledger text-label-ledger text-[#454650] uppercase font-bold">
                    Albert Sq Hub
                  </span>
                </div>

                {/* ADDRESS PIN SPEC */}
                <div className="p-space-md rounded-lg bg-white border border-[#D9CFB8] flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-body-md text-body-md font-bold text-[#1e1b17]">
                        {formData.address}
                      </div>
                      <div className="font-mono text-xs text-[#454650] mt-0.5">
                        {formData.geoCoordinates}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs shrink-0">
                      <button 
                        type="button" 
                        onClick={() => {
                          const newAddr = prompt('Amend Official Address Pin:', formData.address);
                          if (newAddr) handleChange('address', newAddr);
                        }}
                        className="text-[#001854] hover:underline font-semibold cursor-pointer"
                      >
                        Change
                      </button>
                      <span className="text-[#D9CFB8]">·</span>
                      <button 
                        type="button"
                        onClick={() => {
                          if (window.confirm('Remove address specification?')) {
                            handleChange('address', 'Pending Geographic Audit');
                          }
                        }}
                        className="text-[#B92B27] hover:underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <label className="flex items-center gap-2 mt-1 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.isManualGeo}
                      onChange={(e) => handleChange('isManualGeo', e.target.checked)}
                      className="w-4 h-4 rounded border-[#D9CFB8] text-[#001854] focus:ring-0 cursor-pointer"
                    />
                    <span className="font-body-sm text-body-sm text-[#454650]">
                      Enter manually (when geocoding stalls)
                    </span>
                  </label>
                </div>

                {/* WALKING TELEMETRY BADGE & MAP */}
                <div className="p-space-md rounded-lg bg-[#FBF6EA] border border-[#D9CFB8] flex flex-col gap-space-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="font-headline-md text-headline-md font-bold text-[#001854]">
                        {formData.walkTimeMin} min
                      </span>
                      <span className="font-body-sm text-body-sm text-[#454650]">
                        · {formData.walkDistanceMiles} mi pedestrian route
                      </span>
                    </div>

                    <button
                      type="button"
                      disabled={isRerouting}
                      onClick={handleReroute}
                      className="px-2.5 py-1 rounded bg-[#F3ECDB] border border-[#D9CFB8] hover:bg-[#F7F0DF] font-label-button text-label-button text-[#001854] transition-colors flex items-center gap-1 cursor-pointer active:scale-95"
                    >
                      <span className={`material-symbols-outlined text-xs ${isRerouting ? 'animate-spin' : ''}`}>
                        sync
                      </span>
                      <span>{isRerouting ? 'Routing...' : 'Re-route'}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded font-label-ledger text-label-ledger uppercase tracking-wider font-bold ${
                      formData.isWalkEstimated
                        ? 'bg-[#FEF5E7] text-[#C27803]'
                        : 'bg-[#E8F5EE] text-[#1E7A4E]'
                    }`}>
                      {formData.isWalkEstimated ? 'ESTIMATED, NOT ROUTED' : 'ROUTED & LOCKED'}
                    </span>
                    <span className="text-xs text-[#454650]">
                      {formData.isWalkEstimated ? 'Straight-line projection.' : 'Calculated walking graph.'}
                    </span>
                  </div>

                  {/* MINI ISOCHRONE MAP CANVAS */}
                  <div
                    className="w-full h-36 rounded-lg bg-[#e1d9d2] bg-cover bg-center border border-[#D9CFB8] relative overflow-hidden flex items-end p-2 cursor-pointer shadow-xs group"
                    style={{
                      backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD_jlSB5mv3kFTbQZM4-NgbeMymVAjLxGs1jT4b5HQpB1gzvbmL9r-_nYnfKfpLbKTc5bUNQ7nfaHXlRranHwCJJqeX30yIbG4VDWLTCdBTBlLWzlJMagfWD5EQOYfD0WE86r_PT_B6sfVCBPYfpqpSg7-JWGIA-BsyaxYkLw7JlUnRGqQOdpApjabEpXp-zNR9wl_3UhTZv8CwblOJLwdi9QYy54GQ8TRK_kXDdjXmYtblfDVm5gkM')"
                    }}
                    onClick={() => {
                      if (formData.customMapUrl) {
                        window.open(formData.customMapUrl, '_blank');
                      } else {
                        window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formData.address + ' Manchester')}`, '_blank');
                      }
                    }}
                    title="Click to view live Google Maps plot"
                  >
                    <div className="bg-[#F7F0DF]/95 backdrop-blur-xs px-2.5 py-1 rounded border border-[#D9CFB8] flex items-center justify-between w-full shadow-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#8a5100]"></span>
                        <span className="font-label-ledger text-label-ledger uppercase text-[#001854] font-bold">
                          Spinningfields Departure Axis
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-xs text-[#001854] group-hover:translate-x-0.5 transition-transform">
                        launch
                      </span>
                    </div>
                  </div>
                </div>

                {/* ACCORDION: ADVANCED MAP LINK */}
                <details className="group rounded-lg border border-[#D9CFB8] bg-[#F7F0DF] overflow-hidden text-sm">
                  <summary className="px-space-md py-space-sm font-label-button text-label-button text-[#1e1b17] uppercase tracking-wider cursor-pointer flex items-center justify-between hover:bg-[#F3ECDB] select-none">
                    <span>Advanced Coordinate Link</span>
                    <span className="material-symbols-outlined text-base transition-transform group-open:rotate-180">
                      expand_more
                    </span>
                  </summary>
                  <div className="p-space-md pt-0 flex flex-col gap-2 border-t border-[#D9CFB8]/60 mt-1">
                    <label className="font-body-sm text-body-sm text-[#454650] mt-2" htmlFor="mapLinkInput">
                      Custom Google Maps Query URL:
                    </label>
                    <input
                      id="mapLinkInput"
                      type="text"
                      value={formData.customMapUrl}
                      onChange={(e) => handleChange('customMapUrl', e.target.value)}
                      className="w-full px-space-sm py-2 bg-white border border-[#D9CFB8] rounded font-mono text-xs text-[#1e1b17] focus:outline-none"
                    />
                    <span className="text-xs text-[#454650]">
                      Leave blank to inherit lat/long automatically.
                    </span>
                  </div>
                </details>
              </section>
            </div>
          </div>

          {/* ========================================== */}
          {/* FLOATING / STICKY BOTTOM ACTION DECREE BAR */}
          {/* ========================================== */}
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FBF6EA]/95 backdrop-blur-md border-t border-[#D9CFB8] shadow-[0_-4px_16px_rgba(22,19,15,0.08)] py-space-md">
            <div className="max-w-[1440px] mx-auto px-margin-desktop flex flex-col sm:flex-row items-center justify-between gap-space-md">
              {/* STATUS NOTICE */}
              <div className="flex items-center gap-space-sm">
                <span className={`w-2.5 h-2.5 rounded-full ${
                  isDirty ? 'bg-[#ffa538] animate-pulse' : 'bg-[#1E7A4E]'
                }`}></span>
                <span className="font-label-button text-label-button text-[#1e1b17]">
                  Docket Status:
                </span>
                <span className={`font-body-sm text-body-sm font-medium ${
                  isDirty ? 'text-[#8a5100]' : 'text-[#1E7A4E]'
                }`}>
                  {isDirty ? 'Unsaved committee edits present' : 'All changes ratified & archived'}
                </span>
              </div>

              {/* BUTTON COMMAND ROW */}
              <div className="flex items-center gap-space-sm">
                <button
                  type="button"
                  onClick={onBack}
                  className="px-space-md py-2.5 rounded-lg border border-[#D9CFB8] bg-[#F7F0DF] hover:bg-[#F3ECDB] font-label-button text-label-button text-[#1e1b17] transition-colors shadow-xs cursor-pointer"
                >
                  Return to Registry
                </button>

                <button
                  type="button"
                  disabled={!isDirty}
                  onClick={handleDiscard}
                  className={`px-space-md py-2.5 rounded-lg font-label-button text-label-button transition-colors cursor-pointer ${
                    isDirty
                      ? 'border border-transparent hover:bg-[#F3ECDB] text-[#454650]'
                      : 'opacity-40 cursor-not-allowed text-[#757681]'
                  }`}
                >
                  Discard Edits
                </button>

                <button
                  type="button"
                  disabled={saveStatus === 'saving'}
                  onClick={handleSave}
                  className={`px-space-lg py-2.5 rounded-lg font-label-button text-label-button shadow-md flex items-center gap-2 transition-all active:scale-[0.99] cursor-pointer ${
                    saveStatus === 'saved'
                      ? 'bg-[#1E7A4E] text-white'
                      : 'bg-[#1b2f6b] text-white hover:bg-[#25315b]'
                  }`}
                >
                  <span className={`material-symbols-outlined text-base ${
                    saveStatus === 'saving' ? 'animate-spin' : ''
                  }`}>
                    {saveStatus === 'saving' ? 'refresh' : saveStatus === 'saved' ? 'check' : 'save'}
                  </span>
                  <span>
                    {saveStatus === 'saving' ? 'Preserving...' : saveStatus === 'saved' ? 'Decree Saved' : 'Save Changes'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* MODAL: PERMANENT CLOSURE CONFIRMATION */}
          {showCloseModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#001854]/40 backdrop-blur-xs animate-fadeIn">
              <div className="bg-[#F7F0DF] border border-[#D9CFB8] rounded-xl shadow-2xl max-w-lg w-full p-space-lg flex flex-col gap-space-md">
                <div className="flex items-center gap-3 text-[#B92B27]">
                  <span className="material-symbols-outlined text-3xl">report_problem</span>
                  <h3 className="font-headline-sm text-headline-sm text-[#001854]">
                    Confirm Decommission
                  </h3>
                </div>
                <p className="font-body-md text-body-md text-[#1e1b17]">
                  Are you certain you wish to mark <strong>{formData.name}</strong> as permanently closed? This will archive active alerts and prevent future lunch inspections from convening.
                </p>
                <div className="flex items-center justify-end gap-space-sm pt-space-sm border-t border-[#D9CFB8]">
                  <button
                    type="button"
                    onClick={() => setShowCloseModal(false)}
                    className="px-space-md py-2 rounded-lg border border-[#D9CFB8] bg-[#F3ECDB] hover:bg-[#F7F0DF] font-label-button text-label-button text-[#1e1b17] cursor-pointer"
                  >
                    Abort Action
                  </button>
                  <button
                    type="button"
                    onClick={handleDecommission}
                    className="px-space-md py-2 rounded-lg bg-[#B92B27] text-white font-label-button text-label-button shadow-sm cursor-pointer hover:bg-[#B92B27]/90"
                  >
                    Confirm Closure
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* MODAL: EXPUNGE VENUE RECORD */}
          {showExpungeModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#001854]/60 backdrop-blur-xs animate-fadeIn">
              <div className="bg-[#F7F0DF] border-2 border-[#B92B27] rounded-xl shadow-2xl max-w-lg w-full p-space-lg flex flex-col gap-space-md">
                <div className="flex items-center gap-3 text-[#B92B27]">
                  <span className="material-symbols-outlined text-3xl">delete_forever</span>
                  <h3 className="font-headline-sm text-headline-sm text-[#B92B27]">
                    Expunge Sovereign Record
                  </h3>
                </div>
                <p className="font-body-md text-body-md text-[#1e1b17]">
                  This is a permanent purge of <strong>{formData.name}</strong> ({formData.registryCode}). All historical inspections, bribery dockets, and committee scorecards will be permanently struck from the ledger.
                </p>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-ledger text-xs uppercase text-[#454650]">
                    Type "EXPUNGE" to authorize irrevocable deletion:
                  </label>
                  <input
                    type="text"
                    value={expungeConfirmText}
                    onChange={(e) => setExpungeConfirmText(e.target.value)}
                    placeholder="EXPUNGE"
                    className="w-full px-3 py-2 bg-white border border-[#B92B27] rounded font-mono text-sm uppercase focus:outline-none"
                  />
                </div>
                <div className="flex items-center justify-end gap-space-sm pt-space-sm border-t border-[#D9CFB8]">
                  <button
                    type="button"
                    onClick={() => {
                      setShowExpungeModal(false);
                      setExpungeConfirmText('');
                    }}
                    className="px-space-md py-2 rounded-lg border border-[#D9CFB8] bg-[#F3ECDB] hover:bg-[#F7F0DF] font-label-button text-label-button text-[#1e1b17] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={expungeConfirmText !== 'EXPUNGE'}
                    onClick={handleExpunge}
                    className={`px-space-md py-2 rounded-lg font-label-button text-label-button shadow-sm cursor-pointer ${
                      expungeConfirmText === 'EXPUNGE'
                        ? 'bg-[#B92B27] text-white hover:bg-[#B92B27]/90'
                        : 'bg-[#B92B27]/40 text-white cursor-not-allowed'
                    }`}
                  >
                    Authorize Purge
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* PUBLIC DOCKET MODAL */}
          <PublicDocketModal
            venue={formData}
            isOpen={showPublicDocket}
            onClose={() => setShowPublicDocket(false)}
          />

          {/* AUDIT HISTORY MODAL */}
          <AuditHistoryModal
            venue={formData}
            isOpen={showAuditHistory}
            onClose={() => setShowAuditHistory(false)}
          />

        </div>
      </div>
    </div>
  );
};
