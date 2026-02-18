async function loadAislingLegends() {
    const years = [2026, 2025, 2024, 2010, 2009, 2008, 2007];
    const latestAislingYear = {};

    function appendName(nameList, name, year) {
        const li = document.createElement('li');
        const link = document.createElement('a');
        const lowercase = name.toLowerCase();
        link.href = `/assets/img/aisling-legends/${lowercase}-${year}.png`;
        link.textContent = name;
        link.title = `${name} - ${year}`;
        li.appendChild(link);
        nameList.appendChild(li);
    }

    for (const year of years.reverse()) {
        const response = await fetch(`/assets/json/profiles-${year}.json`);
        const names = await response.json();
        names.forEach(name => {
            latestAislingYear[name.toLowerCase()] = `${name}-${year}`;
        });
    }

    const nameList = document.getElementById(`name-list`);
    const aislings = Object.values(latestAislingYear);
    aislings.sort((a, b) => {
        const [nameA, yearA] = a.split('-');
        const [nameB, yearB] = b.split('-');

        if (nameA.toLowerCase() < nameB.toLowerCase()) return -1;
        if (nameA.toLowerCase() > nameB.toLowerCase()) return 1;
        return yearB - yearA; // Sort by year descending if names are the same
    });

    aislings.forEach((aisling) => {
        const [name, year] = aisling.split('-');
        appendName(nameList, name, year);
    });

    document.getElementById('search').addEventListener('input', function () {
        const filter = this.value.toLowerCase();
        const listItems = document.querySelectorAll(`#name-list li`);
        let visibleCount = 0;
        listItems.forEach(function (li) {
            const text = li.textContent.toLowerCase();
            const isVisible = text.includes(filter);
            li.style.display = isVisible ? '' : 'none';
            if (isVisible) visibleCount++;
        });
    });
}

try {
    loadAislingLegends();
} catch (error) {
    console.error('Error loading Aisling legends:', error);
}
