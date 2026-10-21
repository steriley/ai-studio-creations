import React, { useState } from 'react';
import { VenueSuggestion } from '../types';

interface SuggestionsViewProps {
  suggestions: VenueSuggestion[];
  onAcceptSuggestion: (suggestion: VenueSuggestion) => void;
  onDismissSuggestion: (id: string) => void;
  onAddSuggestion: (sug: VenueSuggestion) => void;
}

export const SuggestionsView: React.FC<SuggestionsViewProps> = ({
  suggestions,
  onAcceptSuggestion,
  onDismissSuggestion,
  onAddSuggestion,
}) => {
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [reason, setReason] = useState('');
  const [citizen, setCitizen] = useState('Alderman Vance');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    onAddSuggestion({
      id: `sug-${Date.now()}`,
      name,
      address,
      cuisine,
      suggestedBy: citizen,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      reason,
      status: 'Awaiting Preliminary Docket',
    });
    setName('');
    setAddress('');
    setCuisine('');
    setReason('');
    setShowSubmitModal(false);
  };

  return (
    <div className="w-full pt-20 bg-[#FBF6EA] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-margin-desktop py-space-xl flex flex-col gap-space-xl">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md pb-space-lg border-b border-[#D9CFB8]">
          <div className="flex flex-col gap-1">
            <span className="font-label-ledger text-label-ledger uppercase text-[#8a5100] tracking-widest font-bold">
              Civic Petitions & Citizen Inquiries
            </span>
            <h1 className="font-headline-xl text-headline-xl text-[#001854] font-bold tracking-tight">
              Luncheon Suggestions Docket
            </h1>
            <p className="font-body-md text-body-md text-[#454650] max-w-2xl">
              Dining venues formally petitioned by members, aldermen, and citizens of Greater Manchester awaiting committee inspection triage.
            </p>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-space-md py-2.5 rounded-lg bg-[#1b2f6b] text-white hover:bg-[#001854] font-label-button text-label-button shadow-xs flex items-center gap-1.5 transition-all cursor-pointer self-start md:self-auto"
          >
            <span className="material-symbols-outlined text-base">post_add</span>
            <span>Submit Civic Petition</span>
          </button>
        </div>

        {/* SUGGESTIONS LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
          {suggestions.map((sug) => (
            <div
              key={sug.id}
              className="p-space-lg rounded-xl bg-[#F3ECDB] border border-[#D9CFB8] shadow-xs flex flex-col justify-between gap-space-md"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[#454650]">{sug.date}</span>
                  <span className="font-label-ledger uppercase tracking-wider text-[#8a5100] font-bold">
                    {sug.cuisine}
                  </span>
                </div>

                <h3 className="font-headline-sm text-lg text-[#001854] font-bold">
                  {sug.name}
                </h3>
                <p className="font-body-sm text-xs text-[#454650]">
                  {sug.address}
                </p>

                <p className="font-title-editorial text-xs italic text-[#1e1b17] bg-[#F7F0DF] p-3 rounded-lg border border-[#D9CFB8]/60 mt-1">
                  "{sug.reason}"
                </p>

                <div className="text-[11px] text-[#454650]">
                  Petitioned by: <span className="font-semibold text-[#1e1b17]">{sug.suggestedBy}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#D9CFB8] flex items-center justify-between gap-2">
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-label-ledger uppercase font-bold ${
                  sug.status.includes('Accepted')
                    ? 'bg-[#E8F5EE] text-[#1E7A4E]'
                    : sug.status.includes('Dismissed')
                    ? 'bg-[#FDF0F0] text-[#B92B27]'
                    : 'bg-[#FEF5E7] text-[#C27803]'
                }`}>
                  {sug.status}
                </span>

                {sug.status === 'Awaiting Preliminary Docket' && (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onDismissSuggestion(sug.id)}
                      className="px-2 py-1 text-xs text-[#B92B27] hover:underline"
                    >
                      Dismiss
                    </button>
                    <button
                      onClick={() => onAcceptSuggestion(sug)}
                      className="px-3 py-1 bg-[#1b2f6b] text-white rounded text-xs font-bold hover:bg-[#001854]"
                    >
                      Enroll
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* MODAL */}
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#001854]/40 backdrop-blur-xs animate-fadeIn">
            <div className="bg-[#F7F0DF] border border-[#D9CFB8] rounded-xl shadow-2xl max-w-lg w-full p-6 flex flex-col gap-4">
              <h3 className="font-headline-sm text-lg text-[#001854] font-bold">
                Table a Civic Luncheon Suggestion
              </h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-sm">
                <div>
                  <label className="block font-label-ledger text-xs uppercase text-[#454650] mb-1">
                    Establishment Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#D9CFB8] rounded"
                  />
                </div>
                <div>
                  <label className="block font-label-ledger text-xs uppercase text-[#454650] mb-1">
                    Manchester Address & Postal Code
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#D9CFB8] rounded"
                  />
                </div>
                <div>
                  <label className="block font-label-ledger text-xs uppercase text-[#454650] mb-1">
                    Cuisine / Speciality
                  </label>
                  <input
                    type="text"
                    required
                    value={cuisine}
                    onChange={e => setCuisine(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#D9CFB8] rounded"
                  />
                </div>
                <div>
                  <label className="block font-label-ledger text-xs uppercase text-[#454650] mb-1">
                    Reason for Committee Consideration
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#D9CFB8] rounded"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2 border-t border-[#D9CFB8]">
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(false)}
                    className="px-4 py-2 rounded border border-[#D9CFB8] bg-[#F3ECDB]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-[#1b2f6b] text-white font-bold"
                  >
                    Submit Petition
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
