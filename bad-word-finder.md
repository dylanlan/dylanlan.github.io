---
layout: page
title:  Bad Word Finder
permalink: /bad-words
---


# Bad Word Finder

Struggling to post on a board or send a mail due to hidden "curse words"? Try pasting your text in here to find which word might be getting blocked!

<textarea id="badWordsInput" placeholder="Paste your text here..."></textarea>

<div>
    <strong>Result:</strong>
</div>
<div id="badWordsOutput"></div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const blockedWords = [
            'lol', 'lmao', 'lmfao', 'rofl', 'ioi', 'thx', 'brb', 'afk', 'internet protocol', 'password', 

            'fuck', /fu+ck/, 'shit', 'piss', 'stfu', 'gtfo', 'wtf', 'ffs', 'asshole', 'bukake', 'bastard', 'basterd', 'bitch', 'slut', 'cunt', 'clit', 'dildo', 'douche', 'jizz', 'pussy', 'whore', 'pussy', 'vagina', 'cock', 'dick', 'penis', 'fag', 'nigg', 'niger', 'nazi', 'gay', 'homo', 'queer',
        ];

        const notBlockedWords = [
            'retard', 'rape', 'damn', 'ass', 'crap', 'hell', 'tit', 'lesbian', 
        ];

        const blockedCharNameWords = [
            'warrior', 'priest', 'wizard', 'rogue', 'dance', 'home', 'test', 'super', 'free' 
        ];
        
        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
        
        function highlightBlockedWords(text) {
            if (!text) return '';
            
            let result = escapeHtml(text);
            
            const sortedWords = [...blockedWords].sort((a, b) => b.length - a.length);
            
            sortedWords.forEach(word => {
                const regex = new RegExp(word, 'gi');
                result = result.replace(regex, match => {
                    return `<span class="badWordsHighlight">${match}</span>`;
                });
            });
            
            return result;
        }
        
        const textInput = document.getElementById('badWordsInput');
        const output = document.getElementById('badWordsOutput');
        
        if (textInput && output) {
            textInput.addEventListener('input', function() {
                const text = this.value;
                const highlighted = highlightBlockedWords(text);
                output.innerHTML = highlighted || '<em style="color: #999;">Your text will appear here with blocked words highlighted...</em>';
                
                if (text) {
                    const hasBlockedWord = blockedWords.some(word => {
                        const regex = new RegExp(word, 'gi');
                        return regex.test(text);
                    });
                    
                    output.style.backgroundColor = hasBlockedWord ? '#f5f5f5' : '#ccffcc';
                } else {
                    output.style.backgroundColor = '#f5f5f5';
                }
            });
            
            output.innerHTML = '<em style="color: #999;">Your text will appear here with blocked words highlighted...</em>';
        }
    });
</script>



