import { FoundItem, Claim, LostReport } from '../types';

export const api = {
  async fetchItems(): Promise<FoundItem[] | null> {
    try {
      const res = await fetch('/api/items');
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  async createItem(item: FoundItem): Promise<boolean> {
    try {
      const res = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  async fetchClaims(): Promise<Claim[] | null> {
    try {
      const res = await fetch('/api/claims');
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  async createClaim(claim: Claim): Promise<boolean> {
    try {
      const res = await fetch('/api/claims', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(claim)
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  async updateClaimStatus(id: string, action: 'APPROVE' | 'REJECT' | 'HANDOVER', extra?: any): Promise<boolean> {
    try {
      const res = await fetch('/api/claims', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action, ...extra })
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  async fetchReports(): Promise<LostReport[] | null> {
    try {
      const res = await fetch('/api/reports');
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  async createReport(report: LostReport): Promise<boolean> {
    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(report)
      });
      return res.ok;
    } catch {
      return false;
    }
  }
};
