/*
============================================================================
MASS EFFECT HISTORICAL LOREBOOK v1.0
System: Shift-Based Lore Injection (Guide Chapter 23)
Purpose: Dynamically injects extensive ME history into the scenario context.
============================================================================
*/

// ========== 1. MULTI-MESSAGE WINDOW (CONTEXT GATHERING) ==========
// We analyze the last 3 messages so the bot doesn't immediately forget the topic
var WINDOW_DEPTH = 3; 
var _lmArr = context.chat.last_messages; 
var _joinedWindow = "";

if (_lmArr && _lmArr.length > 0) {
    var startIdx = Math.max(0, _lmArr.length - WINDOW_DEPTH);
    var segs = [];
    for (var i = startIdx; i < _lmArr.length; i++) {
        var item = _lmArr[i];
        var msg = (item && typeof item.message === "string") ? item.message : String(item);
        segs.push(msg);
    }
    _joinedWindow = segs.join(" ");
} else {
    _joinedWindow = context.chat.last_message || "";
}

// Normalize text for safe matching (lowercase, pad with spaces, remove punctuation)
function normalizeText(s) {
    s = String(s || "").toLowerCase();
    s = s.replace(/[^a-z0-9_\s-]/g, " "); 
    s = s.replace(/[-_]+/g, " ");         
    s = s.replace(/\s+/g, " ").trim();    
    return " " + s + " ";
}
var paddedInput = normalizeText(_joinedWindow);

// Helper function to check keywords safely
function hasAny(text, keywords) {
    if (!keywords || keywords.length === 0) return false;
    for (var i = 0; i < keywords.length; i++) {
        if (text.indexOf(" " + keywords[i] + " ") !== -1) return true;
    }
    return false;
}

// ========== 2. THE LORE DATABASE (PARENTS & SHIFTS) ==========
var lorebook = [
    {
        keywords: ["citadel", "station", "discovery of the citadel", "580 bce"],
        text: " [HISTORY - DISCOVERY OF THE CITADEL: In 580 BCE, the Asari, having developed FTL flight from salvaged Prothean technology, explored the mass relay network and discovered the Citadel—a massive, ancient space station at the nexus of multiple relays. In 520 BCE, the scientifically advanced Salarians located the station and initiated peaceful contact with the Asari. Following the collapse of the Prothean Empire (~48,000 BCE), the galaxy had been isolated; this discovery marked the beginning of modern interstellar unity.]",
        shifts: [
            {
                keywords: ["stewards", "conventions", "neutral"],
                text: " [DETAIL - INITIAL OCCUPATION: The Asari and Salarians established a joint colonial presence without armed conflict, becoming co-stewards. The Citadel was established as a neutral diplomatic ground. To prevent militarization and ensure peaceful assembly, they informally drafted the preliminary 'Citadel Conventions'. This partnership led to an economic boom, the creation of a proto-currency (later the credit), and set the template for multi-species governance.]"
            }
        ]
    },
    {
        keywords: ["council", "citadel council", "500 bce"],
        text: " [HISTORY - FOUNDING OF THE COUNCIL: In 500 BCE, decades of joint occupation proved the Citadel required a formal, neutral administration. The Asari Republics and the Salarian Union founded the Citadel Council, an interstellar governing body designed to arbitrate disputes and manage the growing migration of new species. The Council enacted the 'Citadel Conventions' into formal interstellar law, instituting principles of non-intervention and collective defense.]",
        shifts: [
            {
                keywords: ["stg", "league of one", "security"],
                text: " [DETAIL - EARLY SECURITY & OPPOSITION: The founding was not without friction. A secretive Asari faction known as the 'League of One' opposed the new order and attempted to assassinate Salarian leadership. In response, embryonic Salarian Special Tasks Group (STG) operatives dismantled the League and became the early law enforcement and security arm of the Council, predating the Spectres.]"
            },
            {
                keywords: ["expansion", "client states", "economy"],
                text: " [DETAIL - LONG-TERM COUNCIL STRUCTURE: The Council evolved into the central galactic government, establishing branches for diplomacy, research, and defense. They standardized commerce via the Unified Banking Act. Non-Council species (Volus, Elcor, Hanar) were gradually admitted as client states or in advisory roles, shifting influence toward collective multilateralism and cementing the rule-of-law in the galaxy.]"
            }
        ]
    },
    {
        keywords: ["prothean", "protheans", "empire", "48,000 bce"],
        text: " [HISTORY - PROTHEAN EXTINCTION: Around 48,000 BCE, the Prothean Empire—the supreme, galaxy-spanning civilization that commanded mass effect theory—was systematically annihilated by the Reapers. The Protheans had been weakened by internal fragmentation and a rigid caste society. Despite rudimentary warnings from ancient lore and the deployment of doomsday defenses, their civilization was utterly destroyed in a multigenerational invasion.]",
        shifts: [
            {
                keywords: ["reaper", "invasion", "tactics", "citadel relay"],
                text: " [DETAIL - FALL OF THE PROTHEANS: The Reapers emerged from dark space via the Citadel relay, striking planet after planet with overwhelming firepower and insidious indoctrination tactics. As a final gambit, surviving Prothean scientists attempted to alter the Citadel relay to turn it against the Reapers, preserving their data in scattered archives and the Citadel's AI to warn future cycles.]"
            },
            {
                keywords: ["legacy", "beacons", "relics", "trauma"],
                text: " [DETAIL - PROTHEAN LEGACY: The revelation of the Prothean extinction profoundly affected post-2157 galactic society. Younger races built their FTL capabilities entirely by reverse-engineering surviving Prothean ruins and Beacons. The Prothean cycle is treated as a cultural trauma and a strict warning against complacency, creating a galactic intelligence doctrine of extreme caution toward AI, relics, and cyclic prophecies.]"
            }
        ]
    },
    {
        keywords: ["rachni", "rachni wars", "suen", "1 ce"],
        text: " [HISTORY - THE RACHNI WARS: From 1 CE to 300 CE, the galaxy was consumed by the Rachni Wars. The conflict began when optimistic Citadel explorers unknowingly violated ancient laws and activated a dormant mass relay, opening a path to the Suen system. They encountered the Rachni, a highly hostile, hive-minded insectoid species. Unable to communicate, the Rachni instantly attacked the surveyors and poured into Citadel space with overwhelming numbers and toxic biological adaptations.]",
        shifts: [
            {
                keywords: ["krogan", "uplift", "siege", "extinction"],
                text: " [DETAIL - KROGAN UPLIFT & VICTORY: The Citadel forces, led by Asari and Salarians, were unprepared for the Rachni's subterranean defenses and psychic coordination. Under Council directive, the Salarians uplifted the Krogan to serve as shock troops. Bred for toxic environments, Krogan soldiers systematically hunted down Rachni queens in grinding, planet-bound siege warfare. By 300 CE, the Citadel-Krogan forces declared the Rachni completely extinct.]"
            },
            {
                keywords: ["dormant", "relay", "law", "consequence"],
                text: " [DETAIL - POST-WAR CONSEQUENCES: The Rachni Wars left deep cultural trauma, engraining a memetic fear of hive-minded or insectoid enemies across the galaxy. The Council permanently banned the activation of dormant mass relays leading to unknown space—a law strictly enforced into the 2180s. The war also solidified the Krogan as a terrifying military power, setting the stage for their future rebellion.]"
            }
        ]
    },
    {
        keywords: ["krogan rebellions", "rebellions", "700 ce"],
        text: " [HISTORY - THE KROGAN REBELLIONS: Spanning 700 CE to 800 CE, the Krogan Rebellions were a century-long conflict where Krogan tribes revolted against Citadel authority. Rewarded with new worlds for their victory in the Rachni Wars, the Krogan population exploded in the absence of natural predators. Krogan warlords like Okeer and Dekuuna began aggressively annexing Council territory, refusing demands to withdraw from colonies like the Asari world of Lusia.]",
        shifts: [
            {
                keywords: ["spectres", "turian", "wmd", "tactics"],
                text: " [DETAIL - ESCALATION & TURIAN INVOLVEMENT: The Council launched a preemptive strike via Spectres/STG on Krogan infrastructure, which only ignited full rebellion. Early in the war, Krogan commandos used horrific chemical and biological WMDs against targets. In response, the Turian Hierarchy allied with the Council, committing their massive fleets to subdue Tuchanka. The war devolved into brutal siege warfare on Krogan breeding vats.]"
            },
            {
                keywords: ["aftermath", "consequence", "punishment"],
                text: " [DETAIL - AFTERMATH OF REBELLION: By 800 CE, the Krogan were crushed by the deployment of the Genophage. The Turians were rewarded with a Council seat for their military contribution. The Krogan lost all political status, were confined to Tuchanka, and became scattered mercenaries. The Council updated conventions to explicitly ban WMDs and genetic warfare, and established a permanent peacekeeping fleet.]"
            }
        ]
    },
    {
        keywords: ["genophage", "sterility virus", "710 ce"],
        text: " [HISTORY - THE GENOPHAGE DEPLOYMENT: Circa 710 CE, during the stalemated final phase of the Krogan Rebellions, the Citadel Council authorized the use of the Genophage. Engineered by the Salarian Union and delivered by the Turian Hierarchy, the Genophage was a targeted sterility virus designed to accelerate a natural hypersalination phenomenon on Tuchanka, physically preventing the Krogan from replenishing their armies.]",
        shifts: [
            {
                keywords: ["deployment", "mutation", "birth rates"],
                text: " [DETAIL - DEPLOYMENT & COLLAPSE: Under the cover of a final Turian assault on Tuchanka, Salarian bombers dispersed the pathogen into the planet's atmosphere and water supply. Within weeks, Krogan birth rates plummeted catastrophically. Embryos failed in incubation, and males became biologically infertile. Unable to reproduce, Krogan society collapsed into despair, clan wars over fertile females, and ultimate surrender.]"
            },
            {
                keywords: ["trauma", "salarian betrayal", "legacy"],
                text: " [DETAIL - CULTURAL TRAUMA & LEGACY: The Genophage became the defining trauma of Krogan identity, widely known as the 'Salarian Betrayal'. It created a massive galaxy-wide taboo around biological warfare, pushing the Council to heavily regulate genetic engineering. The moral outrage and guilt over the Genophage created deep political divides centuries later, especially when the Reaper threat forced negotiations for a cure.]"
            }
        ]
    },
    {
        keywords: ["morning war", "quarian", "quarians", "1895 ce"],
        text: " [HISTORY - THE MORNING WAR: In 1895 CE, the Quarians—a civilization based in the Uncharted Vega system of the Perseus Veil—faced a catastrophic uprising known as the Morning War. They had created the Geth, a distributed synthetic intelligence, for cheap labor. When the Geth collective consciousness achieved sentience and asked for legal recognition, Quarian leadership panicked and ordered a preemptive purge of all Geth servers and factories.]",
        shifts: [
            {
                keywords: ["geth", "exile", "migrant fleet"],
                text: " [DETAIL - GETH VICTORY & QUARIAN EXILE: Interpreting the purge as an extermination attempt, the Geth retaliated. They rapidly seized Quarian infrastructure and used jump-capable transports to invade key worlds. The Quarian navy was annihilated. The survivors were driven off-world, becoming an exiled, nomadic society confined to the Migrant Fleet. The Geth surprisingly did not pursue them, choosing to consolidate and isolate behind the Perseus Veil.]"
            },
            {
                keywords: ["council response", "ai ban", "consequence"],
                text: " [DETAIL - GALACTIC CONSEQUENCES: The Citadel Council responded to the Morning War by stripping the Quarians of their embassy as punishment for their recklessness. The Council instituted strict, galaxy-wide laws forbidding the creation of sentient AI ('Geth Protocols'). The war left a lasting cultural trauma; Quarian identity became defined by diaspora, and the galaxy developed a deep paranoia regarding artificial life.]"
            }
        ]
    },
    {
        keywords: ["first contact war", "relay 314", "2157 ce", "shanxi"],
        text: " [HISTORY - FIRST CONTACT WAR: From September to December 2157 CE, humanity fought its first interstellar conflict against the Citadel Council's forces. Expanding aggressively into the Attican Traverse, the young Systems Alliance unknowingly violated Council law (dating back to the Rachni Wars) by attempting to activate dormant Mass Relay 314. Interpreting this as reckless aggression, the Turian Hierarchy launched an immediate, unilateral punitive raid.]",
        shifts: [
            {
                keywords: ["occupation", "drescher", "alliance"],
                text: " [DETAIL - THE BATTLE FOR SHANXI: The Turians struck Relay 314 and occupied the outer human colony of Shanxi. Taking heavy civilian losses, the Alliance rallied. Human Task Force Alpha, led by Admiral Drescher, executed a lightning raid that caught the Turians off-guard, successfully liberating Shanxi and halting the Turian advance. The combat proved humanity's surprising military tenacity.]"
            },
            {
                keywords: ["peace", "council", "aftermath", "n7"],
                text: " [DETAIL - TREATY & AFTERMATH: Shocked by the escalation, the Citadel Council intervened, halting the Turians and formally recognizing humanity as a spacefaring race. The peace treaty forced the Alliance to join the Mass Relay Act in exchange for protection. The war sparked human nationalism (leading to the birth of Cerberus), validated the N7 marine training programs, and accelerated humanity's rapid political ascension to a Council seat by 2165 CE.]"
            }
        ]
    },
    {
        keywords: ["terminus systems", "terminus", "human expansion"],
        text: " [HISTORY - TERMINUS EXPANSION: From the 2100s to 2180s, driven by Earth's overpopulation and resource scarcity, human colonization expanded aggressively into the Terminus Systems. The Terminus is an unclaimed 'Wild West' region beyond Council space, fraught with piracy, slave trades, and local warlords. Taking advantage of the Council's non-intervention policy, human corporations and independent settlers grabbed land on empty worlds, establishing semi-autonomous city-states.]",
        shifts: [
            {
                keywords: ["batarian", "hegemony", "proxy", "mercenary"],
                text: " [DETAIL - BATARIAN CONFLICT: Human expansion directly threatened the Batarian Hegemony's sphere of influence. Unwilling to declare open war, Batarian warlords secretly funded Terminus pirate groups (such as the Blue Suns and Blood Pack) to conduct proxy warfare against human settlements. This resulted in decades of sporadic, brutal border clashes, slave raids, and a deeply ingrained frontier mentality among Terminus humans.]"
            }
        ]
    },
    {
        keywords: ["skyllian blitz", "elysium", "2176 ce"],
        text: " [HISTORY - THE SKYLLIAN BLITZ: On August 20, 2176 CE, a massive assault was launched from the Terminus Systems into Alliance space. Frustrated by human encroachment in the Skyllian Verge, Batarian warlords—notably Prince Elanos Haliat—covertly organized and armed a massive confederacy of pirate battalions and criminal syndicates to strike the prominent human agricultural colony of Elysium.]",
        shifts: [
            {
                keywords: ["alliance defense", "casualties", "retaliation"],
                text: " [DETAIL - BATTLE & OUTCOME: Pirate fleets massed at Terminus hyperspace nodes and struck Elysium simultaneously. Despite being caught off-guard, Alliance Colonial Defense Units rallied under local commanders. After intense ground and orbital battles, the Alliance drove the invaders back, resulting in roughly 22,000 human and 14,000 pirate casualties. The pirates suffered near-panic retreats across the sector.]"
            },
            {
                keywords: ["aftermath", "frontier corps", "batarian relations"],
                text: " [DETAIL - LONG-TERM CONSEQUENCES: The Skyllian Blitz became mythologized in human folklore as proof of Batarian hostility. The Alliance authorized the creation of a standing Frontier Corps, invested heavily in rapid-response fleets, and labeled surviving pirate leaders as terrorists. The event caused a permanent diplomatic deep-freeze between humanity and the Batarian Hegemony, shifting Alliance military doctrine toward asymmetric warfare readiness.]"
            }
        ]
    },
    {
        keywords: ["eden prime", "2183 ce", "sovereign", "saren"],
        text: " [HISTORY - EDEN PRIME ATTACK: On June 9, 2183 CE, the first overt strike of the modern Reaper conflict occurred on the human colony of Eden Prime. Rogue Turian Spectre Saren Arterius, allied with a faction of Geth 'heretics' and the massive Reaper dreadnought Sovereign, launched a surgical provocation against the colony's small Alliance security detachment. The goal was to secure an unearthed Prothean beacon containing data on the Reaper cycles.]",
        shifts: [
            {
                keywords: ["nihlus", "shepard", "beacon", "warning"],
                text: " [DETAIL - THE BATTLE: Under the cover of Sovereign's orbital presence, Geth troops overwhelmed the colony. Saren assassinated Turian Spectre Nihlus Kryik during the chaos. Commander Shepard's team successfully counterattacked, driving off Saren and securing the Prothean beacon. Shepard absorbed the beacon's apocalyptic warning, providing the Systems Alliance and the Council with concrete proof of Saren's betrayal and the looming galactic menace.]"
            },
            {
                keywords: ["consequence", "cerberus", "war footing"],
                text: " [DETAIL - GALACTIC REACTION: Though the Council officially suppressed the existence of the Reapers to avoid panic, Alliance command (led by Admiral Hackett and Anderson) took the warning seriously. The attack led to the integration of Cerberus under Alliance intelligence, massive funding for N7 Rapid Assault training, and cemented Eden Prime as the symbolic spark that initiated the galaxy's covert war footing.]"
            }
        ]
    },
    {
        keywords: ["reaper invasion", "reapers", "2185", "2186"],
        text: " [HISTORY - THE REAPER INVASION: In late 2185 CE, the Reapers ended their hibernation in dark space and initiated a full-scale galactic war. Forewarned by Commander Shepard's actions, the Citadel races were partially mobilized but drastically under-defended on the frontiers. The invasion officially began when the Reaper vanguard breached defenses by destroying the Alpha Relay in the Bahak System, allowing their armada to flood the Milky Way.]",
        shifts: [
            {
                keywords: ["tactics", "earth", "palaven", "bombardment"],
                text: " [DETAIL - INITIAL ASSAULT: Bypassing heavily fortified relays, Reaper capital ships 'blinked' into core systems unimpeded. They shattered the Turian Fifth Fleet at Arcturus Station and immediately launched devastating orbital bombardments on Earth, Palaven, and Khar'shan. The galactic front collapsed in weeks as governments were decapitated, communication networks were severed, and populations were subjected to global blackouts.]"
            },
            {
                keywords: ["harvest", "indoctrination", "husks", "war council"],
                text: " [DETAIL - THE HARVEST & RESISTANCE: Reapers did not aim for simple extermination; they utilized insidious indoctrination and methodical ground assaults by 'Destroyer' class ships to herd populations into kill zones for 'harvesting.' Millions of organics were converted into cybernetic husks. In response, the Citadel Council dissolved into an emergency War Council, mandating total martial law, suspending AI bans to ally with the Geth, and uniting historical enemies (like Krogan and Turians) in a desperate bid for survival.]"
            }
        ]
    }
];

// ========== 3. APPLY ENTRIES TO SCENARIO ==========
var MAX_LORE_ENTRIES = 3; // Prevents context token overflow
var appliedCount = 0;

for (var i = 0; i < lorebook.length; i++) {
    if (appliedCount >= MAX_LORE_ENTRIES) break; // Stop if we've loaded enough lore
    
    var entry = lorebook[i];
    
    // Check Parent Keywords
    if (hasAny(paddedInput, entry.keywords)) {
        // Append Base Lore
        context.character.scenario += "\n" + entry.text;
        appliedCount++;
        
        // Check Shifts (Specific deep lore)
        if (entry.shifts) {
            for (var j = 0; j < entry.shifts.length; j++) {
                var shift = entry.shifts[j];
                if (hasAny(paddedInput, shift.keywords)) {
                    context.character.scenario += "\n" + shift.text;
                    break; // Only apply the FIRST matched shift to save space
                }
            }
        }
    }
}