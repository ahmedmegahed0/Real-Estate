export interface LeadInput {
  fullName: string;
  phone: string;
  email?: string;
}

export interface LeadResponse {
  id: string;
  projectId: string;
  createdAt: string;
  message: string;
}
