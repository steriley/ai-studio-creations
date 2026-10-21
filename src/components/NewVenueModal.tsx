import React, { useState } from 'react';
import { Venue, CostGrade } from '../types';

interface NewVenueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVenue: (venue: Venue) => void;
}

export const NewVenueModal: React.FC<NewVenueModalProps> = ({ isOpen, onClose, onAddVenue }) => {
  const [name, setName] = useState('');
  const [tag, setTag] = useState('Chophouse & Rotisserie');
  const [district, setDistrict] = useState('Manchester Central District');
  const [cuisine, setCuisine] = useState('british');
  const [costGrade, setCostGrade] = useState<CostGrade>(2);
  const [address, setAddress] = useState('');
  const [walkTime, setWalkTime] = useState<number>(7);
  const [lunchSpecial, setLunchSpecial] = useState('The committee signature: order the daily luncheon plate with house condiments.');
  const [pullQuote, setPullQuote] = useState('A sovereign sanctuary for distinguished lunchtime dining.');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const regNum = Math.floor(100 + Math.random() * 900);
    const registryCode = `REG-${regNum} · MCR-CENTRAL`;
    const now = new Date();
    const dateStr = `${now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}, ${now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`;

    const newVenue: Venue = {
      id: `reg-${regNum}`,
      registryCode,
      name,
      slug,
      tag,
      ledgerNumber: `#${regNum}`,
      district,
      subhead: `Autonomous Sovereign Ledger Entry #${regNum}. Registered under ${district} for expedited luncheon appraisal.`,
      cuisine,
      costGrade,
      lunchSpecial,
      pullQuote,
      websiteUrl: 'https://mapcarta.com',
      imageUrl,
      imagePlateTitle: `${name} Interior Record`,
      imagePlateDescription: 'Newly inscribed visual plate on sovereign docket.',
      address: address || 'Manchester Central, M2',
      geoCoordinates: '53.480000 N, -2.245000 W',
      isManualGeo: false,
      customMapUrl: '',
      walkTimeMin: walkTime,
      walkDistanceMiles: Number((walkTime * 0.043).toFixed(2)),
      walkVia: 'via Albert Sq',
      isWalkEstimated: true,
      tier: 'assessed',
      lastAmended: dateStr,
      lastAmendedBy: 'Presiding Chair Ste Riley',
      dualChairConcord: {
        targetQuorum: 2,
        affirmedCount: 1,
        firstSignatory: {
          name: 'Ste Riley (Presiding Chair)',
          role: 'Presiding Chair',
          time: '12:00 BST',
          affirmed: true,
        },
        secondSignatory: {
          name: 'Awaiting Second Chair Cosigner',
          role: 'Second Chair',
          affirmed: false,
        },
        latestVerifiedInspection: 'No verified visits recorded',
      },
      auditLog: [
        {
          id: `aud-${Date.now()}`,
          date: dateStr,
          author: 'Ste Riley',
          action: 'Docket Initiated',
          details: `Enrolled ${name} into the Sovereign Registry.`,
          motionType: 'metadata',
        }
      ],
      isPermanentlyClosed: false,
    };

    onAddVenue(newVenue);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#001854]/40 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-[#F7F0DF] border-2 border-[#D9CFB8] rounded-2xl shadow-2xl max-w-xl w-full p-6 sm:p-8 flex flex-col gap-4 my-8">
        <div className="flex items-center justify-between border-b border-[#D9CFB8] pb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#8a5100]">add_box</span>
            <div>
              <h3 className="font-headline-sm text-xl text-[#001854] font-bold">
                Inscribe New Venue Decree
              </h3>
              <p className="font-label-ledger text-xs uppercase text-[#454650]">
                Autonomous Sovereign Entry Enactment
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F3ECDB] flex items-center justify-center text-[#454650] hover:text-[#001854]"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-sm">
          <div>
            <label className="block font-label-ledger text-xs uppercase text-[#454650] mb-1">
              Venue Legal / Public Title *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. The Spiced Boar Chophouse"
              className="w-full px-3 py-2 bg-white border border-[#D9CFB8] rounded-lg text-sm text-[#1e1b17] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-label-ledger text-xs uppercase text-[#454650] mb-1">
                Taxonomy Tag
              </label>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="e.g. Subterranean Vault"
                className="w-full px-3 py-2 bg-white border border-[#D9CFB8] rounded-lg text-sm text-[#1e1b17]"
              />
            </div>
            <div>
              <label className="block font-label-ledger text-xs uppercase text-[#454650] mb-1">
                District / Quarter
              </label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#D9CFB8] rounded-lg text-sm text-[#1e1b17]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-label-ledger text-xs uppercase text-[#454650] mb-1">
                Cuisine Tradition
              </label>
              <select
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#D9CFB8] rounded-lg text-sm text-[#1e1b17]"
              >
                <option value="armenian">Armenian / Caucasian</option>
                <option value="british">Traditional British & Chophouse</option>
                <option value="italian">Italian-American / Red Sauce</option>
                <option value="levantine">Levantine & Middle Eastern</option>
                <option value="eastasian">East Asian / Broth & Noodle</option>
                <option value="other">Other Sovereign Variant</option>
              </select>
            </div>
            <div>
              <label className="block font-label-ledger text-xs uppercase text-[#454650] mb-1">
                Cost Grade
              </label>
              <select
                value={costGrade}
                onChange={(e) => setCostGrade(parseInt(e.target.value, 10) as CostGrade)}
                className="w-full px-3 py-2 bg-white border border-[#D9CFB8] rounded-lg text-sm text-[#1e1b17]"
              >
                <option value="1">£ — Swift Lunch (&lt;£10)</option>
                <option value="2">££ — Sovereign Par (£10–£20)</option>
                <option value="3">£££ — Payday Treat (&gt;£20)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-label-ledger text-xs uppercase text-[#454650] mb-1">
              Postal Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. 12 King Street, M2 4AQ"
              className="w-full px-3 py-2 bg-white border border-[#D9CFB8] rounded-lg text-sm text-[#1e1b17]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-label-ledger text-xs uppercase text-[#454650] mb-1">
                Walk Time (mins from Spinningfields)
              </label>
              <input
                type="number"
                min={1}
                max={30}
                value={walkTime}
                onChange={(e) => setWalkTime(parseInt(e.target.value, 10) || 5)}
                className="w-full px-3 py-2 bg-white border border-[#D9CFB8] rounded-lg text-sm text-[#1e1b17]"
              />
            </div>
            <div>
              <label className="block font-label-ledger text-xs uppercase text-[#454650] mb-1">
                Image Asset URL
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#D9CFB8] rounded-lg text-xs font-mono text-[#1e1b17]"
              />
            </div>
          </div>

          <div>
            <label className="block font-label-ledger text-xs uppercase text-[#454650] mb-1">
              Lunch Special — "Eat Like Us" Prescription
            </label>
            <textarea
              rows={2}
              value={lunchSpecial}
              onChange={(e) => setLunchSpecial(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#D9CFB8] rounded-lg text-sm text-[#1e1b17]"
            />
          </div>

          <div>
            <label className="block font-label-ledger text-xs uppercase text-[#454650] mb-1">
              Editorial Pull Quote
            </label>
            <input
              type="text"
              value={pullQuote}
              onChange={(e) => setPullQuote(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#D9CFB8] rounded-lg text-sm italic font-title-editorial text-[#001854]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#D9CFB8]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-[#D9CFB8] bg-[#F3ECDB] text-[#1e1b17]"
            >
              Abort Decree
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#1b2f6b] text-white font-bold hover:bg-[#001854]"
            >
              Ratify & Enrol Docket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
