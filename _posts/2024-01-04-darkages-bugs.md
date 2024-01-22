---
layout: post
title:  Darkages Bugs
date:   2024-01-04
categories: misc
---

A random and incomplete list of various known bugs or quality of life suggestions for Darkages!


### Misc Bugs

- "You are too busy", when trying to polish gems. Need to log off and log back in to fix it. Annoying.
- "You are distracted", when trying to use certain popups for quests / dialogue etc. Often need to just retry.
- Coming soon: Maybe just one or two more bugs (right??)


### Religion (QoL)
- Allow everyone to benefit from a mass sermon rewards (regardless of which deity they worship)
- Allow anyone to become a "priest" of a religion, not just the literal priest class


### Towns (QoL)
- Make Rucesion a full alternative to Mileth. The ability to get perma-banished from Mileth, and still play the game fully

### Bank Storage (QoL)

Super painful to use, for multiple reasons:

- Cannot bank certain items, ever (eg: ... Bonus points for items that ALSO CAN'T BE TRADED WTF!)
- Cannot easily search which items you have banked on one Aisling, or across all Aislings
- Cannot easily deposit/withdraw multiples of certain items (eg: need to use word macros "I will deposit [item]" to quickly deposit/withdraw multiples of items such as gems)
- Cannot use "word macros" to deposit certain items (eg: identified gems), and some item names are too long to use with skill macros
- Cannot easily acquire more bank space (except for a single, annual event...)


### Bit limitations (QoL)

Some data storage is still showing its 90s side, and would be great to update:

- Increase max exp box from unsigned 32-bit integer (~4.3 billion), to 64-bit integer (~18446744073709551615). This might conflict with sales from exp gems, though
- Increase max stats from a byte of 255, to something higher like 500 or 1000? Incentivize new gear with higher stats. But be careful about power-creep!
- Fix the "overkill" bug, where some attacks with enough damage will "overflow" the value (likely another unsinged 32 bit integer of 4.3 billion damage), and end up doing 0 or 1 damage. Super annoying. Using 64 bit would be great, or at the very least, capping it to the max value, similar to exp box



