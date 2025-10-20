// Admin Dashboard JavaScript
const API_URL = window.location.origin;
let adminToken = localStorage.getItem('adminToken');

// Check authentication on load
window.addEventListener('load', async () => {
  if (!adminToken) {
    window.location.href = 'admin-login.html';
    return;
  }
  
  try {
    const response = await fetch(`${API_URL}/api/auth/admin/check`, {
      headers: {
        'Authorization': `Bearer ${adminToken}`,
      },
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error('Not authenticated');
    }
    
    // Load dashboard data
    loadDashboard();
  } catch (error) {
    console.error('Auth check failed:', error);
    localStorage.removeItem('adminToken');
    window.location.href = 'admin-login.html';
  }
});

// Logout
document.getElementById('logout-btn').addEventListener('click', async () => {
  try {
    await fetch(`${API_URL}/api/auth/admin/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${adminToken}`,
      },
      credentials: 'include',
    });
  } catch (error) {
    console.error('Logout error:', error);
  }
  
  localStorage.removeItem('adminToken');
  window.location.href = 'admin-login.html';
});

// Tab switching
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active class from all tabs and contents
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    // Add active class to clicked tab and corresponding content
    tab.classList.add('active');
    const tabName = tab.getAttribute('data-tab');
    document.getElementById(`${tabName}-content`).classList.add('active');
  });
});

// Load dashboard data
async function loadDashboard() {
  try {
    const response = await fetch(`${API_URL}/api/admin/dashboard`, {
      headers: {
        'Authorization': `Bearer ${adminToken}`,
      },
      credentials: 'include',
    });
    
    if (!response.ok) throw new Error('Failed to load dashboard');
    
    const data = await response.json();
    
    renderStats(data.stats);
    renderMemories(data.recentActivity.memories);
    renderNotes(data.recentActivity.notes);
    renderBucketList(data.recentActivity.bucketList);
    renderLetters(data.recentActivity.letters);
    
    // Load all content
    loadAllMemories();
    loadAllNotes();
    loadAllBucketList();
    loadAllLetters();
  } catch (error) {
    console.error('Dashboard load error:', error);
  }
}

// Render statistics
function renderStats(stats) {
  const statsGrid = document.getElementById('stats-grid');
  
  statsGrid.innerHTML = `
    <div class="stat-card">
      <div class="stat-label">💕 Total Memories</div>
      <div class="stat-value">${stats.memories.total}</div>
      ${stats.memories.pending > 0 ? `<span class="stat-badge">${stats.memories.pending} pending</span>` : ''}
    </div>
    
    <div class="stat-card">
      <div class="stat-label">📝 Total Notes</div>
      <div class="stat-value">${stats.notes.total}</div>
      ${stats.notes.pending > 0 ? `<span class="stat-badge">${stats.notes.pending} pending</span>` : ''}
    </div>
    
    <div class="stat-card">
      <div class="stat-label">✨ Bucket List Items</div>
      <div class="stat-value">${stats.bucketList.total}</div>
      <span class="stat-badge">${stats.bucketList.completed} completed</span>
      ${stats.bucketList.pending > 0 ? `<span class="stat-badge">${stats.bucketList.pending} pending</span>` : ''}
    </div>
    
    <div class="stat-card">
      <div class="stat-label">💌 Open When Letters</div>
      <div class="stat-value">${stats.letters.total}</div>
      <span class="stat-badge">${stats.letters.opened} opened</span>
      ${stats.letters.pending > 0 ? `<span class="stat-badge">${stats.letters.pending} pending</span>` : ''}
    </div>
    
    <div class="stat-card">
      <div class="stat-label">👥 Total Visits</div>
      <div class="stat-value">${stats.visits.total}</div>
      <span class="stat-badge">${stats.visits.uniqueUsers} unique users</span>
    </div>
    
    <div class="stat-card">
      <div class="stat-label">💖 Love Count</div>
      <div class="stat-value">${stats.loveCount}</div>
      <span class="stat-badge">Total clicks</span>
    </div>
  `;
}

// Load all memories
async function loadAllMemories() {
  try {
    const response = await fetch(`${API_URL}/api/memories/all`, {
      headers: {
        'Authorization': `Bearer ${adminToken}`,
      },
      credentials: 'include',
    });
    
    if (!response.ok) throw new Error('Failed to load memories');
    
    const memories = await response.json();
    renderMemories(memories);
  } catch (error) {
    console.error('Load memories error:', error);
  }
}

// Render memories
function renderMemories(memories) {
  const container = document.getElementById('memories-content');
  
  if (!memories || memories.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">💕</div>
        <p>No memories yet</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = `
    <div class="content-list">
      ${memories.map(memory => `
        <div class="content-item ${memory.approved ? 'approved' : 'pending'}">
          <div class="content-info">
            <div class="content-title">${memory.title}</div>
            <div class="content-text">${memory.description}</div>
            <div class="content-meta">
              ${new Date(memory.date).toLocaleDateString()} • 
              ${memory.approved ? '✅ Approved' : '⏳ Pending'} •
              ${memory.tags?.join(', ') || 'No tags'}
            </div>
          </div>
          <div class="content-actions">
            ${!memory.approved ? `<button class="btn btn-approve" onclick="approveMemory('${memory._id}')">✅ Approve</button>` : ''}
            <button class="btn btn-delete" onclick="deleteMemory('${memory._id}')">🗑️ Delete</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// Approve memory
async function approveMemory(id) {
  try {
    const response = await fetch(`${API_URL}/api/memories/${id}/approve`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${adminToken}`,
      },
      credentials: 'include',
    });
    
    if (response.ok) {
      loadAllMemories();
      loadDashboard();
    }
  } catch (error) {
    console.error('Approve memory error:', error);
  }
}

// Delete memory
async function deleteMemory(id) {
  if (!confirm('Are you sure you want to delete this memory?')) return;
  
  try {
    const response = await fetch(`${API_URL}/api/memories/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${adminToken}`,
      },
      credentials: 'include',
    });
    
    if (response.ok) {
      loadAllMemories();
      loadDashboard();
    }
  } catch (error) {
    console.error('Delete memory error:', error);
  }
}

// Load all notes
async function loadAllNotes() {
  try {
    const response = await fetch(`${API_URL}/api/notes/all`, {
      headers: {
        'Authorization': `Bearer ${adminToken}`,
      },
      credentials: 'include',
    });
    
    if (!response.ok) throw new Error('Failed to load notes');
    
    const notes = await response.json();
    renderNotes(notes);
  } catch (error) {
    console.error('Load notes error:', error);
  }
}

// Render notes
function renderNotes(notes) {
  const container = document.getElementById('notes-content');
  
  if (!notes || notes.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📝</div>
        <p>No notes yet</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = `
    <div class="content-list">
      ${notes.map(note => `
        <div class="content-item ${note.approved ? 'approved' : 'pending'}">
          <div class="content-info">
            <div class="content-title">${note.emoji} Sweet Note</div>
            <div class="content-text">${note.content}</div>
            <div class="content-meta">
              ${new Date(note.createdAt).toLocaleDateString()} • 
              ${note.approved ? '✅ Approved' : '⏳ Pending'}
            </div>
          </div>
          <div class="content-actions">
            ${!note.approved ? `<button class="btn btn-approve" onclick="approveNote('${note._id}')">✅ Approve</button>` : ''}
            <button class="btn btn-delete" onclick="deleteNote('${note._id}')">🗑️ Delete</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// Approve note
async function approveNote(id) {
  try {
    const response = await fetch(`${API_URL}/api/notes/${id}/approve`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${adminToken}`,
      },
      credentials: 'include',
    });
    
    if (response.ok) {
      loadAllNotes();
      loadDashboard();
    }
  } catch (error) {
    console.error('Approve note error:', error);
  }
}

// Delete note
async function deleteNote(id) {
  if (!confirm('Are you sure you want to delete this note?')) return;
  
  try {
    const response = await fetch(`${API_URL}/api/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${adminToken}`,
      },
      credentials: 'include',
    });
    
    if (response.ok) {
      loadAllNotes();
      loadDashboard();
    }
  } catch (error) {
    console.error('Delete note error:', error);
  }
}

// Load all bucket list items
async function loadAllBucketList() {
  try {
    const response = await fetch(`${API_URL}/api/bucketlist/all`, {
      headers: {
        'Authorization': `Bearer ${adminToken}`,
      },
      credentials: 'include',
    });
    
    if (!response.ok) throw new Error('Failed to load bucket list');
    
    const items = await response.json();
    renderBucketList(items);
  } catch (error) {
    console.error('Load bucket list error:', error);
  }
}

// Render bucket list
function renderBucketList(items) {
  const container = document.getElementById('bucketlist-content');
  
  if (!items || items.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">✨</div>
        <p>No bucket list items yet</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = `
    <div class="content-list">
      ${items.map(item => `
        <div class="content-item ${item.approved ? 'approved' : 'pending'}">
          <div class="content-info">
            <div class="content-title">${item.completed ? '✓' : '☐'} ${item.title}</div>
            <div class="content-text">Category: ${item.category}</div>
            <div class="content-meta">
              ${new Date(item.createdAt).toLocaleDateString()} • 
              ${item.approved ? '✅ Approved' : '⏳ Pending'} •
              ${item.completed ? `✓ Completed ${new Date(item.completedDate).toLocaleDateString()}` : 'Not completed'}
            </div>
          </div>
          <div class="content-actions">
            ${!item.approved ? `<button class="btn btn-approve" onclick="approveBucketItem('${item._id}')">✅ Approve</button>` : ''}
            <button class="btn btn-view" onclick="toggleBucketItem('${item._id}')">${item.completed ? '❌ Uncomplete' : '✓ Complete'}</button>
            <button class="btn btn-delete" onclick="deleteBucketItem('${item._id}')">🗑️ Delete</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// Approve bucket item
async function approveBucketItem(id) {
  try {
    const response = await fetch(`${API_URL}/api/bucketlist/${id}/approve`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${adminToken}`,
      },
      credentials: 'include',
    });
    
    if (response.ok) {
      loadAllBucketList();
      loadDashboard();
    }
  } catch (error) {
    console.error('Approve bucket item error:', error);
  }
}

// Toggle bucket item
async function toggleBucketItem(id) {
  try {
    const response = await fetch(`${API_URL}/api/bucketlist/${id}/toggle`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${adminToken}`,
      },
      credentials: 'include',
    });
    
    if (response.ok) {
      loadAllBucketList();
      loadDashboard();
    }
  } catch (error) {
    console.error('Toggle bucket item error:', error);
  }
}

// Delete bucket item
async function deleteBucketItem(id) {
  if (!confirm('Are you sure you want to delete this item?')) return;
  
  try {
    const response = await fetch(`${API_URL}/api/bucketlist/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${adminToken}`,
      },
      credentials: 'include',
    });
    
    if (response.ok) {
      loadAllBucketList();
      loadDashboard();
    }
  } catch (error) {
    console.error('Delete bucket item error:', error);
  }
}

// Load all letters
async function loadAllLetters() {
  try {
    const response = await fetch(`${API_URL}/api/openwhen/all`, {
      headers: {
        'Authorization': `Bearer ${adminToken}`,
      },
      credentials: 'include',
    });
    
    if (!response.ok) throw new Error('Failed to load letters');
    
    const letters = await response.json();
    renderLetters(letters);
  } catch (error) {
    console.error('Load letters error:', error);
  }
}

// Render letters
function renderLetters(letters) {
  const container = document.getElementById('letters-content');
  
  if (!letters || letters.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">💌</div>
        <p>No letters yet</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = `
    <div class="content-list">
      ${letters.map(letter => `
        <div class="content-item ${letter.approved ? 'approved' : 'pending'}">
          <div class="content-info">
            <div class="content-title">${letter.emoji} Open When ${letter.occasion}</div>
            <div class="content-text">${letter.content.substring(0, 150)}${letter.content.length > 150 ? '...' : ''}</div>
            <div class="content-meta">
              ${new Date(letter.createdAt).toLocaleDateString()} • 
              ${letter.approved ? '✅ Approved' : '⏳ Pending'} •
              ${letter.opened ? `📖 Opened ${new Date(letter.openedDate).toLocaleDateString()}` : '📪 Not opened'}
            </div>
          </div>
          <div class="content-actions">
            ${!letter.approved ? `<button class="btn btn-approve" onclick="approveLetter('${letter._id}')">✅ Approve</button>` : ''}
            <button class="btn btn-delete" onclick="deleteLetter('${letter._id}')">🗑️ Delete</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// Approve letter
async function approveLetter(id) {
  try {
    const response = await fetch(`${API_URL}/api/openwhen/${id}/approve`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${adminToken}`,
      },
      credentials: 'include',
    });
    
    if (response.ok) {
      loadAllLetters();
      loadDashboard();
    }
  } catch (error) {
    console.error('Approve letter error:', error);
  }
}

// Delete letter
async function deleteLetter(id) {
  if (!confirm('Are you sure you want to delete this letter?')) return;
  
  try {
    const response = await fetch(`${API_URL}/api/openwhen/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${adminToken}`,
      },
      credentials: 'include',
    });
    
    if (response.ok) {
      loadAllLetters();
      loadDashboard();
    }
  } catch (error) {
    console.error('Delete letter error:', error);
  }
}

// Make functions globally available
window.approveMemory = approveMemory;
window.deleteMemory = deleteMemory;
window.approveNote = approveNote;
window.deleteNote = deleteNote;
window.approveBucketItem = approveBucketItem;
window.toggleBucketItem = toggleBucketItem;
window.deleteBucketItem = deleteBucketItem;
window.approveLetter = approveLetter;
window.deleteLetter = deleteLetter;


