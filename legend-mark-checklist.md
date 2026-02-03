---
layout: page
title: Legend Mark Checklist
permalink: /legend-mark-checklist/
---

# Legend Mark Checklist

Wanting to track which legend marks you're still missing? This tool can help you track your current and missing legend marks.

<script src="https://cdn.jsdelivr.net/npm/papaparse@5/papaparse.min.js" ></script>
<style>
  #legend-checklist-container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .checklist-controls {
    background: var(--box-background-color);
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    border: 1px solid var(--light-border-color);
  }
  
  .character-section {
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 2px solid var(--light-border-color);
  }
  
  .character-input-group {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
    align-items: center;
  }
  
  .input-label {
    font-weight: bold;
    color: var(--main-text-color);
    min-width: 140px;
    font-size: 14px;
  }
  
  .character-name-input {
    flex: 1;
    padding: 10px;
    font-size: 16px;
    border: 2px solid var(--light-border-color);
    border-radius: 4px;
    background: var(--main-background-color);
    color: var(--main-text-color);
  }
  
  .character-select {
    flex: 1;
    padding: 10px;
    font-size: 16px;
    border: 2px solid var(--light-border-color);
    border-radius: 4px;
    background: var(--main-background-color);
    color: var(--main-text-color);
  }
  
  .search-box {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 2px solid var(--light-border-color);
    border-radius: 4px;
    margin-bottom: 15px;
    box-sizing: border-box;
    background: var(--main-background-color);
    color: var(--main-text-color);
  }
  
  .file-upload-section {
    text-align: right;
  }
  
  .file-upload-label {
    display: inline-block;
    padding: 8px 16px;
    background: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.2s;
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
    color: var(--main-text-color);
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
    transition: all 0.2s;
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
  
  .btn-info {
    background: #17a2b8;
    color: white;
  }
  
  .btn-info:hover {
    background: #138496;
  }
  
  .btn.active {
    box-shadow: inset 0 0 0 2px var(--main-background-color), inset 0 0 0 4px currentColor;
    font-weight: bold;
  }
  
  .filter-buttons {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 15px;
  }
  
  .legend-mark-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid var(--light-border-color);
    transition: background 0.2s;
    cursor: pointer;
  }
  
  .legend-mark-item:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  
  html[data-theme="light"] .legend-mark-item:hover {
    background: var(--highlight-color);
  }
  
  .legend-mark-item input[type="checkbox"] {
    margin-right: 10px;
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
  
  .legend-mark-text {
    flex: 1;
    font-size: 18px;
  }

  .legend-mark-color-white {
    color: #fff;
  }

  .legend-mark-color-blue {
    color: #78a0f0;
  }

  .legend-mark-color-brown {
    color: #a04000;
  }

  .legend-mark-color-orange {
    color: #e86808;
  }

  .legend-mark-color-yellow {
    color: #f8d828;
  }

  .legend-mark-color-green {
    color: #008070;
  }
  
  .legend-mark-category {
    font-size: 12px;
    padding: 3px 8px;
    border-radius: 4px;
    background: #17a2b8;
    color: #fff;
    border: 1px solid #138496ff;
    white-space: nowrap;
    margin-left: 10px;
  }
  
  .legend-mark-unique-group {
    font-size: 12px;
    padding: 3px 8px;
    border-radius: 4px;
    background: #ffc107;
    color: #000;
    border: 1px solid #ff9800;
    white-space: nowrap;
    margin-left: 5px;
    font-weight: bold;
  }
  
  .legend-mark-class-exclusive {
    font-size: 12px;
    padding: 3px 8px;
    border-radius: 4px;
    background: #dc3545;
    color: #fff;
    border: 1px solid #b62b39ff;
    white-space: nowrap;
    margin-left: 5px;
    font-weight: bold;
  }
  
  .legend-mark-private {
    font-size: 12px;
    padding: 3px 8px;
    border-radius: 4px;
    background: #6c757d;
    color: #fff;
    border: 1px solid #5a6268;
    white-space: nowrap;
    margin-left: 5px;
    font-weight: bold;
  }
  
  .legend-mark-unobtainable {
    font-size: 12px;
    padding: 3px 8px;
    border-radius: 4px;
    background: #343a40;
    color: #fff;
    border: 1px solid #23272b;
    white-space: nowrap;
    margin-left: 5px;
    font-weight: bold;
  }
  
  .legend-mark-deleted {
    font-size: 12px;
    padding: 3px 8px;
    border-radius: 4px;
    background: #6c757d;
    color: #fff;
    border: 1px solid #545b62;
    white-space: nowrap;
    margin-left: 5px;
    font-weight: bold;
  }
  
  .btn-delete,
  .btn-restore {
    margin-left: auto;
    padding: 4px 8px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    background: transparent;
    color: var(--light-text-color);
    transition: all 0.2s;
  }
  
  .btn-delete:hover {
    background: #dc3545;
    color: #fff;
  }
  
  .btn-restore {
    font-size: 12px;
    font-weight: bold;
  }
  
  .btn-restore:hover {
    background: #28a745;
    color: #fff;
  }
  
  .legend-mark-item.deleted {
    opacity: 0.4;
  }
  
  .legend-mark-item.checked {
    opacity: 0.5;
  }
  
  .legend-mark-item.checked .legend-mark-text {
    text-decoration: line-through;
    color: var(--light-text-color);
  }
  
  .no-results {
    text-align: center;
    padding: 40px;
    color: var(--light-text-color);
    font-size: 18px;
  }
  
  #legendMarksList {
    background: var(--card-background-color);
    border: 1px solid var(--light-border-color);
    border-radius: 4px;
    max-height: 600px;
    overflow-y: auto;
  }
</style>

<div id="legend-checklist-container">
  <div class="checklist-controls">
    <div class="character-section">
      <div class="character-input-group">
        <label class="input-label" for="characterNameInput">New Aisling:</label>
        <input type="text" id="characterNameInput" class="character-name-input" placeholder="New aisling name...">
        <button class="btn btn-primary" id="saveCharacterBtn">➕ Add Aisling</button>
      </div>
      <div class="character-input-group">
        <label class="input-label" for="characterSelect">Choose Aisling:</label>
        <select id="characterSelect" class="character-select">
          <option value="">-- Select Aisling --</option>
        </select>
        <button class="btn btn-danger" id="deleteCharacterBtn">🗑️ Delete Aisling</button>
      </div>
      <div class="character-input-group">
        <div class="file-upload-section" style="margin-left: auto;">
          <span id="fileName" style="margin-left: 10px; font-style: italic;"></span>
          <label for="fileInput" class="file-upload-label">📁 Upload Marks</label>
          <input type="file" id="fileInput" accept=".txt">
        </div>
      </div>
    </div>
    
    <div style="display: flex; gap: 10px; align-items: flex-end; margin-bottom: 15px;">
      <div style="flex: 1;">
        <label class="input-label" for="searchBox" style="display: block; margin-bottom: 5px;">Search Marks:</label>
        <input type="text" id="searchBox" class="search-box" placeholder="Search legend marks..." style="margin-bottom: 0;">
      </div>
      <div style="min-width: 200px;">
        <label class="input-label" for="categoryFilter" style="display: block; margin-bottom: 5px;">Category:</label>
        <select id="categoryFilter" class="character-select" style="width: 100%;">
          <option value="">All Categories</option>
        </select>
      </div>
    </div>
    
    <div class="stats">
      <div class="stat-item">Total Available: <span id="totalCount">0</span></div>
      <div class="stat-item">Obtained: <span id="checkedCount">0</span></div>
    </div>
    
    <div class="filter-buttons">
      <button class="btn btn-info" id="showAllBtn" title="Show both checked and unchecked legend marks">📋 Show All</button>
      <button class="btn btn-info" id="showCheckedBtn" title="Show marks you've checked off">✓ Show Checked Only</button>
      <button class="btn btn-info" id="showUncheckedBtn" title="Show marks you haven't checked yet">☐ Show Unchecked Only</button>
      <button class="btn btn-info" id="toggleDeletedBtn" title="Show marks you've removed from tracking">🗑️ Show Deleted Only</button>
    </div>
    
    <div class="filter-buttons">
      <button class="btn btn-secondary" id="toggleUnobtainableBtn" title="Legend Marks which can't be obtained nowadays">🚫 Show Unobtainable</button>
      <button class="btn btn-secondary" id="togglePrivateBtn" title="Legend Marks which other players can't see">👁️ Show Private</button>
    </div>
    
    <div class="action-buttons">
      <button class="btn btn-danger" id="clearAllBtn">☐ Uncheck All</button>
      <button class="btn btn-primary" id="exportBtn">💾 Save</button>
    </div>
  </div>
  
  <div id="legendMarksList"></div>
</div>
<script src="/assets/js/legend-mark-checklist.js" ></script>
