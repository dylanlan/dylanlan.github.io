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
  let showOtherClass = false;
  let hideGroupLocked = false;
  let playerApiData = {};
  const classe = ['Monk', 'Priest', 'Rogue', 'Warrior', 'Wizard', 'Medenian', 'Druid', 'Bard', 'Archer', 'Gladiator', 'Summoner'];
  
  // const API_BASE = 'http://127.0.0.1:8787/aisling/';
  const API_BASE = 'https://test-cloudflare-worker.dylanlan.workers.dev/aisling/';
  // const API_BASE = 'https://api.aislingexchange.com/api/players/';

  async function loadLegendMarks() {
    try {
      const response = await fetch('/assets/csv/all-mark-data.csv');
      const csvText = await response.text();
      allLegendMarks = Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true
      }).data;
      
      loadAllCharacterData();
      loadCheckedState();
      loadDeletedState();
      filterMarks();
      populateCategoryFilter();
      renderList();
      updateStats();
      updatePlayerClassDisplay();
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

  function savePlayerApiData() {
    localStorage.setItem('legendMarksPlayerApiData', JSON.stringify(playerApiData));
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
    const savedPlayerApiData = localStorage.getItem('legendMarksPlayerApiData');
    if (savedPlayerApiData) {
      playerApiData = JSON.parse(savedPlayerApiData);
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
    filterMarks();
    renderList();
    updateStats();
    updateCharacterSelect();
    updatePlayerClassDisplay();
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
    syncCharacterData(name);
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

  function getPlayerClass(name) {
    return (playerApiData[name] && playerApiData[name].className) || '';
  }

  function updatePlayerClassDisplay() {
    const el = document.getElementById('playerClassDisplay');
    if (!el) return;
    const playerClass = getPlayerClass(currentCharacter);
    if (currentCharacter && playerClass) {
      el.textContent = `Class: ${playerClass}`;
    } else if (currentCharacter) {
      el.textContent = 'Class: Unknown (sync to detect)';
    } else {
      el.textContent = '';
    }
  }

  function filterMarks() {
    const playerClass = getPlayerClass(currentCharacter);
    legendMarks = allLegendMarks.filter(m => {
      const obtainableCheck = showUnobtainable ? true : m.obtainable === 'Yes';
      const publicCheck = showPrivate ? true : m.public === 'Yes';

      let classCheck = true;
      if (m.classExclusive === 'Yes' && playerClass) {
        const markClasses = getMarkClasses(m);
        if (markClasses.length && !markClasses.includes(playerClass)) {
          classCheck = showOtherClass;
        }
      }
      return obtainableCheck && publicCheck && classCheck;
    });
    legendMarks.sort((a, b) => a.text.localeCompare(b.text));
  }

  /* Returns a map of uniqueGroup -> mark.text for the group's already-obtained mark,
     for the currently selected character. Marks sharing a uniqueGroup are mutually
     exclusive, so once one is checked, the rest of that group can't actually be obtained. */
  function getGroupOccupants() {
    const occupants = {};
    allLegendMarks.forEach(mark => {
      if (mark.uniqueGroup && checkedMarks.has(mark.text)) {
        occupants[mark.uniqueGroup] = mark.text;
      }
    });
    return occupants;
  }
  
  function updateToggleButtons() {
    document.getElementById('toggleUnobtainableBtn').classList.toggle('active', showUnobtainable);
    document.getElementById('togglePrivateBtn').classList.toggle('active', showPrivate);
    document.getElementById('toggleDeletedBtn').classList.toggle('active', showDeleted);
    const otherClassBtn = document.getElementById('toggleOtherClassBtn');
    if (otherClassBtn) otherClassBtn.classList.toggle('active', showOtherClass);
    const groupLockedBtn = document.getElementById('toggleGroupLockedBtn');
    if (groupLockedBtn) groupLockedBtn.classList.toggle('active', hideGroupLocked);
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
    const groupOccupants = getGroupOccupants();

    let filtered = legendMarks.filter(mark => {
      const searchMatch = mark.text.toLowerCase().includes(currentFilter.toLowerCase());
      const deletedMatch = showDeleted ? deletedMarks.has(mark.text) : !deletedMarks.has(mark.text);
      const categoryMatch = categoryFilter ? mark.category === categoryFilter : true;

      const isLocked = mark.uniqueGroup && groupOccupants[mark.uniqueGroup] && groupOccupants[mark.uniqueGroup] !== mark.text;
      const groupMatch = (hideGroupLocked && isLocked && !checkedMarks.has(mark.text)) ? false : true;

      return searchMatch && deletedMatch && categoryMatch && groupMatch;
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
    
    const playerClass = getPlayerClass(currentCharacter);

    container.innerHTML = filtered.map(mark => {
      const markClasses = getMarkClasses(mark);
      const isDeleted = deletedMarks.has(mark.text);
      const isChecked = checkedMarks.has(mark.text);
      const isWrongClass = mark.classExclusive === 'Yes' && playerClass && markClasses.length && !markClasses.includes(playerClass);
      const lockedBy = mark.uniqueGroup ? groupOccupants[mark.uniqueGroup] : null;
      const isGroupLocked = lockedBy && lockedBy !== mark.text;
      const isDisabled = isDeleted || isGroupLocked;
      return `
        <div class="legend-mark-item ${isChecked ? 'checked' : ''} ${isDeleted ? 'deleted' : ''} ${isWrongClass ? 'other-class' : ''} ${isGroupLocked ? 'group-locked' : ''}" data-mark="${escapeHtml(mark.text)}">
          <input type="checkbox" ${isChecked ? 'checked' : ''} data-mark="${escapeHtml(mark.text)}" ${isDisabled ? 'disabled' : ''}>
          <span class="legend-mark-text legend-mark-color-${mark.color.toLowerCase()}">${escapeHtml(mark.text)}</span>
          <span class="legend-mark-category" title="${escapeHtml(mark.subcategories || '')}">${escapeHtml(mark.category || 'Unknown')}</span>
          ${mark.uniqueGroup ? `<span class="legend-mark-unique-group" title="Only 1 mark from this group can be obtained at a time">${escapeHtml(mark.uniqueGroup)}</span>` : ''}
          ${mark.classExclusive === 'Yes' && mark.subcategories ? `<span class="legend-mark-class-exclusive" title="Class Exclusive">${escapeHtml(markClasses.join(', '))}</span>` : ''}
          ${mark.public !== 'Yes' ? `<span class="legend-mark-private" title="Private mark - not visible on public legend">Private</span>` : ''}
          ${mark.obtainable !== 'Yes' ? `<span class="legend-mark-unobtainable" title="No longer obtainable">Unobtainable</span>` : ''}
          ${isWrongClass ? `<span class="legend-mark-unobtainable" title="Not available to your class">Wrong Class</span>` : ''}
          ${isGroupLocked ? `<span class="legend-mark-group-locked" title="Unavailable - ${escapeHtml(lockedBy)} was already obtained from this group">🔒 Locked</span>` : ''}
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
    /* Don't toggle if deleted or locked out by a mutually-exclusive group mark */
    if (item.classList.contains('deleted') || item.classList.contains('group-locked')) return;
    
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

    saveCheckedState();
    /* Full re-render, since checking/unchecking a uniqueGroup mark can lock or
       unlock other marks that share that group */
    renderList();
    updateStats();
  }

  function updateStats() {
    const total = legendMarks.length;
    const checked = checkedMarks.size;

    const groupOccupants = getGroupOccupants();
    const remaining = legendMarks.filter(mark => {
      if (checkedMarks.has(mark.text) || deletedMarks.has(mark.text)) return false;
      const lockedBy = mark.uniqueGroup ? groupOccupants[mark.uniqueGroup] : null;
      if (lockedBy && lockedBy !== mark.text) return false;
      return true;
    }).length;
    
    document.getElementById('totalCount').textContent = total;
    document.getElementById('checkedCount').textContent = checked;
    const remainingEl = document.getElementById('remainingCount');
    if (remainingEl) remainingEl.textContent = remaining;
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

  document.getElementById('toggleOtherClassBtn').addEventListener('click', () => {
    showOtherClass = !showOtherClass;
    filterMarks();
    renderList();
    updateStats();
  });

  document.getElementById('toggleGroupLockedBtn').addEventListener('click', () => {
    hideGroupLocked = !hideGroupLocked;
    renderList();
    updateStats();
  });

  // document.getElementById('fileInput').addEventListener('change', async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;
    
  //   document.getElementById('fileName').textContent = file.name;
    
  //   const text = await file.text();
  //   const lines = text.split('\n').map(line => line.trim()).filter(line => line);
    
  //   let matchCount = 0;
  //   lines.forEach(line => {
  //     const match = legendMarks.find(mark => 
  //       line.includes(mark.text) || mark.text.includes(line)
  //     );
  //     if (match) {
  //       checkedMarks.add(match.text);
  //       matchCount++;
  //     }
  //   });
    
  //   alert(`Matched ${matchCount} legend marks from file`);
  //   saveCheckedState();
  //   renderList();
  //   updateStats();
  // });

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

  function normalizeMarkText(text) {
    return getBaseText(text);
  }

  /* The API returns each legend as free text like "Aided the Pact of Anaman"
     or, for dated/repeatable marks, "Able to Sponsor 3 - Deoch 51, Winter".
     We match by checking whether the legend text *starts with* a mark's
     normalized text, since any count or date suffix is appended after it.
     This is a best-effort match - if legend text formatting differs from
     this assumption for some mark types, matches may be missed. */
  function matchApiLegendsToMarks(legends) {
    const matched = new Set();
    const candidates = allLegendMarks
      .map(mark => ({ mark, norm: normalizeMarkText(mark.text) }))
      .filter(c => c.norm);

    (legends || []).forEach(legend => {
      const normalized = normalizeMarkText(legend.legend_text);
      candidates.forEach(({ mark, norm }) => {
        const removedPlaceholder = norm.replaceAll(/<[^>]+>/g, '').trim();
        if (normalized === removedPlaceholder) {
          matched.add(mark.text);
        }
      });
    });

    console.log(`marks: ${legends.length}, matched: ${matched.size}`);

    // const legendsSet = new Set(legends.map(l => normalizeMarkText(l.legend_text)));
    // const unmatched = legendsSet.difference(matched);
    // for (const entry of unmatched.entries()) {
    //   console.log({entry});
    // }

    return matched;
  }

  async function fetchPlayerData(name) {
    const response = await fetch(API_BASE + encodeURIComponent(name));
    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }
    return response.json();
  }

  async function syncCharacterData(name) {
    if (!name) return;
    const statusEl = document.getElementById('syncStatus');
    const btn = document.getElementById('syncApiBtn');
    if (btn) btn.disabled = true;
    if (statusEl) statusEl.textContent = 'Syncing with Aisling Exchange...';

    try {
      const data = await fetchPlayerData(name);
      const className = (data.player && data.player.class_name) || '';
      const legends = data.legends || [];

      playerApiData[name] = {
        className,
        legends,
        fetchedAt: new Date().toISOString()
      };
      savePlayerApiData();

      const matched = matchApiLegendsToMarks(legends);
      let newlyChecked = 0;
      matched.forEach(markText => {
        if (!checkedMarks.has(markText)) {
          checkedMarks.add(markText);
          newlyChecked++;
        }
      });
      saveCheckedState();

      filterMarks();
      renderList();
      updateStats();
      updatePlayerClassDisplay();

      if (statusEl) {
        statusEl.textContent = `Synced. Class: ${className || 'Unknown'} — ${matched.size} marks matched (${newlyChecked} newly checked).`;
      }
    } catch (error) {
      console.error('Error syncing player data:', error);
      if (statusEl) {
        statusEl.textContent = 'Sync failed — the Aisling Exchange API may be unreachable, or this Aisling was not found.';
      }
    } finally {
      if (btn) btn.disabled = false;
    }
  }

  const syncBtn = document.getElementById('syncApiBtn');
  if (syncBtn) {
    syncBtn.addEventListener('click', () => syncCharacterData(currentCharacter));
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  const PET_NAMES = [
    'male pig',
    'scorpion',
    'wasp',
    'succubus',
    'viper',
    'centipede',
    'erbie',
    'gremlin',
    'marauder',
    'bast',
    'pink floppy',
    'dragon',
    'kardi',
    'horse',
    'deer',
    'blaze',
    'kraken',
    'brawlfish',
    'turtle',
    'holiday erbie',
    'sand rat',
    'leech',
    'smily blob',
    'skrull',
    'grime',
    'beetle',
    'chicken',
    'green starfish',
    'female pig',
    'enchanted beast',
    'three-eyed eagle',
    'golden floppy',
    'giant floppy',
    'kit',
    'blue octopus',
    'spinning doll',
    'ghost',
    'polyp',
    'brown octopus',
    'carnun champion',
    'kelberoth',
    'mouse',
    'red starfish',
    'rouge mushroom 2',
    'rouge mushroom 3',
    'unmasked warrior',
    'chicks',
    'green droplet',
    'fenix',
    'crab',
    'wolf',
    'flame',
    'mantis',
    'pupa',
    'bat',
    'larva',
    'fox',
    'scrummel',
    'smoldy',
    'namu',
    'gel',
    'green wasp',
    'cursed dog',
    'black scorpion',
    'winter erbie',
    'baby brute',
    'grim succubus',
    'grey yowie',
    'snek',
    'reindeer',
    'boney dragon',
    'frog',
    'white baboon',
    'rock scorpion',
    'vulture',
    'salog',
    'hyena',
    'nagetier',
    'nikuru',
  ];

  function getBaseText(fullText) {
    if (!fullText) {
      return '';
    }
    let baseText = fullText;
    // Remove any "- Deoch X" text and anything after it
    baseText = baseText.split(/ (- |since )?Deoch \d+,/)[0].trim();
    baseText = baseText.replace(/^(Mileth|Abel|Piet|Rucesion|Undine|Suomi) mundane birth .+$/, '$1 mundane birth').trim();
    // baseText = baseText.split(/ - (Spring|Summer|Fall|Winter).+/)[0].trim(); // this trims certain marks incorrectly
    baseText = baseText.replace(/\(Deoch \d+[^\)]+\)/, '').trim();
    // Remove any marks ending in a number
    baseText = baseText.replace(/ - \d+$/, '').trim();
    baseText = baseText.replace(/ \(\d+\)$/, '').trim();
    baseText = baseText.replace(/: \d+$/, '').trim();
    baseText = baseText.replace(/ \(\d+\)$/, '').trim();
    baseText = baseText.replace(/ \d+$/, '').trim();
    // Remove pet/friend/buddy names
    // A regex which matches "Owner of pet (pet1|pet2|pet3) .+" from constants.PET_NAMES
    const petRegex = new RegExp(`^Owner of pet (${PET_NAMES.join('|')}) .+$`, 'i');
    baseText = baseText.replace(petRegex, 'Owner of pet $1').trim();
    baseText = baseText.replace(/^Friend of (Leprechaun|Faerie) .+$/, 'Friend of $1').trim();
    baseText = baseText.replace(/^Buddy of (Zombie|Mummy) .+$/, 'Buddy of $1').trim();
    // Remove various Aisling names
    baseText = baseText.replace(/( by oath of) .+/, '$1').trim();
    baseText = baseText.replace(/^Loves \w+$/, 'Loves').trim();
    baseText = baseText.replace(/^Broke up with .+$/, 'Broke up with').trim();
    baseText = baseText.replace(/^Broke up \w+'s love$/, 'Broke up love').trim();
    baseText = baseText.replace(/^Joined \w+ to a lover$/, 'Joined to a lover').trim();
    baseText = baseText.replace(/^Married \w+$/, 'Married').trim();
    baseText = baseText.replace(/^Divorced .+$/, 'Divorced').trim();
    baseText = baseText.replace(/^Performed divorce of \w+$/, 'Performed divorce of').trim();
    baseText = baseText.replace(/^Mentored \w+$/, 'Mentored').trim();
    baseText = baseText.replace(/^Mentored by \w+$/, 'Mentored by').trim();
    baseText = baseText.replace(/^Currently mentored by \w+$/, 'Currently mentored by').trim();
    baseText = baseText.replace(/(, guided by) \w+$/, '$1').trim();
    baseText = baseText.replace(/(Heart of Moon|Heart of Fire) with \w+$/, '$1 with').trim();
    baseText = baseText.replace(/Fair (Queen|King) with \w+$/, 'Fair $1 with').trim();
    baseText = baseText.replace(/(Went on a picnic with) \w+$/, '$1').trim();
    baseText = baseText.replace(/(Plans heresy on) \w+$/, '$1').trim();
    baseText = baseText.replace(/(Instigated heresy against) \w+$/, '$1').trim();
    baseText = baseText.replace(/(Acolye by) \w+$/, '$1').trim();
    baseText = baseText.replace(/^Guided (Monk|Warrior|Rogue|Priest|Wizard) \w+$/, 'Guided $1').trim();
    baseText = baseText.replace(/^- Initiated (Monk|Warrior|Rogue|Priest|Wizard) \w+$/, '- Initiated $1').trim();
    baseText = baseText.replace(/^(\w+ Dugon by) \w+$/, '$1').trim();
    baseText = baseText.replace(/^(Admitted Citizen) \w+$/, '$1').trim();
    baseText = baseText.replace(/^(Initiated Worshipper) \w+$/, '$1').trim();
    baseText = baseText.replace(/^(Exiled Guild member) \w+$/, '$1').trim();
    baseText = baseText.replace(/^(Exiled from Guild by) \w+$/, '$1').trim();
    baseText = baseText.replace(/^(Exiled from Mileth by) \w+$/, '$1').trim();
    baseText = baseText.replace(/^(Exiled from Rucesion by) \w+$/, '$1').trim();
    baseText = baseText.replace(/^(Exiled from Arena by) \w+$/, '$1').trim();
    baseText = baseText.replace(/^(Admitted Guild member) \w+$/, '$1').trim();
    baseText = baseText.replace(/^(Glioca|Fiosachd|Ceannlaidir|Gramail|Luathas|Sgrios|Cail|Deoch) (Acolyte|Priest|Minister|Cleric|High Priest) by \w+$/, '$1 $2 by').trim();
    baseText = baseText.replace(/^- (Glioca|Fiosachd|Ceannlaidir|Gramail|Luathas|Sgrios|Cail|Deoch) (Worshipper|Probate) by \w+$/, '- $1 $2 by').trim();
    baseText = baseText.replace(/^(Burgess by) \w+$/, '$1').trim();
    baseText = baseText.replace(/^(Demagogue by) \w+$/, '$1').trim();
    baseText = baseText.replace(/^(Completed religious geas for) \w+$/, '$1').trim();
    baseText = baseText.replace(/^(Completed Guild Geas for) \w+$/, '$1').trim();
    baseText = baseText.replace(/^(Completed motley Geas for) \w+$/, '$1').trim();
    baseText = baseText.replace(/^Initiated \w+ into a Motley$/, 'Initiated into a Motley').trim();
    baseText = baseText.replace(/^(Excommunicated) \w+$/, '$1').trim();
    baseText = baseText.replace(/^(Excommunicated by) \w+$/, '$1').trim();
    baseText = baseText.replace(/^(Pardoned exiled of) \w+$/, '$1').trim();
    baseText = baseText.replace(/^(Summoned to Court by) \w+$/, '$1').trim();
    baseText = baseText.replace(/^(Sgath scar by) \w+$/, '$1').trim();
    baseText = baseText.replace(/^(Sgath summoning on) \w+$/, '$1').trim();
    baseText = baseText.replace(/^(Politically Sponsored by) \w+$/, '$1').trim();
    baseText = baseText.replace(/^(Removed from office by) \w+$/, '$1').trim();
    baseText = baseText.replace(/^(Exiled) \w+$/, '$1').trim();
    baseText = baseText.replace(/^(Annoyed) \w+$/, '$1').trim();
    baseText = baseText.replace(/^(- Plans coup d'etat of) .+/, '$1').trim();
    baseText = baseText.replace(/^(Formerly known as) \w+$/, '$1').trim();
    baseText = baseText.replace(/^(Arrested by) \w+ \(\(Auto Hunting\)\)$/, '$1').trim();
    baseText = baseText.replace(/^(Mileth College Chancellor),? by .*$/, '$1').trim();
    // Remove more numbers from marks
    baseText = baseText.replace(/^Zombie Slayer Record: .+$/, 'Zombie Slayer Record').trim();
    baseText = baseText.replace(/^Sabonim of \d+ Dugon$/, 'Sabonim of Dugon').trim();
    baseText = baseText.replace(/^Jailed \d+ times - last by \w+$/, 'Jailed').trim();
    baseText = baseText.replace(/^Won \d+ Pit Fights$/, 'Won Pit Fights').trim();
    baseText = baseText.replace(/^Has Defeated \d+ of Oren's Pirates$/, 'Has Defeated Oren\'s Pirates').trim();
    baseText = baseText.replace(/^Murdered \d+ Tagor citizens$/, 'Murdered Tagor citizens').trim();
    baseText = baseText.replace(/^Has \d+ Disciples$/, 'Has Disciples').trim();
    baseText = baseText.replace(/^Sentenced \d+ Criminals$/, 'Sentenced Criminals').trim();
    baseText = baseText.replace(/^Killed \d+ Dark Aislings$/, 'Killed Dark Aislings').trim();
    baseText = baseText.replace(/^Set .+ as (first|second|third) move$/, 'Set as $1 move').trim();
    baseText = baseText.replace(/^(Fire|Water|Earth) Reverence$/, `$1 Reverence`).trim();
    baseText = baseText.replace(/^Founded .+ Guild$/, 'Founded Guild with name').trim();
    baseText = baseText.replace(/^(Founded\s+Guild)$/, `$1`).trim();
    baseText = baseText.replace(/Catcher-$/, 'Catcher').trim();

    let nonIncrementMatch = fullText.match(/^(\w+'s) Redemption at (\w+) - Deoch \d+, \w+$/)
    if (nonIncrementMatch && nonIncrementMatch[1] && nonIncrementMatch[2]) {
        // If the mark is a special non-incrementing Redemption mark
        baseText = `${nonIncrementMatch[1]} Redemption at ${nonIncrementMatch[2]} non-incrementing`;
    }

    nonIncrementMatch = fullText.match(/^Eulogy to (\w+) at (\w+) - Deoch \d+, \w+$/)
    if (nonIncrementMatch && nonIncrementMatch[1] && nonIncrementMatch[2]) {
        // If the mark is a special non-incrementing Eulogy mark
        baseText = `Eulogy to ${nonIncrementMatch[1]} at ${nonIncrementMatch[2]} non-incrementing`;
    }

    nonIncrementMatch = fullText.match(/^(Adoration of Danaan) - Deoch \d+, \w+$/)
    if (nonIncrementMatch && nonIncrementMatch[1]) {
        // If the mark is a special non-incrementing Eulogy mark
        baseText = `Adoration of Danaan non-incrementing`;
    }
    
    // misc fixes
    baseText = baseText.replace(/,$/, '').trim(); // Remove trailing comma

    if (baseText === 'Event') {
        baseText = fullText; // If the base text is just "Event", keep the full text, with Deoch, to keep them distinct
    }

    return baseText;
  }

  loadLegendMarks();
})();
