---
layout: page
title: Aisling Legends
permalink: /aisling-legends/
---

# Aisling Profiles

<input type="text" id="search" placeholder="Search names..." style="margin-bottom: 1em; padding: 0.5em; width: 100%;" />

Here's a collection of various Aisling profiles and legend marks over the years!

## 2025 Legends

<div class="year-scroll">
    <ul id="name-list-2025"></ul>
</div>

## 2024 Legends

<div class="year-scroll">
    <ul id="name-list-2024"></ul>
</div>

## 2010 Profiles

<div class="year-scroll">
    <ul id="name-list-2010"></ul>
</div>

## 2009 Profiles

<div class="year-scroll">
    <ul id="name-list-2009"></ul>
</div>

## 2008 Profiles

<div class="year-scroll">
    <ul id="name-list-2008"></ul>
</div>

## 2007 Profiles

<div class="year-scroll">
    <ul id="name-list-2007"></ul>
</div>


<script>
    const years = [2025, 2024, 2010, 2009, 2008, 2007];

    function appendNames(nameList, names, year) {
        names.forEach(function(name) {
            const li = document.createElement('li');
            const link = document.createElement('a');
            const lowercase = name.toLowerCase();
            link.href = `/assets/img/aisling-legends/${lowercase}-${year}.png`;
            link.textContent = name;
            li.appendChild(link);
            nameList.appendChild(li);
        });
    }

    years.forEach(function(year) {
        fetch(`/assets/json/profiles-${year}.json`)
            .then(response => response.json())
            .then(names => {
                const nameList = document.getElementById(`name-list-${year}`);
                appendNames(nameList, names, year);
            });
    });

    document.getElementById('search').addEventListener('input', function () {
        const filter = this.value.toLowerCase();
        years.forEach(function(year) {
            const listItems = document.querySelectorAll(`#name-list-${year} li`);
            let visibleCount = 0;
            listItems.forEach(function (li) {
                const text = li.textContent.toLowerCase();
                const isVisible = text.includes(filter);
                li.style.display = isVisible ? '' : 'none';
                if (isVisible) visibleCount++;
            });
            
            const nameList = document.getElementById(`name-list-${year}`);
            const header = nameList.closest('div').previousElementSibling;
            if (visibleCount === 0) {
                if (header && header.tagName.startsWith('H')) {
                    header.style.display = 'none';
                }
                nameList.closest('div').style.display = 'none';
            } else {
                if (header && header.tagName.startsWith('H')) {
                    header.style.display = '';
                }
                nameList.closest('div').style.display = '';
            }
        });
    });
</script>
