---
layout: page
title: Aisling Legends
permalink: /aisling-legends/
---

<input type="text" id="search" placeholder="Search names..." style="margin-bottom: 1em; padding: 0.5em; width: 100%;" />

Here's a collection of various Aisling profiles and legend marks over the years!

Note that some of them have the last chunk of their legend marks duplicated, due to a limitation in how I'm stitching them together which needs manual fixing

## 2025

<ul id="name-list-2025"></ul>

## 2024

<ul id="name-list-2024"></ul>

## 2008

<ul id="name-list-2008"></ul>

## 2007

<ul id="name-list-2007"></ul>


<script>
    const names2025 = [
        'Adriela',
        'Ailred',
        'Amarranth',
        'Angelic',
        'Angelynn',
        'Arpina',
        'bearly',
        'beerbottle',
        'Bindo',
        'binnie',
        'bladeg',
        'bladejdg',
        'blader',
        'Blanche',
        'BlueFountain',
        'bLuEjR',
        'blueskye',
        'Bojingies',
        'Bruiser',
        'Bywyd',
        'Carnaugh',
        'Cherrius',
        'cutiejg',
        'DancingWind',
        'Dender',
        'Dionia',
        'Doms',
        'DoubleMint',
        'DoomHealer',
        'Drucilla',
        'Duplico',
        'Elzhi',
        'eLZioN',
        'Falconlady',
        'FFeightBest',
        'Firemayden',
        'Gaia',
        'Hien',
        'Hoshiko',
        'Iglis',
        'impuneToo',
        'iShallHeal',
        'JadeAkaino',
        'Jennifer',
        'Jerry',
        'Kedian',
        'Khloe',
        'Kimchii',
        'Krytos',
        'Lancelot',
        'Landon',
        'Lexem',
        'LlamaTacoo',
        'LovenPretty',
        'Lux',
        'mavrik',
        'Mayheart',
        'melon',
        'Mintofkali',
        'Missgreenry',
        'MlKE',
        'Moogle',
        'Nenya',
        'NeroZeroXe',
        'Never',
        'niZon',
        'notvorlof',
        'OceanWind',
        'panda',
        'Paramour',
        'PinkLily',
        'Protoman',
        'Raiphie',
        'Rocandy',
        'Rorrik',
        'Rune',
        'SaintAsher',
        'San',
        'Seidon',
        'SilentNite',
        'Snooze',
        'Somae',
        'Soundwave',
        'StarShine',
        'StarSparkler',
        'Ulli',
        'Turtlehermit',
        'Tristam',
        'Theowin',
        'Thubub',
        'Twinkle',
        'TwinkleStar',
        'Ubrei',
        'Vamistle',
        'VanMorgan',
        'Wastedd',
        'Willco',
        'Wormtongue',
        'Xoody',
        'xYourAngelx',
        'Yawgmoth',
        'Zaos',
        'Zaxa',
        'Zeix',
        'ZerA',
        'zGerbz',
        'ZhongFou',
        'ZoD',
        'Zwuji',
    ];
    const names2024 = [
        'Acesin',
        'Alvino',
        'And',
        'Aon',
        'AresFalco',
        'Arohanui',
        'Auzric',
        'Bea',
        'BioMagus',
        'BoJingles',
        'Brittany',
        'Cazbrileth',
        'Como',
        'Demylong',
        'Disarray',
        'Dylanlan',
        'Dynamus',
        'Eiscego',
        'Eternalty',
        'Exonyte',
        'FatalRevenge',
        'FFninen',
        'Final',
        'FrauLynn',
        'Giggles',
        'Hihaku',
        'Huhuman',
        'Ishikawa',
        'Jaice',
        'JessicaP',
        'Kald',
        'Kallina',
        'Laurier',
        'Leemon',
        'makeup',
        'Makunouchi',
        'Merisa',
        'Moogle',
        'MrMvP',
        'Naena',
        'NaLyd',
        'NeoxBahamut',
        'NoirGato',
        'Peppita',
        'Ramanayan',
        'Renvo',
        'ReyaKeely',
        'Ridiickai',
        'Set',
        'Sick',
        'Srgious',
        'SunYukii',
        'Tazz',
        'Telme',
        'TriDemp',
        'Venezia',
        'Viveena',
        'Warginald',
        'Wizadrian',
        'yLo',
        'Yukii',
        'Zurf',
    ];
    const names2008 = [
        'PrincessM',
        'TrainerWiz',
    ];
    const names2007 = [
        'BioMagus',
        'Franees',
        'Galaxis',
        'Malache',
        'Shoguo',
        'Vamistle',
    ];
    const years = [2025, 2024, 2008, 2007];
    const nameList2025 = document.getElementById('name-list-2025');
    const nameList2024 = document.getElementById('name-list-2024');
    const nameList2008 = document.getElementById('name-list-2008');
    const nameList2007 = document.getElementById('name-list-2007');

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

    appendNames(nameList2025, names2025, 2025);
    appendNames(nameList2024, names2024, 2024);
    appendNames(nameList2008, names2008, 2008);
    appendNames(nameList2007, names2007, 2007);

    document.getElementById('search').addEventListener('input', function () {
        const filter = this.value.toLowerCase();
        years.forEach(function(year) {
            const listItems = document.querySelectorAll(`#name-list-${year} li`);

            listItems.forEach(function (li) {
                const text = li.textContent.toLowerCase();
                li.style.display = text.includes(filter) ? '' : 'none';
            });
        });
    });
</script>
