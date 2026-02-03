(function() {
  let allLegendMarks = [];
  let legendMarks = [];
  let checkedMarks = new Set();
  let currentFilter = '';
  let categoryFilter = '';
  let currentCharacter = '';
  let characterData = {};
  let deletedMarksData = {};
  let deletedMarks = new Set();
  let statusFilter = 'all';
  let showUnobtainable = false;
  let showPrivate = false;
  let showDeleted = false;
  const classe = ['Monk', 'Priest', 'Rogue', 'Warrior', 'Wizard', 'Medenian', 'Druid', 'Bard', 'Archer', 'Gladiator', 'Summoner'];

  async function loadLegendMarks() {
    try {
      const response = await fetch('/assets/csv/all-mark-data.csv');
      const csvText = await response.text();
      allLegendMarks = Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true
      }).data;
      
      filterMarks();
      loadAllCharacterData();
      loadCheckedState();
      loadDeletedState();
      populateCategoryFilter();
      renderList();
      updateStats();
    } catch (error) {
      console.error('Error loading legend marks:', error);
      document.getElementById('legendMarksList').innerHTML = 
        '<div class="no-results">Error loading legend marks. Please try refreshing the page.</div>';
    }
  }

  function saveCheckedState() {
    if (!currentCharacter) return;
    characterData[currentCharacter] = Array.from(checkedMarks);
    localStorage.setItem('legendMarksCharacterData', JSON.stringify(characterData));
  }
  
  function saveDeletedState() {
    if (!currentCharacter) return;
    deletedMarksData[currentCharacter] = Array.from(deletedMarks);
    localStorage.setItem('legendMarksDeletedData', JSON.stringify(deletedMarksData));
  }

  function loadCheckedState() {
    if (!currentCharacter) {
      checkedMarks = new Set();
      return;
    }
    if (characterData[currentCharacter]) {
      checkedMarks = new Set(characterData[currentCharacter]);
    } else {
      checkedMarks = new Set();
    }
  }
  
  function loadDeletedState() {
    if (!currentCharacter) {
      deletedMarks = new Set();
      return;
    }
    if (deletedMarksData[currentCharacter]) {
      deletedMarks = new Set(deletedMarksData[currentCharacter]);
    } else {
      deletedMarks = new Set();
    }
  }
  
  function loadAllCharacterData() {
    const saved = localStorage.getItem('legendMarksCharacterData');
    if (saved) {
      characterData = JSON.parse(saved);
    }
    const savedDeleted = localStorage.getItem('legendMarksDeletedData');
    if (savedDeleted) {
      deletedMarksData = JSON.parse(savedDeleted);
    }
    const lastCharacter = localStorage.getItem('legendMarksLastCharacter');
    if (lastCharacter && characterData[lastCharacter]) {
      currentCharacter = lastCharacter;
    }
    updateCharacterSelect();
  }
  
  function updateCharacterSelect() {
    const select = document.getElementById('characterSelect');
    select.innerHTML = '<option value="">-- Select Character --</option>';
    Object.keys(characterData).sort().forEach(name => {
      const option = document.createElement('option');
      option.value = name;
      option.textContent = name;
      if (name === currentCharacter) {
        option.selected = true;
      }
      select.appendChild(option);
    });
    
    document.getElementById('deleteCharacterBtn').disabled = !currentCharacter;
  }
  
  function switchCharacter(name) {
    currentCharacter = name;
    localStorage.setItem('legendMarksLastCharacter', name);
    loadCheckedState();
    loadDeletedState();
    renderList();
    updateStats();
    updateCharacterSelect();
  }
  
  function updateFilterButtons() {
    document.getElementById('showAllBtn').classList.toggle('active', statusFilter === 'all');
    document.getElementById('showCheckedBtn').classList.toggle('active', statusFilter === 'checked');
    document.getElementById('showUncheckedBtn').classList.toggle('active', statusFilter === 'unchecked');
  }
  
  function saveCharacter() {
    saveCheckedState();
    const input = document.getElementById('characterNameInput');
    const name = input.value.trim();
    
    if (!name) {
      alert('Please enter an Aisling name');
      return;
    }
    
    if (!characterData[name]) {
      characterData[name] = [];
      checkedMarks.clear();
      saveCheckedState();
    }

    document.getElementById('characterNameInput').value = '';
    switchCharacter(name);
    
  }

  document.getElementById('saveCharacterBtn').addEventListener('click', saveCharacter);
  
  document.getElementById('characterNameInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      saveCharacter();
    }
  });
  
  document.getElementById('characterSelect').addEventListener('change', (e) => {
    if (e.target.value) {
      switchCharacter(e.target.value);
    }
  });
  
  document.getElementById('deleteCharacterBtn').addEventListener('click', deleteCharacter);
  
  document.getElementById('searchBox').addEventListener('input', (e) => {
    currentFilter = e.target.value;
    renderList();
  });
  
  document.getElementById('categoryFilter').addEventListener('change', (e) => {
    categoryFilter = e.target.value;
    renderList();
  });
  
  function deleteCharacter() {
    if (!currentCharacter) {
      alert('No Aisling selected');
      return;
    }
    
    if (!confirm(`Are you sure you want to delete "${currentCharacter}" and all their legend marks?`)) {
      return;
    }
    
    delete characterData[currentCharacter];
    localStorage.setItem('legendMarksCharacterData', JSON.stringify(characterData));
    
    const remainingCharacters = Object.keys(characterData);
    if (remainingCharacters.length > 0) {
      switchCharacter(remainingCharacters[0]);
    } else {
      currentCharacter = '';
      localStorage.removeItem('legendMarksLastCharacter');
      checkedMarks = new Set();
      updateCharacterSelect();
      renderList();
      updateStats();
    }
  }

  function filterMarks() {
    legendMarks = allLegendMarks.filter(m => {
      const obtainableCheck = showUnobtainable ? true : m.obtainable === 'Yes';
      const publicCheck = showPrivate ? true : m.public === 'Yes';
      return obtainableCheck && publicCheck;
    });
    legendMarks.sort((a, b) => a.text.localeCompare(b.text));
  }
  
  function updateToggleButtons() {
    document.getElementById('toggleUnobtainableBtn').classList.toggle('active', showUnobtainable);
    document.getElementById('togglePrivateBtn').classList.toggle('active', showPrivate);
    document.getElementById('toggleDeletedBtn').classList.toggle('active', showDeleted);
  }

  function getMarkClasses(mark) {
    let classes = [];

    if (mark.classExclusive === 'Yes' && mark.subcategories) {
      const markClasses = mark.subcategories.split(',').map(c => c.trim());
      classes = classes.concat(markClasses.filter(c => classe.includes(c)));
    }

    return classes;
  }
  
  function populateCategoryFilter() {
    const categories = new Set();
    allLegendMarks.forEach(mark => {
      if (mark.category) {
        categories.add(mark.category);
      }
    });
    
    const select = document.getElementById('categoryFilter');
    select.innerHTML = '<option value="">All Categories</option>';
    Array.from(categories).sort().forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      select.appendChild(option);
    });
  }

  function renderList() {
    const container = document.getElementById('legendMarksList');
    let filtered = legendMarks.filter(mark => {
      const searchMatch = mark.text.toLowerCase().includes(currentFilter.toLowerCase());
      const deletedMatch = showDeleted ? deletedMarks.has(mark.text) : !deletedMarks.has(mark.text);
      const categoryMatch = categoryFilter ? mark.category === categoryFilter : true;
      return searchMatch && deletedMatch && categoryMatch;
    });
    
    if (statusFilter === 'checked') {
      filtered = filtered.filter(mark => checkedMarks.has(mark.text));
    } else if (statusFilter === 'unchecked') {
      filtered = filtered.filter(mark => !checkedMarks.has(mark.text));
    }
    
    updateFilterButtons();
    updateToggleButtons();
    
    document.getElementById('displayedCount').textContent = filtered.length;
    
    if (filtered.length === 0) {
      container.innerHTML = '<div class="no-results">No legend marks found</div>';
      return;
    }
    
    container.innerHTML = filtered.map(mark => {
      const markClasses = getMarkClasses(mark);
      const isDeleted = deletedMarks.has(mark.text);
      return `
        <div class="legend-mark-item ${checkedMarks.has(mark.text) ? 'checked' : ''} ${isDeleted ? 'deleted' : ''}" data-mark="${escapeHtml(mark.text)}">
          <input type="checkbox" ${checkedMarks.has(mark.text) ? 'checked' : ''} data-mark="${escapeHtml(mark.text)}" ${isDeleted ? 'disabled' : ''}>
          <span class="legend-mark-text legend-mark-color-${mark.color.toLowerCase()}">${escapeHtml(mark.text)}</span>
          <span class="legend-mark-category" title="${escapeHtml(mark.subcategories || '')}">${escapeHtml(mark.category || 'Unknown')}</span>
          ${mark.uniqueGroup ? `<span class="legend-mark-unique-group" title="Only 1 mark from this group can be obtained at a time">${escapeHtml(mark.uniqueGroup)}</span>` : ''}
          ${mark.classExclusive === 'Yes' && mark.subcategories ? `<span class="legend-mark-class-exclusive" title="Class Exclusive">${escapeHtml(markClasses.join(', '))}</span>` : ''}
          ${mark.public !== 'Yes' ? `<span class="legend-mark-private" title="Private mark - not visible on public legend">Private</span>` : ''}
          ${mark.obtainable !== 'Yes' ? `<span class="legend-mark-unobtainable" title="No longer obtainable">Unobtainable</span>` : ''}
          ${isDeleted ? `<span class="legend-mark-deleted" title="Deleted from tracking">Deleted</span>` : ''}
          ${isDeleted ? 
            `<button class="btn-restore" data-mark="${escapeHtml(mark.text)}" title="Restore mark">↶ Restore</button>` : 
            `<button class="btn-delete" data-mark="${escapeHtml(mark.text)}" title="Delete mark">🗑️</button>`
          }
        </div>`;
    }).join('');

    container.querySelectorAll('.legend-mark-item').forEach(item => {
      item.addEventListener('click', handleRowClick);
    });

    container.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', handleCheckboxChange);
    });
    
    container.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', handleDeleteMark);
    });
    
    container.querySelectorAll('.btn-restore').forEach(btn => {
      btn.addEventListener('click', handleRestoreMark);
    });
  }

  function handleRowClick(e) {
    /* Ignore if clicking directly on checkbox, delete button, or restore button */
    if (e.target.type === 'checkbox' || e.target.classList.contains('btn-delete') || e.target.classList.contains('btn-restore')) return;
    
    const item = e.currentTarget;
    /* Don't toggle if deleted */
    if (item.classList.contains('deleted')) return;
    
    const checkbox = item.querySelector('input[type="checkbox"]');
    checkbox.checked = !checkbox.checked;
    
    /* Trigger the change event */
    const event = new Event('change');
    checkbox.dispatchEvent(event);
  }
  
  function handleDeleteMark(e) {
    e.stopPropagation();
    const mark = e.currentTarget.dataset.mark;
    deletedMarks.add(mark);
    saveDeletedState();
    renderList();
    updateStats();
  }
  
  function handleRestoreMark(e) {
    e.stopPropagation();
    const mark = e.currentTarget.dataset.mark;
    deletedMarks.delete(mark);
    saveDeletedState();
    renderList();
    updateStats();
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
    
    document.getElementById('totalCount').textContent = total;
    document.getElementById('checkedCount').textContent = checked;
  }

  document.getElementById('searchBox').addEventListener('input', (e) => {
    currentFilter = e.target.value;
    renderList();
  });
  
  document.getElementById('showAllBtn').addEventListener('click', () => {
    statusFilter = 'all';
    renderList();
  });
  
  document.getElementById('showCheckedBtn').addEventListener('click', () => {
    statusFilter = 'checked';
    renderList();
  });
  
  document.getElementById('showUncheckedBtn').addEventListener('click', () => {
    statusFilter = 'unchecked';
    renderList();
  });
  
  document.getElementById('toggleUnobtainableBtn').addEventListener('click', () => {
    showUnobtainable = !showUnobtainable;
    filterMarks();
    renderList();
    updateStats();
  });
  
  document.getElementById('togglePrivateBtn').addEventListener('click', () => {
    showPrivate = !showPrivate;
    filterMarks();
    renderList();
    updateStats();
  });
  
  document.getElementById('toggleDeletedBtn').addEventListener('click', () => {
    showDeleted = !showDeleted;
    renderList();
    updateStats();
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
        line.includes(mark.text) || mark.text.includes(line)
      );
      if (match) {
        checkedMarks.add(match.text);
        matchCount++;
      }
    });
    
    alert(`Matched ${matchCount} legend marks from file`);
    saveCheckedState();
    renderList();
    updateStats();
  });

  document.getElementById('clearAllBtn').addEventListener('click', () => {
    if (confirm(`Are you sure you want to clear all checked marks for ${currentCharacter}?`)) {
      checkedMarks.clear();
      saveCheckedState();
      renderList();
      updateStats();
    }
  });

  document.getElementById('exportBtn').addEventListener('click', () => {
    if (!currentCharacter) {
      alert('Please select an Aisling first');
      return;
    }
    const checked = [...checkedMarks].sort((a, b) => a.localeCompare(b));
    const text = checked.join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const filename = `${currentCharacter}-legend-marks`.replace(/[^a-z0-9-_]/gi, '_');
    a.href = url;
    a.download = filename;
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
