// Lovable Cloud Integration

import type { UserRole } from '@/lib/rbac';

export interface LovableConfig {
  apiKey: string;
  projectId: string;
  endpoint: string;
}

export interface LovableUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LovableQuote {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
  status: 'pending' | 'reviewed' | 'quoted' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

class LovableCloudService {
  private apiKey: string;
  private projectId: string;
  private endpoint: string;

  constructor(config: LovableConfig) {
    this.apiKey = config.apiKey;
    this.projectId = config.projectId;
    this.endpoint = config.endpoint;
  }

  private getHeaders() {
    return {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      'X-Project-ID': this.projectId,
    };
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.endpoint}${path}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `API request failed: ${response.status}`);
    }

    return response.json();
  }

  // User Management
  async getUsers(): Promise<LovableUser[]> {
    return this.request<LovableUser[]>('/users');
  }

  async getUser(userId: string): Promise<LovableUser> {
    return this.request<LovableUser>(`/users/${userId}`);
  }

  async createUser(userData: Partial<LovableUser>): Promise<LovableUser> {
    return this.request<LovableUser>('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(userId: string, userData: Partial<LovableUser>): Promise<LovableUser> {
    return this.request<LovableUser>(`/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(userId: string): Promise<void> {
    await this.request(`/users/${userId}`, {
      method: 'DELETE',
    });
  }

  // Quote Management
  async getQuotes(filters?: Record<string, any>): Promise<LovableQuote[]> {
    const queryString = new URLSearchParams(filters).toString();
    return this.request<LovableQuote[]>(`/quotes?${queryString}`);
  }

  async getQuote(quoteId: string): Promise<LovableQuote> {
    return this.request<LovableQuote>(`/quotes/${quoteId}`);
  }

  async createQuote(quoteData: Partial<LovableQuote>): Promise<LovableQuote> {
    return this.request<LovableQuote>('/quotes', {
      method: 'POST',
      body: JSON.stringify(quoteData),
    });
  }

  async updateQuote(quoteId: string, quoteData: Partial<LovableQuote>): Promise<LovableQuote> {
    return this.request<LovableQuote>(`/quotes/${quoteId}`, {
      method: 'PATCH',
      body: JSON.stringify(quoteData),
    });
  }

  async deleteQuote(quoteId: string): Promise<void> {
    await this.request(`/quotes/${quoteId}`, {
      method: 'DELETE',
    });
  }

  // Analytics
  async getAnalytics(startDate: string, endDate: string): Promise<Record<string, any>> {
    return this.request('/analytics', {
      method: 'POST',
      body: JSON.stringify({ startDate, endDate }),
    });
  }

  // Health Check
  async healthCheck(): Promise<{ status: string }> {
    return this.request('/health');
  }
}

// Singleton instance
let lovableService: LovableCloudService | null = null;

export const initializeLovableCloud = (config: LovableConfig): LovableCloudService => {
  lovableService = new LovableCloudService(config);
  return lovableService;
};

export const getLovableService = (): LovableCloudService => {
  if (!lovableService) {
    // Initialize with environment variables
    const config: LovableConfig = {
      apiKey: import.meta.env.VITE_LOVABLE_API_KEY || '',
      projectId: import.meta.env.VITE_LOVABLE_PROJECT_ID || '',
      endpoint: import.meta.env.VITE_LOVABLE_ENDPOINT || 'https://api.lovable.cloud',
    };
    lovableService = new LovableCloudService(config);
  }
  return lovableService;
};

export default LovableCloudService;
