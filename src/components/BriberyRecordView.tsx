import React, { useState } from 'react';
import { BriberyItem } from '../types';

interface BriberyRecordViewProps {
  records: BriberyItem[];
  onAddRecord: (item: BriberyItem) => void;
}

export const BriberyRecordView: React.FC<BriberyRecordViewProps> = ({ records, onAddRecord }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newVenue, setNewVenue] = useState('Armenian Taverna');
  const [newDonor, setNewDonor] = useState('Subterranean Head Waiter');
  const [newGift, setNewGift] = useState('Unsolicited complimentary plate of pickled chillies');
  const [newValue, setNewValue] = useState('£2.50');
  const [newChair, setNewChair] = useState('Ste Riley');
  const [newVerdict, setNewVerdict] = useState<BriberyItem['committeeVerdict']>('Quarantined & Consumed');
  const [newNotes, setNewNotes] = useState('Consolidated and neutralized during midday proceedings.');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const item: BriberyItem = {
      id: `brb-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      venueName: newVenue,
      donor: newDonor,
      giftItem: newGift,
      estimatedValue: newValue,
      recipientChair: newChair,
      committeeVerdict: newVerdict,
      notes: newNotes,
    };
    onAddRecord(item);
    setShowAddModal(false);
  };

  return (
    <div className="w-full pt-20 bg-[#FBF6EA] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-margin-desktop py-space-xl flex flex-col gap-space-xl">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md pb-space-lg border-b border-[#D9CFB8]">
          <div className="flex flex-col gap-1">
            <span className="font-label-ledger text-label-ledger uppercase text-[#8a5100] tracking-widest font-bold">
              Committee Disciplinary Code · Section VII
            </span>
            <h1 className="font-headline-xl text-headline-xl text-[#001854] font-bold tracking-tight">
              Official Bribery & Inducement Ledger
            </h1>
            <p className="font-body-md text-body-md text-[#454650] max-w-2xl">
              Strictly cataloging all complimentary pickles, celebratory poppadoms, extra naan bread, and illicit luncheon discounts bestowed upon Presiding Chairs.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-space-md py-2.5 rounded-lg bg-[#1b2f6b] text-white hover:bg-[#001854] font-label-button text-label-button shadow-xs flex items-center gap-1.5 transition-all cursor-pointer self-start md:self-auto"
          >
            <span className="material-symbols-outlined text-base">receipt</span>
            <span>File New Inducement</span>
          </button>
        </div>

        {/* BRIBERY TABLE */}
        <div className="bg-[#F3ECDB] border border-[#D9CFB8] rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F7F0DF] border-b border-[#D9CFB8] text-[#454650] font-label-ledger uppercase text-xs">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Establishment</th>
                  <th className="py-3 px-4">Offered Inducement</th>
                  <th className="py-3 px-4">Estimated Value</th>
                  <th className="py-3 px-4">Recipient Chair</th>
                  <th className="py-3 px-4">Judicial Verdict</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9CFB8]/60 font-body-sm">
                {records.map((r) => (
                  <tr key={r.id} className="hover:bg-[#FBF6EA]/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-xs text-[#454650] whitespace-nowrap">
                      {r.date}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#001854]">
                      {r.venueName}
                      <span className="block text-[11px] font-normal text-[#454650]">
                        via {r.donor}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#1e1b17]">
                      "{r.giftItem}"
                      <span className="block text-[11px] text-[#454650] italic mt-0.5">
                        {r.notes}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs font-semibold text-[#8a5100]">
                      {r.estimatedValue}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-[#1e1b17] whitespace-nowrap">
                      {r.recipientChair}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-label-ledger uppercase font-bold bg-[#E8F5EE] text-[#1E7A4E] border border-[#1E7A4E]/30">
                        {r.committeeVerdict}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL: ADD BRIBERY RECORD */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#001854]/40 backdrop-blur-xs animate-fadeIn">
            <div className="bg-[#F7F0DF] border border-[#D9CFB8] rounded-xl shadow-2xl max-w-lg w-full p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-[#D9CFB8] pb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#8a5100]">history_edu</span>
                  <h3 className="font-headline-sm text-lg text-[#001854] font-bold">
                    File Luncheon Inducement Docket
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-7 h-7 rounded-full bg-[#F3ECDB] flex items-center justify-center text-[#454650]"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-sm">
                <div>
                  <label className="block font-label-ledger text-xs uppercase text-[#454650] mb-1">
                    Establishment
                  </label>
                  <input
                    type="text"
                    required
                    value={newVenue}
                    onChange={(e) => setNewVenue(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#D9CFB8] rounded-lg text-sm text-[#1e1b17]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-label-ledger text-xs uppercase text-[#454650] mb-1">
                      Donor / Purveyor
                    </label>
                    <input
                      type="text"
                      required
                      value={newDonor}
                      onChange={(e) => setNewDonor(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#D9CFB8] rounded-lg text-sm text-[#1e1b17]"
                    />
                  </div>
                  <div>
                    <label className="block font-label-ledger text-xs uppercase text-[#454650] mb-1">
                      Estimated Value
                    </label>
                    <input
                      type="text"
                      required
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#D9CFB8] rounded-lg text-sm text-[#1e1b17]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-label-ledger text-xs uppercase text-[#454650] mb-1">
                    Description of Inducement
                  </label>
                  <input
                    type="text"
                    required
                    value={newGift}
                    onChange={(e) => setNewGift(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#D9CFB8] rounded-lg text-sm text-[#1e1b17]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-label-ledger text-xs uppercase text-[#454650] mb-1">
                      Recipient Chair
                    </label>
                    <select
                      value={newChair}
                      onChange={(e) => setNewChair(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#D9CFB8] rounded-lg text-sm text-[#1e1b17]"
                    >
                      <option value="Ste Riley">Ste Riley (Presiding)</option>
                      <option value="Dame Clara Finch">Dame Clara Finch</option>
                      <option value="Lord Humphrey B.">Lord Humphrey B.</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-label-ledger text-xs uppercase text-[#454650] mb-1">
                      Judicial Verdict
                    </label>
                    <select
                      value={newVerdict}
                      onChange={(e) => setNewVerdict(e.target.value as any)}
                      className="w-full px-3 py-2 bg-white border border-[#D9CFB8] rounded-lg text-sm text-[#1e1b17]"
                    >
                      <option value="Quarantined & Consumed">Quarantined & Consumed</option>
                      <option value="Inoculated via Ingestion">Inoculated via Ingestion</option>
                      <option value="Contemptuously Retained">Contemptuously Retained</option>
                      <option value="Flagrant Inducement (Logged)">Flagrant Inducement</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-label-ledger text-xs uppercase text-[#454650] mb-1">
                    Committee Finding / Notes
                  </label>
                  <textarea
                    rows={2}
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#D9CFB8] rounded-lg text-sm text-[#1e1b17]"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#D9CFB8]">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-lg border border-[#D9CFB8] bg-[#F3ECDB] text-[#1e1b17]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-[#1b2f6b] text-white font-bold"
                  >
                    Enter in Ledger
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
