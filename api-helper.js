// API Helper for Frontend
const API = {
  baseURL: window.location.origin,
  
  // Generic fetch wrapper
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const defaultOptions = {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };
    
    try {
      const response = await fetch(url, { ...defaultOptions, ...options });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
  
  // Memories
  async getMemories() {
    return await this.request('/api/memories');
  },
  
  async createMemory(memory) {
    return await this.request('/api/memories', {
      method: 'POST',
      body: JSON.stringify(memory),
    });
  },
  
  // Notes
  async getNotes() {
    return await this.request('/api/notes');
  },
  
  async createNote(note) {
    return await this.request('/api/notes', {
      method: 'POST',
      body: JSON.stringify(note),
    });
  },
  
  // Bucket List
  async getBucketList() {
    return await this.request('/api/bucketlist');
  },
  
  async createBucketItem(item) {
    return await this.request('/api/bucketlist', {
      method: 'POST',
      body: JSON.stringify(item),
    });
  },

  async toggleBucketItem(id) {
    return await this.request(`/api/bucketlist/${id}/toggle`, {
      method: 'PATCH',
    });
  },
  
  // Open When Letters
  async getOpenWhenLetters() {
    return await this.request('/api/openwhen');
  },
  
  async createOpenWhenLetter(letter) {
    return await this.request('/api/openwhen', {
      method: 'POST',
      body: JSON.stringify(letter),
    });
  },
  
  async markLetterOpened(letterId) {
    return await this.request(`/api/openwhen/${letterId}/open`, {
      method: 'PATCH',
    });
  },
  
  // Love Count
  async getLoveCount() {
    return await this.request('/api/lovecount');
  },
  
  async incrementLoveCount() {
    return await this.request('/api/lovecount/increment', {
      method: 'POST',
    });
  },
  
  // Track Visit
  async trackVisit(page) {
    return await this.request('/api/visits', {
      method: 'POST',
      body: JSON.stringify({ page }),
    });
  },
};

// Track page visit on load
window.addEventListener('load', () => {
  const pageName = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
  API.trackVisit(pageName).catch(console.error);
});

// Export API
window.API = API;


