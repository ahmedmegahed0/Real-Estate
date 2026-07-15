export class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string = '/api/v1') {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      // Create a clean error object, ideally with response body info if available
      const errorBody = await response.text().catch(() => '');
      throw new Error(`HTTP Error ${response.status}: ${errorBody || response.statusText}`);
    }

    // Only attempt to parse JSON if content type is JSON and not 204 No Content
    if (response.status !== 204 && response.headers.get('content-type')?.includes('application/json')) {
      return await response.json() as T;
    }
    
    return {} as T;
  }

  public async get<T>(endpoint: string, headers?: HeadersInit): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', headers });
  }

  public async post<T>(endpoint: string, body: any, headers?: HeadersInit): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', body: JSON.stringify(body), headers });
  }
}

// Export a singleton instance for shared usage
export const httpClient = new HttpClient();
