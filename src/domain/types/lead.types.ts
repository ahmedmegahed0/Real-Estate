export type LeadStatus = 'جديد' | 'قيد التواصل' | 'مهتم' | 'غير مهتم' | 'تم التعاقد';

export interface Lead {
  _id: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  projectId?: string; // Refers to the project this lead is interested in (optional for general leads)
  status: LeadStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubmitLeadInput {
  fullName: string;
  phoneNumber: string;
  email?: string;
  projectId?: string;
  notes?: string;
}

export interface UpdateLeadInput {
  status?: LeadStatus;
  notes?: string;
}

export interface UpdateLeadStatusInput {
  status: LeadStatus;
  notes?: string;
}
