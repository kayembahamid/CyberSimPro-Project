import { createClient } from '@supabase/supabase-js';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getAuthHeaders() {
  const { data: { session } } = await supabase.auth.getSession();
  
  return {
    'Content-Type': 'application/json',
    ...(session?.access_token && {
      'Authorization': `Bearer ${session.access_token}`
    })
  };
}

export const api = {
  async get(endpoint: string) {
    try {
      const headers = await getAuthHeaders();
      const res = await fetch(`${API_URL}${endpoint}`, {
        cache: 'no-store',
        headers,
      });
      
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      
      return res.json();
    } catch (error) {
      console.error('API GET error:', error);
      throw error;
    }
  },

  async post(endpoint: string, data: any) {
    try {
      const headers = await getAuthHeaders();
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      
      return res.json();
    } catch (error) {
      console.error('API POST error:', error);
      throw error;
    }
  },

  async put(endpoint: string, data: any) {
    try {
      const headers = await getAuthHeaders();
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      
      return res.json();
    } catch (error) {
      console.error('API PUT error:', error);
      throw error;
    }
  },

  async delete(endpoint: string) {
    try {
      const headers = await getAuthHeaders();
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'DELETE',
        headers,
      });
      
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      
      return res.json();
    } catch (error) {
      console.error('API DELETE error:', error);
      throw error;
    }
  },
};

// MCP Service for advanced simulations and analysis
export const mcpService = {
  createScenario: async (data: {
    type: 'phishing' | 'ransomware' | 'ddos' | 'data_breach' | 'insider_threat' | 'apt';
    difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    environment?: string;
    sector?: string;
    adversary_profile?: string;
    focus_cves?: string[];
  }) => {
    return api.post('/api/mcp/scenarios', data);
  },
  
  simulateAttack: async (data: {
    attack_type: string;
    target: string;
    intensity?: 'low' | 'medium' | 'high' | 'critical';
  }) => {
    return api.post('/api/mcp/attacks', data);
  },
  
  analyzeNetwork: async (data: {
    network_segment: string;
    duration?: number;
    focus?: string[];
  }) => {
    return api.post('/api/mcp/network-analysis', data);
  },
  
  investigateIncident: async (incidentId: string, scope?: 'initial' | 'full' | 'deep_dive') => {
    return api.post(`/api/mcp/incidents/${incidentId}/investigate`, { scope });
  },
  
  performForensics: async (data: {
    artifact_type: 'memory' | 'disk' | 'network' | 'logs' | 'registry';
    system_id: string;
    analysis_depth?: 'quick' | 'standard' | 'comprehensive';
  }) => {
    return api.post('/api/mcp/forensics', data);
  },
  
  generateReport: async (data: {
    report_type: 'incident' | 'vulnerability' | 'compliance' | 'executive';
    incident_ids?: string[];
    include_recommendations?: boolean;
    mode?: 'standard' | 'facilitation' | 'executive';
  }) => {
    return api.post('/api/mcp/reports', data);
  },
  
  getMetrics: async () => {
    return api.get('/api/mcp/metrics');
  },
  
  getControls: async () => {
    return api.get('/api/mcp/controls');
  },
  
  stopSimulation: async (simulationId: string, reason?: string) => {
    return api.post(`/api/mcp/simulations/${simulationId}/stop`, { reason });
  },
  
  checkHealth: async () => {
    return api.get('/api/mcp/health');
  },
};
