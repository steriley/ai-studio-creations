export type TierStatus = 
  | 'approved'
  | 'consideration'
  | 'assessed'
  | 'reluctant'
  | 'rejected'
  | 'shuttered';

export type CostGrade = 1 | 2 | 3;

export interface Signatory {
  name: string;
  role: string;
  time?: string;
  affirmed: boolean;
}

export interface AuditRecord {
  id: string;
  date: string;
  author: string;
  action: string;
  details: string;
  motionType?: 'tier' | 'inspection' | 'metadata' | 'closure';
}

export interface Venue {
  id: string;
  registryCode: string;
  name: string;
  slug: string;
  tag: string;
  ledgerNumber: string;
  district: string;
  subhead: string;
  cuisine: string;
  costGrade: CostGrade;
  lunchSpecial: string;
  pullQuote: string;
  websiteUrl: string;
  imageUrl: string;
  imagePlateTitle: string;
  imagePlateDescription: string;
  address: string;
  geoCoordinates: string;
  isManualGeo: boolean;
  customMapUrl: string;
  walkTimeMin: number;
  walkDistanceMiles: number;
  walkVia: string;
  isWalkEstimated: boolean;
  tier: TierStatus;
  lastAmended: string;
  lastAmendedBy: string;
  dualChairConcord: {
    targetQuorum: number;
    affirmedCount: number;
    firstSignatory: Signatory;
    secondSignatory: Signatory;
    latestVerifiedInspection: string;
  };
  auditLog: AuditRecord[];
  isPermanentlyClosed: boolean;
}

export interface BriberyItem {
  id: string;
  date: string;
  venueName: string;
  donor: string;
  giftItem: string;
  estimatedValue: string;
  recipientChair: string;
  committeeVerdict: 'Quarantined & Consumed' | 'Contemptuously Retained' | 'Inoculated via Ingestion' | 'Flagrant Inducement (Logged)';
  notes: string;
}

export interface CommitteeMotion {
  id: string;
  date: string;
  venueId: string;
  venueName: string;
  motionType: 'Tier Alteration' | 'Inspection Seconding' | 'Decommission Warrant';
  proposer: string;
  proposedTier?: TierStatus;
  status: 'Pending Second Cosigner' | 'Ratified & Enacted' | 'Vetoed';
  notes: string;
}

export interface VenueSuggestion {
  id: string;
  name: string;
  address: string;
  cuisine: string;
  suggestedBy: string;
  date: string;
  reason: string;
  status: 'Awaiting Preliminary Docket' | 'Accepted to Registry' | 'Disdainfully Dismissed';
}
