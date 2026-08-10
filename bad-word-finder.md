---
layout: page
title:  Bad Word Finder
permalink: /bad-words
---


# Bad Word Finder

Help find accidental blocked words in-game

<h2>Board Posts <button class="infoTooltip" type="button" aria-label="About the board post checker"><span aria-hidden="true">i</span><span class="infoTooltipText" role="tooltip">Struggling to post on a board or send a mail due to hidden "curse words"? Try pasting your text in here to find which word might be getting blocked.</span></button></h2>

<div id="badWordsInputContainer" class="badWordsInputContainer">
    <div id="badWordsInputHighlight" class="badWordsInputHighlight" aria-hidden="true"></div>
    <textarea id="badWordsInput" placeholder="Paste your text here..."></textarea>
</div>
<details class="blockedWordsList">
    <summary>View blocked words</summary>
    <ul id="boardBlockedWordsList"></ul>
</details>

<h2>Aisling Name Checker <button class="infoTooltip" type="button" aria-label="About the Aisling name checker"><span aria-hidden="true">i</span><span class="infoTooltipText" role="tooltip">Trying to create a new Aisling but it's saying the name might "contain a reserved string"? Try typing the name in here to check if part of it is getting blocked.</span></button></h2>

<div id="charNameInputContainer" class="badWordsInputContainer">
    <div id="charNameInputHighlight" class="badWordsInputHighlight" aria-hidden="true"></div>
    <input id="charNameInput" type="text" placeholder="Enter an Aisling name...">
</div>
<details class="blockedWordsList">
    <summary>View blocked words</summary>
    <ul id="charNameBlockedWordsList"></ul>
</details>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const blockedWords = [
            'lol', 'lmao', 'lmfao', 'rofl', 'ioi', 'thx', 'brb', 'afk', 'internet protocol', 'password', 

            'fuck', /fuu+/, 'fuq', 'fuk', 'shit', 'piss', 'stfu', 'gtfo', 'wtf', 'ffs', 'asshole', 'bukake', 'bastard', 'basterd', 'bitch', 'slut', 'cunt', 'clit', 'dildo', 'douche', 'jizz', 'pussy', 'whore', 'pussy', 'vagina', 'cock', 'dick', 'penis', 'fag', 'nigg', 'niger', 'nazi', 'gay', 'homo', 'queer',
        ];

        const notBlockedWords = [
            'retard', 'rape', 'damn', 'ass', 'crap', 'hell', 'tit', 'lesbian', 
        ];

        const blockedCharNameWords = [
            'warrior', 'priest', 'wizard', 'rogue', 'dance', 'home', 'test', 'super', 'free', 'lag', 'quest', 'master', 'retard', 'rape', 'damn', 'ass', 
        ];
        
        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
        
        function highlightBlockedWords(text, words = blockedWords) {
            if (!text) return '';
            
            let result = escapeHtml(text);

            const sortedPatterns = [...words]
                .map(word => word instanceof RegExp ? word.source : word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
                .sort((a, b) => b.length - a.length);
            const regex = new RegExp(sortedPatterns.join('|'), 'gi');

            result = result.replace(regex, match => {
                return `<span class="badWordsHighlight">${match}</span>`;
            });
            
            return result;
        }
        
        const textInput = document.getElementById('badWordsInput');
        const textInputHighlight = document.getElementById('badWordsInputHighlight');
        const textInputContainer = document.getElementById('badWordsInputContainer');
        const charNameInput = document.getElementById('charNameInput');
        const charNameInputHighlight = document.getElementById('charNameInputHighlight');
        const charNameInputContainer = document.getElementById('charNameInputContainer');
        const boardBlockedWordsList = document.getElementById('boardBlockedWordsList');
        const charNameBlockedWordsList = document.getElementById('charNameBlockedWordsList');
        const charNameBlockedWords = [...blockedWords, ...blockedCharNameWords];

        function setInputHighlight(input, highlight, container, words) {
            const text = input.value;
            highlight.innerHTML = highlightBlockedWords(text, words);

            if (text) {
                const hasBlockedWord = words.some(word => new RegExp(word, 'gi').test(text));
                container.style.backgroundColor = hasBlockedWord ? '#f5f5f5' : '#ccffcc';
            } else {
                container.style.backgroundColor = '#f5f5f5';
            }
        }

        function initializeInputHighlight(input, highlight, container, words) {
            if (!input || !highlight || !container) return;

            input.addEventListener('input', () => setInputHighlight(input, highlight, container, words));
            input.addEventListener('scroll', () => {
                highlight.scrollTop = input.scrollTop;
                highlight.scrollLeft = input.scrollLeft;
            });
            setInputHighlight(input, highlight, container, words);
        }

        function populateBlockedWordsList(list, words) {
            if (!list) return;

            const uniqueWords = [...new Set(words.map(word => word instanceof RegExp ? word.source : word))]
                .sort((a, b) => a.localeCompare(b));

            list.innerHTML = uniqueWords.map(word => `<li>${escapeHtml(word)}</li>`).join('');
        }

        initializeInputHighlight(textInput, textInputHighlight, textInputContainer, blockedWords);
        initializeInputHighlight(charNameInput, charNameInputHighlight, charNameInputContainer, charNameBlockedWords);
        populateBlockedWordsList(boardBlockedWordsList, blockedWords);
        populateBlockedWordsList(charNameBlockedWordsList, charNameBlockedWords);
    });
</script>



