---
layout: page
title: Legend Mark Checklist
permalink: /legend-mark-checklist/
---

<style>
  #legend-checklist-container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .checklist-controls {
    background: #f5f5f5;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  .search-box {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 2px solid #ddd;
    border-radius: 4px;
    margin-bottom: 15px;
    box-sizing: border-box;
  }
  
  .file-upload-section {
    margin-bottom: 15px;
  }
  
  .file-upload-label {
    display: inline-block;
    padding: 10px 20px;
    background: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }
  
  .file-upload-label:hover {
    background: #0056b3;
  }
  
  #fileInput {
    display: none;
  }
  
  .stats {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    margin-bottom: 15px;
  }
  
  .stat-item {
    font-size: 16px;
    font-weight: bold;
  }
  
  .action-buttons {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  
  .btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }
  
  .btn-primary {
    background: #28a745;
    color: white;
  }
  
  .btn-primary:hover {
    background: #218838;
  }
  
  .btn-secondary {
    background: #6c757d;
    color: white;
  }
  
  .btn-secondary:hover {
    background: #5a6268;
  }
  
  .btn-danger {
    background: #dc3545;
    color: white;
  }
  
  .btn-danger:hover {
    background: #c82333;
  }
  
  .legend-mark-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #eee;
    transition: background 0.2s;
  }
  
  .legend-mark-item:hover {
    background: #f9f9f9;
  }
  
  .legend-mark-item input[type="checkbox"] {
    margin-right: 10px;
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
  
  .legend-mark-text {
    flex: 1;
    font-size: 15px;
  }
  
  .legend-mark-item.checked {
    opacity: 0.6;
  }
  
  .no-results {
    text-align: center;
    padding: 40px;
    color: #999;
    font-size: 18px;
  }
  
  #legendMarksList {
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    max-height: 600px;
    overflow-y: auto;
  }
</style>

<div id="legend-checklist-container">
  <div class="checklist-controls">
    <input type="text" id="searchBox" class="search-box" placeholder="Search legend marks...">
    
    <div class="file-upload-section">
      <label for="fileInput" class="file-upload-label">📁 Upload Legend Marks File</label>
      <input type="file" id="fileInput" accept=".txt">
      <span id="fileName" style="margin-left: 10px; font-style: italic;"></span>
    </div>
    
    <div class="stats">
      <div class="stat-item">Total: <span id="totalCount">0</span></div>
      <div class="stat-item">Checked: <span id="checkedCount">0</span></div>
      <div class="stat-item">Remaining: <span id="remainingCount">0</span></div>
      <div class="stat-item">Progress: <span id="progressPercent">0%</span></div>
    </div>
    
    <div class="action-buttons">
      <button class="btn btn-primary" id="checkAllVisibleBtn">✓ Check All Visible</button>
      <button class="btn btn-secondary" id="uncheckAllVisibleBtn">✗ Uncheck All Visible</button>
      <button class="btn btn-danger" id="clearAllBtn">Clear All</button>
      <button class="btn btn-secondary" id="exportBtn">💾 Export Checked</button>
    </div>
  </div>
  
  <div id="legendMarksList"></div>
</div>

<script>
(function() {
  let legendMarks = [];
  let checkedMarks = new Set();
  let currentFilter = '';

  async function loadLegendMarks() {
    try {
      const response = await fetch('/assets/csv/legend-marks.csv');
      const csvText = await response.text();
      const lines = csvText.split('\n');

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const match = line.match(/^"[^"]*","([^"]+)","[^"]*","[^"]*"$/);
        if (match) {
          const text = match[1];
          legendMarks.push(text);
        }
      }
      
      legendMarks.sort();
      loadCheckedState();
      renderList();
      updateStats();
    } catch (error) {
      console.error('Error loading legend marks:', error);
      document.getElementById('legendMarksList').innerHTML = 
        '<div class="no-results">Error loading legend marks. Please try refreshing the page.</div>';
    }
  }

  function saveCheckedState() {
    localStorage.setItem('legendMarksChecked', JSON.stringify([...checkedMarks]));
  }

  function loadCheckedState() {
    const saved = localStorage.getItem('legendMarksChecked');
    if (saved) {
      checkedMarks = new Set(JSON.parse(saved));
    }
  }

  function renderList() {
    const container = document.getElementById('legendMarksList');
    const filtered = legendMarks.filter(mark => 
      mark.toLowerCase().includes(currentFilter.toLowerCase())
    );
    
    if (filtered.length === 0) {
      container.innerHTML = '<div class="no-results">No legend marks found</div>';
      return;
    }
    
    container.innerHTML = filtered.map(mark => `
      <div class="legend-mark-item ${checkedMarks.has(mark) ? 'checked' : ''}" data-mark="${escapeHtml(mark)}">
        <input type="checkbox" ${checkedMarks.has(mark) ? 'checked' : ''} data-mark="${escapeHtml(mark)}">
        <span class="legend-mark-text">${escapeHtml(mark)}</span>
      </div>
    `).join('');

    container.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', handleCheckboxChange);
    });
  }

  function handleCheckboxChange(e) {
    const mark = e.target.dataset.mark;
    if (e.target.checked) {
      checkedMarks.add(mark);
    } else {
      checkedMarks.delete(mark);
    }
    
    const item = e.target.closest('.legend-mark-item');
    if (e.target.checked) {
      item.classList.add('checked');
    } else {
      item.classList.remove('checked');
    }
    
    saveCheckedState();
    updateStats();
  }

  function updateStats() {
    const total = legendMarks.length;
    const checked = checkedMarks.size;
    const remaining = total - checked;
    const percent = total > 0 ? Math.round((checked / total) * 100) : 0;
    
    document.getElementById('totalCount').textContent = total;
    document.getElementById('checkedCount').textContent = checked;
    document.getElementById('remainingCount').textContent = remaining;
    document.getElementById('progressPercent').textContent = percent + '%';
  }

  document.getElementById('searchBox').addEventListener('input', (e) => {
    currentFilter = e.target.value;
    renderList();
  });

  document.getElementById('fileInput').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    document.getElementById('fileName').textContent = file.name;
    
    const text = await file.text();
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);
    
    let matchCount = 0;
    lines.forEach(line => {
      const match = legendMarks.find(mark => 
        line.includes(mark) || mark.includes(line)
      );
      if (match) {
        checkedMarks.add(match);
        matchCount++;
      }
    });
    
    alert(`Matched ${matchCount} legend marks from file`);
    saveCheckedState();
    renderList();
    updateStats();
  });

  document.getElementById('checkAllVisibleBtn').addEventListener('click', () => {
    const filtered = legendMarks.filter(mark => 
      mark.toLowerCase().includes(currentFilter.toLowerCase())
    );
    filtered.forEach(mark => checkedMarks.add(mark));
    saveCheckedState();
    renderList();
    updateStats();
  });

  document.getElementById('uncheckAllVisibleBtn').addEventListener('click', () => {
    const filtered = legendMarks.filter(mark => 
      mark.toLowerCase().includes(currentFilter.toLowerCase())
    );
    filtered.forEach(mark => checkedMarks.delete(mark));
    saveCheckedState();
    renderList();
    updateStats();
  });

  document.getElementById('clearAllBtn').addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all checked marks?')) {
      checkedMarks.clear();
      saveCheckedState();
      renderList();
      updateStats();
    }
  });
  
  document.getElementById('exportBtn').addEventListener('click', () => {
    const checked = [...checkedMarks].sort();
    const text = checked.join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'checked-legend-marks.txt';
    a.click();
    URL.revokeObjectURL(url);
  });

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  loadLegendMarks();
})();
</script>

