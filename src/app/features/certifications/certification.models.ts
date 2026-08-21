export interface CertificationResponse {
  id: number;
  title: string;
  issuer: string | null;
  institution?: string | null;
  description: string | null;
  certificationType: string;
  issueDate: string | null;
  expirationDate?: string | null;
  credentialCode: string | null;
  credentialUrl: string | null;
  institutionUrl?: string | null;
  repositoryUrl?: string | null;
  workload?: string | null;
  status?: string | null;
  imageUrl: string | null;
  technologies?: string[] | { id: number; name: string; }[];
  displayOrder: number;
}
