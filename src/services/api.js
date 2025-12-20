import api from '../utils/api';

// Authentication
export const authService = {
  register: async (name, email, password) => {
    try {
      console.log('authService.register called with:', { name, email, password: '***' });
      console.log('API base URL:', api.defaults.baseURL);
      const response = await api.post('/auth/register', { name, email, password });
      console.log('authService.register response:', response.data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.error('authService.register error:', error);
      console.error('Error response:', error.response);
      throw error;
    }
  },

  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

// Campaigns
export const campaignService = {
  getAll: async () => {
    const response = await api.get('/campaigns');
    return response.data.campaigns;
  },

  getOne: async (id) => {
    const response = await api.get(`/campaigns/${id}`);
    return response.data.campaign;
  },

  create: async (campaignData) => {
    const response = await api.post('/campaigns', campaignData);
    return response.data.campaign;
  },

  update: async (id, campaignData) => {
    const response = await api.put(`/campaigns/${id}`, campaignData);
    return response.data.campaign;
  },

  delete: async (id) => {
    const response = await api.delete(`/campaigns/${id}`);
    return response.data;
  },

  deploy: async (id) => {
    const response = await api.post(`/campaigns/${id}/deploy`);
    return response.data;
  }
};

// AI Generation
export const aiService = {
  generateCampaign: async (product, niche, targetAudience, budget, platforms) => {
    const response = await api.post('/ai/generate-campaign', {
      product,
      niche,
      targetAudience,
      budget,
      platforms
    });
    return response.data.campaign;
  },

  getOptimizations: async (campaign, performance) => {
    const response = await api.post('/ai/optimize', { campaign, performance });
    return response.data.suggestions;
  },

  chat: async (message, conversationHistory) => {
    const response = await api.post('/ai/chat', { message, conversationHistory });
    return response.data.response;
  }
};

// Leads
export const leadService = {
  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await api.get(`/leads?${params}`);
    return response.data.leads;
  },

  create: async (leadData) => {
    const response = await api.post('/leads', leadData);
    return response.data.lead;
  },

  update: async (id, leadData) => {
    const response = await api.put(`/leads/${id}`, leadData);
    return response.data.lead;
  },

  convert: async (id, conversionValue) => {
    const response = await api.post(`/leads/${id}/convert`, { conversionValue });
    return response.data.lead;
  }
};

// Conversion Sequences
export const sequenceService = {
  getAll: async () => {
    const response = await api.get('/conversions/sequences');
    return response.data.sequences;
  },

  create: async (sequenceData) => {
    const response = await api.post('/conversions/sequences', sequenceData);
    return response.data.sequence;
  },

  update: async (id, sequenceData) => {
    const response = await api.put(`/conversions/sequences/${id}`, sequenceData);
    return response.data.sequence;
  }
};
