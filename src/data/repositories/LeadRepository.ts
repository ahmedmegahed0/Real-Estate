import type { LeadInput, LeadResponse } from '../../domain/entities/Lead';
import { HttpClient } from '../http/HttpClient';

export class LeadRepository {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public async submitLead(data: LeadInput): Promise<LeadResponse> {
    // According to clean architecture, repository uses the HTTP client to perform data operations.
    return this.client.post<LeadResponse>('/leads', data);
  }
}
