export interface CertificationResponse {
  id: number;
  title: string;
  issuer: string | null;
  description: string | null;
  certificationType: string;
  issueDate: string | null;
  credentialCode: string | null;
  credentialUrl: string | null;
  imageUrl: string | null;
  technologies?: string[];
  displayOrder: number;
}
