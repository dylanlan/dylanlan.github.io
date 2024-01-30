---
layout: page
title:  Darkages Bugs or Quality of Life Suggestions
permalink: /qol/
---

A random and incomplete list of various known bugs or quality of life suggestions for Darkages!

If you're curious about bugs / features of this site itself, check out its own [QoL]({{ site.data.urls.blog-qol }}) page


### Misc Bugs
- "You are too busy", when trying to polish gems. Need to log off and log back in to fix it. Annoying.
- "You are distracted", when trying to use certain popups for quests / dialogue etc. Often need to just retry.
- Coming soon: Maybe just one or two more bugs (right??)

### Skills / Spells (QoL)
- Many skills take wayyyy to long to level up to 100/100, yet are still required to master (eg: wind blade). Even though the dojo exists, it'd still be nice to trim them down from like 24 hours to 8 hours, or something

### Religion (QoL)
- Allow everyone to benefit from a mass sermon rewards (regardless of which deity they worship)
- Allow anyone to become a "priest" of a religion, not just the literal priest class

### Towns (QoL)
- Make Rucesion a full alternative to Mileth. The ability to get perma-banished from Mileth, and still play the game fully
- Add Altars to other towns? Ruc, Piet, Abel, Suomi, Blackstar? Oren? Medenia??

### Professions (QoL)
- Increase the (10) cap on your legend (or make the additional counts non-private)
- More fun and obvious benefits from increasing profession skills (eg: higher quality tiers? needed for quests?)
- Allow tailoring / smithing / enhancing / consecrating as many items as possible

### Quests (QoL)
- Remove upper level caps from all quests, so that you can't "miss out" on them / need a low-level character for them. (But keeping a minimum level requirement is still good)
- Better toughness scaling for higher levels, so a master doing "Terror of the Crypt", or "Pentagram" has a more enjoyable experience
- Better rewards from various quests. Maybe a legend mark for every single quest? Chance at rare item from more quests? Cosmetic items?
- Less class-exclusive requirements for commonly needed quest rewards (eg: Diamond Ore from Unknown Depths)

### Events (QoL)
- The Insect Event is .... very tedious. But it has amazing rewards! It would be nice to at least have separate "copies" of the maps, similar to the dojo for training. Often 10+ Aislings might be fighting for bugs in the same area, which is not fun.

### Bank Storage (QoL)
Super painful to use, for multiple reasons:

- Cannot bank certain items, ever (eg: ... Bonus points for items that ALSO CAN'T BE TRADED WTF!). Maybe 99% of things should be both bankable and tradeable! (LUMENS!)
- Cannot easily search which items you have banked on one Aisling, or across all Aislings
- Cannot easily deposit/withdraw multiples of certain items (eg: need to use word macros "I will deposit [item]" to quickly deposit/withdraw multiples of items such as gems)
- Cannot use "word macros" to deposit certain items (eg: identified gems), and some item names are too long to use with skill macros
- Cannot easily acquire more bank space (except for a single, annual event...)

### Bit limitations (QoL)
Some data storage is still showing its 90s side, and would be great to update:

- Increase max exp box from unsigned 32-bit integer (~4.3 billion), to 64-bit integer (~18446744073709551615). This might conflict with sales from exp gems, though
- Increase max stats from a byte of 255, to something higher like 500 or 1000? Incentivize new gear with higher stats. But be careful about power-creep!
- Fix the "overkill" bug, where some attacks with enough damage will "overflow" the value (likely another unsigned 32 bit integer of 4.3 billion damage), and end up doing 0 or 1 damage. Super annoying. Using 64 bit would be great, or at the very least, capping it to the max value, similar to exp box

### Misc Feature Suggestions
- The ability to learn skills / spells from other Aislings, not just Mundanes. Different or same requirements? Either case could be interesting!
- Show the Aisling name when viewing their legend marks! That'd make it much easier to understand whose legend you're viewing in a screenshot

