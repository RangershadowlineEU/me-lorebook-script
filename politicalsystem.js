// ============================================================================
// MASS EFFECT EXTENSIVE POLITICAL LORE ENGINE (V2 - Recency Boost)
// Detailed context injection with dynamic priority to prevent starvation.
// ============================================================================

var APPLY_LIMIT = 2; // Max comprehensive entries to inject per turn
var WINDOW_DEPTH = 4; // Scans the last 4 messages for deep context

var _lmArr = context.chat.last_messages;

// --- 1. BUILD DEEP WINDOW (For lingering context & Shifts) ---
var segs = [];
if (_lmArr && _lmArr.length > 0) {
    var startIdx = Math.max(0, _lmArr.length - WINDOW_DEPTH);
    for (var i = startIdx; i < _lmArr.length; i++) {
        var item = _lmArr[i];
        segs.push((item && typeof item.message === "string") ? item.message : String(item));
    }
} else {
    segs.push(context.chat.last_message || "");
}
var paddedDeep = " " + segs.join(" ").toLowerCase().replace(/[^a-z0-9]/g, " ").replace(/\s+/g, " ") + " ";

// --- 2. BUILD IMMEDIATE WINDOW (For Recency Boosting) ---
// Just the bot's last reply and your immediate message
var recentSegs = [];
if (_lmArr && _lmArr.length > 0) {
    var recentStart = Math.max(0, _lmArr.length - 2);
    for (var r = recentStart; r < _lmArr.length; r++) {
        var itemR = _lmArr[r];
        recentSegs.push((itemR && typeof itemR.message === "string") ? itemR.message : String(itemR));
    }
} else {
    recentSegs.push(context.chat.last_message || "");
}
var paddedRecent = " " + recentSegs.join(" ").toLowerCase().replace(/[^a-z0-9]/g, " ").replace(/\s+/g, " ") + " ";

// --- 3. EXTENSIVE POLITICAL DATABASE ---
var lorebook = [
    {
        keys: ["council", "citadel", "spectre", "c-sec", "treaty of farixen"],
        priority: 10,
        text: "The Citadel Council's authority relies on treaties (Citadel Conventions) and consensus rather than a sovereign empire. They enforce laws indirectly via economic incentives, the Turian-led Citadel Fleet, and autonomous Spectres who execute extrajudicial covert operations. Decision-making is cautious and prone to bottlenecks due to the multi-species veto system."
    },
    {
        keys: ["alliance", "humanity", "human", "earth", "arcturus"],
        priority: 9,
        text: "The Systems Alliance is a supranational parliamentary government prioritizing colonial expansion and technological innovation. While lacking sheer numbers, their military doctrine emphasizes agile, long-range firepower and carriers. They seek full Council membership but struggle with internal political fractures and alien suspicion regarding their rapid galactic growth.",
        shifts: [
            { keys: ["turian", "palaven", "first contact", "shanxi"], text: " Humans and Turians maintain a tense deterrence rooted in the First Contact War. While trade exists, Turians fear human unpredictability, while humans resent Turian militaristic condescension." },
            { keys: ["batarian", "hegemony", "khar'shan", "verge"], text: " The Alliance is locked in a bitter, simmering border dispute with the Batarian Hegemony over the Attican Traverse, facing constant state-sponsored proxy terrorism and slaver raids." }
        ]
    },
    {
        keys: ["turian", "hierarchy", "palaven", "primarch"],
        priority: 8,
        text: "The Turian Hierarchy is a highly centralized, militaristic empire ruled by an oligarchic council of Primarchs. Society operates on a strict 27-tier meritocratic citizenship system. Fielding the largest navy in Citadel space, their doctrine relies on discipline and overwhelming combined-arms force, though their rigid chain-of-command makes them vulnerable to disruption.",
        shifts: [
            { keys: ["krogan", "tuchanka", "rebellions"], text: " Turians maintain a strict containment policy toward Krogans, having deployed the Salarian-made genophage during the Krogan Rebellions to break their empire." }
        ]
    },
    {
        keys: ["asari", "republics", "republic", "thessia", "matriarch"],
        priority: 7,
        text: "The Asari Republics operate as a decentralized, consensus-driven democracy of independent city-states, guided informally by elder Matriarchs. Lacking a unified standing army, they rely on elite biotic commandos and allied fleets. They project immense soft power through holding the galaxy's largest economy and leveraging their reputation as diplomatic mediators."
    },
    {
        keys: ["salarian", "union", "sur'kesh", "dalatrass", "stg"],
        priority: 6,
        text: "The Salarian Union is a fast-acting, matrilineal aristocracy governed by Dalatrasses in a feudal-like clan structure. Due to their short lifespans, they decide quickly, favoring preemptive strikes, espionage via the Special Tasks Group (STG), and technological superiority over prolonged warfare. Their compartmentalized bureaucracy can create dangerous information bottlenecks.",
        shifts: [
            { keys: ["krogan", "tuchanka", "genophage"], text: " Salarians constantly monitor the Krogan, relying on the genophage they engineered to prevent a second Krogan war, prioritizing cold logic and the 'greater good' over morality." }
        ]
    },
    {
        keys: ["krogan", "tuchanka", "genophage", "clan", "dmz"],
        priority: 9,
        text: "The Krogan are heavily restricted by the Council's Demilitarization Enforcement Mission (CDEM). Suffering from the genophage fertility plague, their society is fractured between clans seeking revenge and moderates trying to rebuild. They are unpredictable, dangerous if provoked, and heavily incentivized to mercenary work to channel their immense aggression."
    },
    {
        keys: ["quarian", "migrant fleet", "rannoch", "geth", "flotilla", "conclave"],
        priority: 8,
        text: "The Quarian Migrant Fleet consists of 50,000 ships governed by a civilian Conclave and an Admiralty Board with emergency override powers. Exiled by their synthetic creations (the Geth), they suffer severe galactic discrimination, strict population control, and rely on a fragile barter economy based on their unparalleled engineering expertise.",
        shifts: [
            { keys: ["ai", "synthetic", "geth"], text: " The Quarian creation of the Geth caused a galaxy-wide taboo on true AI. Any synthetic development in Citadel space risks severe sanctions and panic." }
        ]
    },
    {
        keys: ["batarian", "hegemony", "khar'shan", "slaver", "four-eyes"],
        priority: 7,
        text: "The Batarian Hegemony is a repressive, isolationist autocracy heavily censored by supreme leadership. Militarily a 'paper tiger' relying on outdated cruisers, they project power through proxy terrorism, pirate funding, and state-sponsored slavery. Their regime survives almost entirely on extreme anti-human propaganda."
    },
    {
        keys: ["terminus", "omega", "illium", "aria", "mercenary", "blood pack", "blue suns", "eclipse"],
        priority: 5,
        text: "The Terminus Systems are a stateless, chaotic archipelago beyond Citadel jurisdiction, dominated by pirate lords, mercenary companies, and black market syndicates. Core Citadel powers deliberately avoid direct military intervention here to prevent unifying the disparate factions against a common enemy."
    }
];

// --- 4. DYNAMIC SELECTION PIPELINE ---
var matchedEntries = [];

for (var j = 0; j < lorebook.length; j++) {
    var entry = lorebook[j];
    var isMatch = false;
    var dynamicPriority = entry.priority; // Start with base priority
    
    for (var k = 0; k < entry.keys.length; k++) {
        var keyword = " " + entry.keys[k] + " ";
        
        // If mentioned RIGHT NOW, give it a massive +50 priority boost
        if (paddedRecent.indexOf(keyword) !== -1) {
            isMatch = true;
            dynamicPriority += 50; 
            break;
        } 
        // If it's just lingering in the deep window, match it normally
        else if (paddedDeep.indexOf(keyword) !== -1) {
            isMatch = true;
        }
    }
    
    if (isMatch) {
        matchedEntries.push({
            text: entry.text,
            shifts: entry.shifts,
            effectivePriority: dynamicPriority
        });
    }
}

// --- 5. SORT BY EFFECTIVE PRIORITY & APPLY SHIFTS ---
matchedEntries.sort(function(a, b) {
    return b.effectivePriority - a.effectivePriority;
});

var appliedCount = 0;
for (var m = 0; m < matchedEntries.length; m++) {
    if (appliedCount >= APPLY_LIMIT) break;
    
    var sel = matchedEntries[m];
    var outputText = "\n[Database Context: " + sel.text;
    
    // Shifts still look at the DEEP window so they don't miss long-term context
    if (sel.shifts) {
        for (var s = 0; s < sel.shifts.length; s++) {
            var shift = sel.shifts[s];
            for (var sk = 0; sk < shift.keys.length; sk++) {
                if (paddedDeep.indexOf(" " + shift.keys[sk] + " ") !== -1) {
                    outputText += shift.text;
                    break;
                }
            }
        }
    }
    
    outputText += "]";
    context.character.scenario += outputText;
    appliedCount++;
}
