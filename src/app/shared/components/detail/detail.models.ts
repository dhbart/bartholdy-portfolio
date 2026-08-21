export interface DetailMetadata {
  label: string;
  value: string;
}

export interface TechnologyBadge {
  id: string | number;
  name: string;
}

export type ExternalLinkType = 'github' | 'credential' | 'demo' | 'linkedin' | 'website';

export interface ExternalLink {
  label: string;
  url: string;
  type?: ExternalLinkType;
}
