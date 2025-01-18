---
layout: page
title:  Darkages Bugs or Quality of Life Suggestions
permalink: /qol/
---

A random and incomplete list of various known bugs or quality of life suggestions for Darkages!

If you're curious about bugs / features of this site itself, check out its own [Website QoL]({{ site.data.urls.blog_qol }}) page


### Misc Bugs
- "You are too busy", when trying to polish gems. Need to log off and log back in to fix it, or get labored again. Annoying.
- "You are distracted", when trying to use certain popups for quests / dialogue etc. Often need to just retry.
- It's possible to "overkill" a monster, where you do _soooo_ much damage, that it ends up doing 0 damage. Woops, too stronk. It's also possible for your "HIT" stat to overflow and wrap around to 0 if you equip too powerful of gear. See "Bit limitations" section
- Bosses can "despawn" if they don't see an Aisling for a short amount of time (eg: 1-5 seconds?). This is an absolute nightmare for certain quests, eg: Eingren Manor to get Demon Lord's Notes, since it can take 5-6+ hours to get to the boss, and then it can mysteriously disappear and you need to start over...
- Coming soon: Maybe just one or two more bugs (right??)

### Skills / Spells (QoL)
- Many skills take wayyyy too long to level up to 100/100, yet are still required to master (eg: wind blade). Even though the dojo exists, it'd still be nice to trim them down from like 24 hours to 8 hours, or something
- Essential items for skills/spells should have a minimum guaranteed drop chance. Maybe somewhere between 1% to 20%? Loot drop chances should be publicly available, and should not change without at least a notice / changelog entry
- Alternatively, require _more_ items and increase the drop rate. Or make certain items a guaranteed drop from special quests

### Religion (QoL)
- Allow everyone to benefit from a mass sermon rewards (regardless of which deity they worship)
- Allow anyone to become a "priest" of a religion, not just the literal priest class
- Allow necromancers to worship any god `;.;`

### Towns (QoL)
- Make Rucesion a full alternative to Mileth, eg: Temple of Choosing and Altar. The ability to get perma-banished from Mileth, and still play the game fully
- Add Altars to other towns? Ruc, Piet, Abel, Suomi, Blackstar, Pravat? Oren? Medenia??

### Professions (QoL)
- Increase the (10) cap on your legend (or make the additional counts non-private)
- More fun and obvious benefits from increasing profession skills (eg: higher quality tiers? needed for quests?)
- Allow tailoring / dyeing/ smithing / enhancing / consecrating as many items as possible

### Quests (QoL)
- Remove upper level caps from all quests, so that you can't "miss out" on them / need a low-level character for them. (But keeping a minimum level requirement is still good)
- Better toughness scaling for higher levels, so a master doing "Terror of the Crypt", or "Pentagram" has a more enjoyable experience
- Better rewards from various quests. Maybe a legend mark for every single quest? It's a real shame that none of Pentagram, Eingren Manor, or Desert Dunes give legend marks.
- Maybe chance at rare item from more repeatable quests? Cosmetic items?
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
- Bank word macros need different names for certain items (eg: "Cursed Cathonic Shield", "Black Pirate Bandana", "Red Nose Wear", "Dion Da Asgall Tiota Necklace", "Asgall Dion Asgall Tiota Necklace")

### Bit limitations (QoL)
Some data storage is still showing its 90s side, and would be great to update:

- Increase max exp box from unsigned 32-bit integer (~4.3 billion), to 64-bit integer (~18,446,744,073,709,551,615). This might conflict with sales from exp gems, though, but maybe there are other monetization options.
- Increase max stats from a byte of 255, to something higher like 500 or 1000? Incentivize new gear with higher stats. But be careful about power-creep!
- Fix the "overstat" bug, where equipping gear with too much HIT will overflow from 255 back to 0
- Fix the "overkill" bug, where some attacks with enough damage will "overflow" the value (likely another unsigned 32 bit integer of 4.3 billion damage), and end up doing 0 or 1 damage. Super annoying. Using 64 bit would be great, or at the very least, capping it to the max value, similar to exp box

### Misc Feature Suggestions
- The ability to learn skills / spells from other Aislings, not just Mundanes. Different or same requirements? Either case could be interesting!
- Show the Aisling name when viewing their legend marks! That'd make it much easier to understand whose legend you're viewing in a screenshot
- The ability to list more than 20 "friend" in-game. Many people are playing 2-5 characters nowadays, so the list can fill up really quickly!
- Maybe a toggle-able confirmation before dropping an item on an NPC / Pet? It seems incredibly risky that rare items could be accidentally deleted by a "misclick" drag and drop




## Misc suggestions from Discord

From: [https://discord.com/channels/498183649888567307/596448547713450043/597029476022353941](https://discord.com/channels/498183649888567307/596448547713450043/597029476022353941)

Kru Suggestions - Paxon, Urek, Lux, Windscars, M, Slashremix, SwordFish, KateUpton, DilZ, Six, Ender, Dose, Jinori, Vorlof, Eirien, SaintAsher, Quinton, Kronk
Atsuma, Rocandy, Kronk, Cthak, Merisa, Claudine

PLEASE ADVERTISE THE GAME! STEAM?!? ANYTHING! Very many suggestions and upvotes on adding the game to Steam.

Possible consider Free to Play, 20 year old game. Make the difference up in Kruna + increased players.

Quality of Life Suggestions: 
- Make buying Stats/Hp/MP easier instant ascend maybe to one stat?
- Daily quests - 22/23 hours so they can be repeated at the same time daily
- Reduce BlackStar to match other dungeons 4-12hrs
- Daily Skills/Spells obtainable forever with X/Y amount of daily tokens.
- Reduce summoner spell costs
- LOD style flying blimps to easily navigate to map like Suomi/Undine
- Ascending "Killer" NPC
- An FAQ on the website, alleviate the email spam with questions
- Blackstar shortcut if you have armor++++ 
- Show open/used bank spaces
- Fix monster kill counts, where killing too many other creatures forgets your kills.
- Make all or more of the daily quests give tokens rather then 5 days of farming for 2 day skill.
- Make Light Necks more easily obtainable for new players/Returning players
- Rework the Hubae system to have a self learning option for dugons.
- Rework current skills/spells 70% of them are borderline useless
- Balance the pure/sub path without making overpowered classes stronger by handing out already existing abilities.
  - ie: Warriors learn Wolf fang fist (Now all morriors are slightly better) Monks learn wallop, wiz learn pramh
  - This may close the gap between some subs/pures without further buffing Prizards.
- Raise Hit% cap on Nerve Stimulant.
- "Clear Stone" spell for already masters hunting Deep CR for master sets. Non-masters would still need
a 5 man group.
- Replace the 5-class requirements on some quests to "any 5 people"
- Teleport Feather to Kruna Shop = Instant profit.
- Alternatively: Make it F2P and make subscriptions still worthwhile (Double XP)
- Subscription ability to world shout with a cooldown.
- Log multiple characters from the same account at the same time while registered. (Subscription only idea)
- More cosmestics better emotes for Kruna
- Kruna for when you reg/auto renew
- Subscription hunting areas. Do away with the 50% bonus weekends, instead offer a sub service and premium service which offer
50% exp boost premium offer double xp and 100 kruna a month. 
- Relics usable on 1st inventory slot.
- More potions to restore mana, priests have no way to restore mana like wizzards.

Hunting Suggestions:
- Chaduls 2 
- Decrease Greens in SW2 make it huntable again.
- More MTG mob rooms for hunting / Seperate of Creant areas so newer players can hunt there like in the past.
- Increase Spawn Rate in SW1 for regular mobs in the larger rooms (33/35)
- Increased XP rates in CR, Nobis, or more mob rooms 
- Lower HP/AC/MR on Dark Clerics in CR
- Lower HP/AC/MR on Beetles in Nobis
- Double exp/ap items obtainable outside of rare events. 
- Item drops on Blackstar miniboss Skill/Spell items or doubles something worthwhile
- More hunting areas, the current ones are always full.
- Buff Unknown Depths, Chaos, Eingren Manor, Fire Canyon, Cursed Home
- Equalize areas XP similar to the level of West Woodlands
- Areas based on class hunting, cast certain spells and act differently based on class

1-99 Improvements:
- Revamp 1-99, So many people join and quit not being able to do anything on their own. Streamlining 1-99 would help.
- Items/XP items only for insights 1-99
- Re-do damage on all low level weapons to make them less useless. (Wooden Club 50 / DSS level 20 only useful weapons)
- Spiked Club does less damage then wooden club?
- Solo hunting options for 1-99 areas.
- Tasks a player can do solo that gets more challenging as they progress.
- Make the 1-99 experience more fun, not use a item to jump to master in 10 minutes.
- More low level skills/spells exclusive for 1-99. 
- Low level pure/sub skills that you lose at master.
- Possibly 1-99 who choose to stay 1-99 buy stats at a lower cap then masters.

Class Improvements:
- Bards -3 line or -1 for curses (Bards should be better then a GM priest)
- 0 line DF / 1 line Pramh / 0 line Mor Dion / 0 line Demise
- A spell only obtainable by sub-paths.

Politics:
- Ranger system national voting, heavier requirements (In office x amount of times, x deochs old, no jails/no jails in x amount of time.

Quests:
- Create more questlines to lesser-known areas of Temuair and Medenia. (Ex: Demon Lord's Notes quest, Arsaidh Aon)
- Give the world more life, and seem larger. Word has it Suomi Troupe works hard on quest lines, why not implement their work?
- Instead of having everything in one place (BlackStar) important questlines/things to do continue to be in respective towns.

PVP:
- Castle battles need revamping, Announce which guilds hold a castle every 4-6 hours, Days its been held, Castle pieces HP to 75mil,
increase AoE damage, Increase outside piece to 50mil, give slow regain. REWARDS
- NPCS inside castle cast Dia Aite, Dia Fas, EXP buff. Gold that guild leader can collect like 200mil every 7 days.
- Random daily rewards for each member Ie: Andor Chests, Queen Chests, WD chests, or Satchel of goods.


