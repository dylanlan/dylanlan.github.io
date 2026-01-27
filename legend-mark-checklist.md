---
layout: page
title: Legend Mark Checklist
permalink: /legend-mark-checklist/
---

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
    font-size: 15px;
    color: var(--main-text-color);
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
        <label class="input-label" for="characterNameInput">New Character:</label>
        <input type="text" id="characterNameInput" class="character-name-input" placeholder="Enter new character name...">
        <button class="btn btn-primary" id="saveCharacterBtn">💾 Add Character</button>
      </div>
      <div class="character-input-group">
        <label class="input-label" for="characterSelect">Choose Character:</label>
        <select id="characterSelect" class="character-select">
          <option value="">-- Select Character --</option>
        </select>
        <button class="btn btn-danger" id="deleteCharacterBtn">🗑️ Delete Character</button>
      </div>
    </div>
    
    <label class="input-label" for="searchBox" style="display: block; margin-bottom: 5px;">Search Marks:</label>
    <input type="text" id="searchBox" class="search-box" placeholder="Search legend marks...">
    
    <div class="file-upload-section">
      <label for="fileInput" class="file-upload-label">📁 Upload Legend Marks File</label>
      <input type="file" id="fileInput" accept=".txt">
      <span id="fileName" style="margin-left: 10px; font-style: italic;"></span>
    </div>
    
    <div class="stats">
      <div class="stat-item">Total: <span id="totalCount">0</span></div>
      <div class="stat-item">Checked: <span id="checkedCount">0</span></div>
    </div>
    
    <div class="filter-buttons">
      <button class="btn btn-info" id="showAllBtn">📋 Show All</button>
      <button class="btn btn-info" id="showCheckedBtn">✓ Show Checked Only</button>
      <button class="btn btn-info" id="showUncheckedBtn">☐ Show Unchecked Only</button>
    </div>
    
    <div class="action-buttons">
      <button class="btn btn-danger" id="clearAllBtn">Clear All</button>
      <button class="btn btn-secondary" id="exportBtn">💾 Export Checked</button>
    </div>
  </div>
  
  <div id="legendMarksList"></div>
</div>
<script src="/assets/js/legend-mark-checklist.js" ></script>
