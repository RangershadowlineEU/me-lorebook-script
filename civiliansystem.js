// ============================================================================
// MASS EFFECT CIVILIAN SYSTEMS SCRIPT v2.0
// Features: Multi-Message Window, Exhaustive Hierarchical Lorebook, Shifts
// Designed for Janitor.AI - Strict ES5 Compliance
// ============================================================================

// --- CONFIGURATION ---
var WINDOW_DEPTH = 5; // Scan the last 5 messages for prolonged context
var APPLY_LIMIT = 4;  // Allow up to 4 highly relevant lore concepts to fire per turn

// --- 1. INPUT NORMALIZATION (Multi-Message Context Window) ---
var _lmArr = context.chat.last_messages;
var _joinedWindow = "";

// Build the message window
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

// Normalize for foolproof exact-word matching
var padded = " " + _joinedWindow.toLowerCase().replace(/[^a-z0-9]/g, " ") + " ";

// --- 2. EXHAUSTIVE LOREBOOK ---
// Priorities: 1 (Medical/Emergency), 2 (Location/Infra), 3 (Travel), 4 (Comms), 5 (Economy/Society), 6 (Science/Culture)
var lorebook = [

// ==========================================
    // PRIORITY 1: MEDICAL & BIOTECH (Exhaustive)
    // ==========================================
    
    // 1.1: Medi-gel & Trauma Standards
    {
        keywords: ["medi-gel", "medigel", "heal", "wound", "doctor", "medic", "first aid", "trauma", "bleeding", "surgery"],
        priority: 1,
        text: "[Medi-gel Mechanics] A universal first-aid salve developed by the Sirta Foundation. It contains anesthetics, clotting agents, and nano-repair cells. Activated by ultrasound, it seals wounds, stops infection, and bonds tissue. Crucially, it bonds to both organic and synthetic/cybernetic materials. In medical settings, trauma triage is largely the efficient dosing and application of this gel.",
        shifts: []
    },

    // 1.2: Cybernetics, Augmentations & Legal Limits
    {
        keywords: ["cybernetic", "implant", "prosthetic", "augment", "biotic amp", "neural jack", "muscle graft", "cyborg"],
        priority: 1,
        text: "[Augmentation & Cybernetics] Common biotech includes biotic amplifiers (EZ-node arrays), neural stimulators, and nanofiber muscle grafts. However, Citadel law strictly forbids 'excessive' cybernetics (the 54% neural link limit). There is a sharp societal stigma against heavily modified individuals, who are often viewed as dangerous or 'inhuman.' Black-market clinics exist for illegal modifications.",
        shifts: []
    },

    // 1.3: Genetic Therapy, Genophage & Enforcement
    {
        keywords: ["genetic", "gene", "dna", "cancer", "therapy", "genophage", "hybrid", "embryo", "sur'kesh", "monk"],
        priority: 1,
        text: "[Genetic Systems] Core worlds have eradicated single-gene illnesses (cancers, cystic disorders) via subsidized gene therapy. Embryonic editing and human-alien hybrids are banned. The Krogan Genophage is a famous forced genetic fix inducing infertility. Prohibited genetic research is brutally enforced; the 'Terminator Monks' of Sur'Kesh are known to execute unauthorized biotic surgeons.",
        shifts: []
    },

    // 1.4: Life Extension & Cryogenics
    {
        keywords: ["cryo", "stasis", "freeze", "aging", "lifespan", "longevity", "prothean", "immortality"],
        priority: 1,
        text: "[Life Extension] No 'immortality' exists outside of cryogenic stasis—using Mass Effect fields to pause biological aging indefinitely. While organ-replacement and regeneration extend life by a few decades, stasis is used for long-term transport or saving terminal patients. Prothean cryopods are the gold standard, having survived over 50,000 years under power.",
        shifts: []
    },

    // 1.5: Cross-Species Medicine & Environments
    {
        keywords: ["alien", "species", "turian", "salarian", "quarian", "hanar", "asari", "krogan", "biochemistry", "poison", "vaccine"],
        priority: 1,
        text: "[Xeno-Medicine] Each species has incompatible biochemistry; toxins for one can be fatal to another. Med-wards must utilize adjustable atmosphere bays. Quarians require 'biosuit rehab' and sterile zones due to weakened immune systems. Hanar require humidity domes and low-gravity tables. Salarian high metabolism causes psychotropic medications to work with extreme, dangerous speed.",
        shifts: []
    },

    // 1.6: Psychological Health & Neurostims
    {
        keywords: ["trauma", "ptsd", "stress", "mental", "psychiatry", "therapy", "neurostim", "bonding", "thessia"],
        priority: 1,
        text: "[Psychological Systems] Trauma is treated with neurostims (implants that stabilize mood) and Virtual Reality therapy, involving digital reconstructions of trauma. Biotics with PTSD use neural inhibitors to suppress biotic flashes. Culturally, Asari favor empathic bonding/meditation, Salarians use fast-acting drugs, and Humans/Turians combine counseling with medication.",
        shifts: []
    },

// ==========================================
    // PRIORITY 2: URBAN & COLONIAL INFRASTRUCTURE
    // ==========================================
    
    // 2.1: Core World Arcologies & Transport
    {
        keywords: ["city", "arcology", "earth", "thessia", "sur'kesh", "skyscraper", "urban", "transport", "mag-lev", "monorail"],
        priority: 2,
        text: "[Core World Design] Major worlds use arcology skyscrapers—self-sufficient megastructures that minimize urban sprawl with internal hydroponics and waste recycling. Transport is dominated by mag-lev trains, automated hover-shuttles, and sky tubes. High-speed transit tubes can cross continental distances at a fraction of light speed. Infrastructure is powered by massive Helium-3 fusion plants and intelligent grids that automatically balance loads.",
        shifts: []
    },

    // 2.2: Core World Defense & Power
    {
        keywords: ["planetary defense", "orbital", "shield", "battery", "fusion reactor", "energy grid", "bunker", "power line"],
        priority: 2,
        text: "[Core Infrastructure] Cities are protected by layered orbital defense platforms, satellites, and high-altitude kinetic/laser batteries. Arcologies feature composite armor and ablative shields to withstand bombardment. Power comes from decentralized fusion reactors and renewable solar/wind farms. In emergencies, gravity generators in hubs like the Citadel double as energy distributors via inertial mass injection.",
        shifts: []
    },

    // 2.3: Frontier Colony Habitation & Resource Extraction
    {
        keywords: ["colony", "frontier", "outpost", "habitat", "mine", "extraction", "refinery", "farm", "agri", "dome"],
        priority: 2,
        text: "[Frontier Design] Settlements are modest clusters of modular prefabricated habitats. Resource colonies focus on asteroid mines or ice harvester arrays with rotational crew shifts. Agricultural worlds utilize broad dome-covered fields or controlled open farms tended by robot caretakers. These worlds export bulk raw materials and food to core hubs via refrigerated freighters, often utilizing localized solar/wind arrays for power.",
        shifts: []
    },

    // 2.4: Frontier Fragility & Security
    {
        keywords: ["fragile", "blackout", "mercenary", "pirate", "militia", "cryo-stasis", "lifeboat", "failure", "skeleton crew"],
        priority: 2,
        text: "[Colonial Security] Frontier outposts have single points of failure; a main reactor breakdown can cause a total colony blackout. Infrastructure is sparse, prone to disruption by storms or wildlife. Security is provided by thin marine squadrons or hired mercenaries. Due to infrastructure fragility, settlers often keep backup supplies in cryo-stasis or treat deep-freeze sleep pods as planetary lifeboats during systemic failures.",
        shifts: []
    },

    // 2.5: Space Stations & Trade Hubs
    {
        keywords: ["station", "docking", "citadel", "illium", "omega", "nexus", "customs", "life-support", "gravity", "port"],
        priority: 2,
        text: "[Station Logistics] Hubs use tiered docking rings with high-density clamps, gravity cranes, and omni-tool loaders. Habitation is divided into segmented life-support zones with specific air/gravity domes for different species. Stations utilize redundant recycling systems, synthetic food labs, and vent waste heat into space. Each hub has an economic niche: The Citadel (governance/finance), Illium (R&D/software), and Omega (black-market trade).",
        shifts: []
    },

// ==========================================
    // PRIORITY 3: STARSHIPS, TRAVEL & MIGRATION
    // ==========================================
    
    // 3.1: Civilian Ship Classes & Standards
    {
        keywords: ["ship", "freighter", "transport", "liner", "kowloon", "crew", "automation", "shuttle"],
        priority: 3,
        text: "[Civilian Starships] Fleets consist of unarmed freighters like the Kowloon-class (modular cargo holds) and passenger liners. Modern ships are highly automated with nav-computers and AI, allowing even large vessels to fly with a skeleton crew. Starships are prohibitively expensive; ownership is limited to governments, corporations, and the ultra-wealthy. Ticketed interstellar travel for ordinary citizens typically costs thousands of credits.",
        shifts: []
    },

    // 3.2: FTL Physics & Safety Protocols
    {
        keywords: ["ftl", "drive", "element zero", "eezo", "mass effect field", "safety", "radiation", "escape pod"],
        priority: 3,
        text: "[FTL Systems] Ships use Element Zero cores to reduce mass for FTL travel. Drive power requirements grow exponentially relative to ship mass, making massive ships either slow or costly. Safety is paramount: multi-core systems prevent field collapse (which causes catastrophic explosions). Ships must carry escape/survival pods, and all craft are legally required to register transponders and flight plans before aligning with a mass relay.",
        shifts: []
    },

    // 3.3: Commercial Shipping & Logistics
    {
        keywords: ["shipping", "cargo", "logistics", "trade", "relay", "convoy", "charon shipping", "ilos island"],
        priority: 3,
        text: "[Interstellar Logistics] Cargo flows follow mass-relay corridors. Bulk raw materials (ore, fuel, agri-goods) flow from colonies to manufacturing hubs, while finished technology flows back. Corporate logistics giants like Charon Shipping and Ilos Island Logistics manage supply lines like airlines. Relays have limited throughput, leading to scheduled transit windows and occasional orbital 'traffic jams' during wartime or surges.",
        shifts: []
    },

    // 3.4: Piracy & Insurance Risks
    {
        keywords: ["pirate", "raid", "piracy", "terminus", "batarian", "torfan", "insurance", "escort", "ambush"],
        priority: 3,
        text: "[Shipping Risks] Even in Council space, piracy is a threat. Outposts and convoys in the Terminus Systems face ambushes and slaving raids. High-value routes require expensive insurance and armed escorts. Historical military campaigns, such as the destruction of Batarian pirate bases around Torfan in the 2170s, highlight the persistent danger to civilian shipping and the volatility of frontier goods pricing.",
        shifts: []
    },

    // 3.5: Visas & Migration Regulation
    {
        keywords: ["migration", "visa", "transit authority", "cta", "permit", "quarantine", "forward humanity", "closed door"],
        priority: 3,
        text: "[Travel Regulation] Large-scale migration occurs from core worlds to frontiers like Ascension or Arcturus. The Citadel Transit Authority (CTA) processes permits, though species-specific clearances (especially for Batarians/Quarians) are strict. Crises trigger mass quarantines (e.g., Reaper plagues). Some groups, like 'Forward Humanity' on Earth, maintain aggressive 'closed door' policies to restrict alien immigration.",
        shifts: []
    },

    // 3.6: Refugees & The Migrant Fleet
    {
        keywords: ["refugee", "convoy", "cryo-stasis", "quarian", "migrant fleet", "flotilla", "admiralty"],
        priority: 3,
        text: "[Nomadic & Displaced Persons] War generates refugee convoys where children often sleep in cryo-stasis to conserve resources during long journeys. The Quarian Migrant Fleet is the ultimate nomadic society: 17 million people on 50,000 ships. They maintain an autonomous registry via the Admiralty Board and only dock for repairs and trade, keeping a cultural distance from Citadel society despite medical cooperation.",
        shifts: []
    },

// ==========================================
    // PRIORITY 4: COMMUNICATIONS & MEDIA
    // ==========================================
    
    // 4.1: Extranet Architecture & Relay-Buoys
    {
        keywords: ["extranet", "comm buoy", "signal", "bandwidth", "delay", "latency", "relay corridor", "courier"],
        priority: 4,
        text: "[Extranet Infrastructure] Civilian communications run over massive relay-buoy networks linking relays and planetary terminals. Within these buoy 'corridors,' data arrives near-instantaneously (latency is typically <0.5 light-seconds). Frontier users outside these corridors must rely on physical couriers or high-gain data bursts with significant delays. Bandwidth is a commodity, auctioned to the highest bidder; government and military traffic always receive first priority, followed by high-paying financial and news firms.",
        shifts: []
    },

    // 4.2: Military Encryption & QEC Systems
    {
        keywords: ["qec", "quantum entanglement", "encryption", "secure", "wiretap", "arcturus station", "hack", "jam"],
        priority: 4,
        text: "[Secure Comms] The highest security tier utilizes Quantum Entanglement Communicators (QECs). QEC links use entangled particle pairs to send data instantaneously anywhere in the galaxy; they are impossible to wiretap, jam, or intercept. Due to extreme cost and complexity, QEC bandwidth is tiny (single-bit) and restricted to fleet HQs like Arcturus Station. Tactical field units instead use encrypted laser or subspace bursts with layered quantum keys, which are theoretically breakable if the key-set is compromised.",
        shifts: []
    },

    // 4.3: News Networks & Frontline Reporting
    {
        keywords: ["news", "ann", "alliance news network", "broadcast", "diana allers", "war reporting", "press", "battle stats"],
        priority: 4,
        text: "[Media Ecosystem] Major outlets like the Alliance News Network (ANN) are corporate-owned and financially independent from the government. Media norms favor 'embedded journalism,' where reporters like Diana Allers fly directly into battle zones. During crises, news cycles consist of hourly battle statistics and victory maps interspersed with human-interest angles on refugee plight. While news is generally free, graphics of deadly details are often blurred to prevent mass panic.",
        shifts: []
    },

    // 4.4: Censorship & Government Surveillance
    {
        keywords: ["censorship", "monitor", "surveillance", "sigint", "backdoor", "agora", "metadata", "batarian", "throttling"],
        priority: 4,
        text: "[Network Oversight] Intelligence agencies (SIGINT) monitor extranet traffic using AI pattern-analysis. Official backdoors exist at major exchange hubs like the Citadel's Agora server farm, which mirrors high-volume traffic. Governments and corporations can impose restrictions: the Batarian Hegemony routinely throttles anti-government speech, while news outlets may self-censor sensitive military operations. However, sophisticated users often bypass these filters using VPN-like encrypted channels.",
        shifts: []
    },

    // 4.5: Propaganda & Political Channels
    {
        keywords: ["propaganda", "cerberus network", "terra firma", "forward humanity", "indoctrinate", "bias", "subversive"],
        priority: 4,
        text: "[Political Media] Media often carries subtle propaganda. Cerberus Daily News and Terra Firma sponsor channels to broadcast pro-human, anti-Council messaging. Governments avoid direct ownership to maintain credibility but use 'briefings' to influence narrative. Corporate sponsors also blur the line between news and marketing by controlling story airtime, effectively steering public opinion through curated information flow.",
        shifts: []
    },

    // 4.6: Translation & The Trade Tongue
    {
        keywords: ["translator", "neural implant", "galactic basic", "language", "dialect", "bioluminescence", "understanding"],
        priority: 4,
        text: "[Cross-Species Comms] Language barriers are non-existent by 2180 due to personal neural translators (wearable or implanted) that provide real-time audio-visual translation. 'Galactic Basic' serves as an artificial trade tongue taught in all schools. Even exotic communication, such as Hanar bioluminescence, is seamlessly translated by computer. While cultural nuances and idioms can still be lost, all galactic media is automatically localized for the recipient's native species.",
        shifts: []
    },

// ==========================================
    // PRIORITY 5: ECONOMY, LABOR & SHADOW MARKETS
    // ==========================================
    
    // 5.1: Labor Systems (Core vs. Frontier)
    {
        keywords: ["labor", "work", "job", "union", "guild", "voucher", "indenture", "credit", "contract"],
        priority: 5,
        text: "[Labor Markets] Core economies are dominated by technical guilds and service professionals. The Alliance and Citadel governments guarantee jobs via training vouchers, though unionization is weak. In the Terminus and frontier regions, conditions are harsher; workers are often tied to sites via 'indenture' or paid in 'labor credits' rather than credits. Dangerous industries like asteroid popping hire mercenary crews with minimal safety protections.",
        shifts: []
    },

    // 5.2: Corporate Sovereignty & Megacorps
    {
        keywords: ["corp", "corporation", "megacorp", "sirta", "armax", "payroll", "company planet", "gig culture"],
        priority: 5,
        text: "[Corporate Dominance] Large conglomerates effectively run entire planetary economies. On 'company planets,' nearly everyone is on a corporate payroll (e.g., Ilari farm laborers). These megacorps build and maintain all city infrastructure, roads, and security, causing citizens to owe allegiance to the brand over any government. Gig and contractor culture is the norm for transport pilots and orbital miners.",
        shifts: []
    },

    // 5.3: Species-Based Economic Stratification
    {
        keywords: ["status", "hierarchy", "inequality", "discrimination", "prejudice", "asari elite", "volus banking"],
        priority: 5,
        text: "[Social Stratification] A subtle hierarchy exists: Council races (Asari, Salarian, Turian) hold senior leadership and high-status roles. Humans typically fill middle management or entrepreneurial niches. Marginalized species like Batarians, Krogan, and Quarians face systemic discrimination and hiring hurdles. The Volus occupy a unique niche in banking—wealthy in their own economy but excluded from top-tier leadership.",
        shifts: []
    },

    // 5.4: Wealth Distribution & Oligarchies
    {
        keywords: ["wealth", "rich", "billionaire", "oligarch", "credit slinger", "patent", "lobbyist", "estates"],
        priority: 5,
        text: "[Wealth Gaps] Capital is controlled by a transgalactic elite: Volus banking clans, Asari trading houses, and human industrialists. On Earth, the gap between the ultra-rich and average citizens is vast. Corporate oligarchs utilize 100-year patents and intense lobbying to ensure laws favor capital growth. The elite live in lavish orbiting estates and private research labs, while peripheral colonies subsist on multi-generation loans.",
        shifts: []
    },

    // 5.5: Political Patronage & Favoritism
    {
        keywords: ["patronage", "favoritism", "spectre", "bureaucrat", "spoils", "warlord", "influence"],
        priority: 5,
        text: "[Political Influence] Patronage systems dictate advancement. Council states often nominate Spectres from families with a tradition of service. Regional governors favor their own demographics for bureaucratic jobs. In Krogan society, Warlords distribute spoils to loyal clans. These networks of favoritism define who gains wealth and ensures that political power remains tied to specific familial or racial lineages.",
        shifts: []
    },

    // 5.6: Smuggling & Black Markets
    {
        keywords: ["smuggle", "contraband", "darkweb", "geth hardware", "forged", "stolen", "omega", "haven", "artifact"],
        priority: 5,
        text: "[Illicit Trade] Black-market activity accounts for 15-20% of galactic commerce. 'Courier networks' ship contraband like unlicensed AI code and Geth hardware along hidden asteroid paths. Freeports like Omega and Haven serve as hubs for stolen goods and forged documents. Pirates frequently act as smuggler escorts, charging high fees for safe passage through lawless sectors.",
        shifts: []
    },

    // 5.7: Illegal AI & Biotic Research
    {
        keywords: ["illegal research", "cerberus", "unlicensed", "biotic nodule", "enhancer", "drug", "terminator monk"],
        priority: 5,
        text: "[Shadow R&D] A thriving shadow economy exists for banned technology. Cerberus and wealthy patrons fund off-the-books labs for prohibited AI research or experimental biotic nodule transplants. Unlicensed 'training drugs' circulate on worlds like Mirr Haven to boost biotic ability. This trade is risky; the 'Terminator Monks' of Sur'Kesh are known to execute unauthorized biotic surgeons and unlicensed researchers.",
        shifts: []
    },

    // 5.8: Diverse Lifestyles (Cosmopolitan to Nomadic)
    {
        keywords: ["lifestyle", "secular", "cosmopolitan", "nomadic", "warrior", "monastic", "temple", "tradition"],
        priority: 5,
        text: "[Cultural Lives] Core world life is secular and cosmopolitan, defined by cross-cultural fusion in food and art. Conversely, Krogan and Turian societies are defined by martial discipline and warrior clan honor. The Quarian Migrant Fleet practices a communal, survivalist lifestyle where individual property is non-existent. Deep-space religious enclaves, such as Hanar monasteries or Batarian Thorian cults, balance high-tech living with ancient spiritual rituals.",
        shifts: []
    },

// ==========================================
    // PRIORITY 6: SCIENCE, EDUCATION & LIFESTYLES
    // ==========================================
    
    // 6.1: University & Cross-Species Exchange
    {
        keywords: ["university", "academy", "college", "student", "mars", "thessia", "sur'kesh", "exchange", "degree"],
        priority: 6,
        text: "[Academic Networks] Major institutions like Starfleet Academy (Mars), Citadel College, and the Lysium Institute host multicultural programs where students collaborate on exobiology and engineering. While the Galactic Science Alliance fosters cooperation, a 'brain drain' exists as frontier students relocate to core universities. Education on core worlds is seen as a public good, often fully subsidized by the state.",
        shifts: []
    },

    // 6.2: Funding & R&D Overlap
    {
        keywords: ["funding", "grant", "applied science", "pure science", "r&d", "dual-use", "zero-point", "physics"],
        priority: 6,
        text: "[Research Funding] Science is funded by a mix of government grants for 'pure science' (astrophysics) and corporate contracts for 'applied R&D' (pharmaceuticals, drives). The line between civilian and military research is blurry; 'dual-use' technologies like zero-point energy are studied for power grids but possess high weapon potential. During wartime, civilian projects are frequently redirected to military efforts.",
        shifts: []
    },

    // 6.3: Innovation Hubs & Corporate Dominance
    {
        keywords: ["innovation", "discovery", "breakthrough", "sirta", "creative helium", "armax", "patent", "intellectual property"],
        priority: 6,
        text: "[Technological Advancement] Innovation centers like Earth's research belt and Sur'Kesh science parks set the galactic pace. Corporate R&D leads the way, exemplified by Sirta Foundation's Medi-gel or Creative Helium's drive projects. These firms patent aggressively; while breakthroughs propagate via the extranet and omni-fabricators, corporate secrecy often hinders basic research to maintain market advantages.",
        shifts: []
    },

    // 6.4: Legal Restrictions & The AI Ban
    {
        keywords: ["ai ban", "illegal research", "restriction", "wmd", "bioweapon", "geth", "huntsman", "lazarus"],
        priority: 6,
        text: "[Scientific Law] Post-Geth, AI research is strictly limited to 'narrow' virtual intelligences (VIs). Conscious AI creation is a capital crime. Weapons R&D is heavily regulated; bioweapons and chemical agents are outlawed, with experimental research confined to high-security Alliance facilities like the Huntsman Project. Radical cybernetic enhancement (e.g., Lazarus-style projects) is prohibited without extreme military authorization.",
        shifts: []
    },

    // 6.5: Knowledge Stratification & Access
    {
        keywords: ["inequality", "brain drain", "bandwidth", "literacy", "trade school", "curriculum", "vr lecture"],
        priority: 6,
        text: "[Educational Divide] Knowledge access is a class marker. Core worlds emphasize theoretical science and liberal arts, while frontier education is pragmatic (mining, agronomy). High-speed bandwidth required for real-time VR lectures or research archives is often unavailable in deep space. This creates a divide where elite professionals are Citadel-trained, while frontier workers rely on basic trade schooling.",
        shifts: []
    },

    // 6.6: Elite Institutional Influence
    {
        keywords: ["pinnacle research society", "elite", "think tank", "social capital", "prestige", "admission"],
        priority: 6,
        text: "[Elite Structures] The Pinnacle Research Society helps set galactic education standards. Admission to top academies (Lysium, Mars Tech) often depends on social capital, family prestige, or political connections rather than just merit. This perpetuates a trans-galactic elite 'tradition branch' where the 1% of families share advanced knowledge and maintain institutional control across generations.",
        shifts: []
    },
];

// --- 3. EXECUTION LOGIC (Process by Priority, Appending Context) ---
var appliedCount = 0;
var outputContext = "";
var prioritiesToCheck = [1, 2, 3, 4, 5, 6]; 

for (var p = 0; p < prioritiesToCheck.length; p++) {
    if (appliedCount >= APPLY_LIMIT) break; 
    
    var currentPri = prioritiesToCheck[p];
    
    for (var j = 0; j < lorebook.length; j++) {
        if (appliedCount >= APPLY_LIMIT) break;
        
        var entry = lorebook[j];
        if (entry.priority !== currentPri) continue;
        
        // 1. Check if the parent entry triggers
        var parentMatch = false;
        for (var k = 0; k < entry.keywords.length; k++) {
            if (padded.indexOf(" " + entry.keywords[k] + " ") !== -1) {
                parentMatch = true;
                break;
            }
        }
        
        if (parentMatch) {
            outputContext += "\n" + entry.text;
            appliedCount++;
            
            // 2. Check for deeper sub-refinements (Shifts)
            if (entry.shifts && entry.shifts.length > 0) {
                for (var s = 0; s < entry.shifts.length; s++) {
                    var shift = entry.shifts[s];
                    var shiftMatch = false;
                    for (var sk = 0; sk < shift.keywords.length; sk++) {
                        if (padded.indexOf(" " + shift.keywords[sk] + " ") !== -1) {
                            shiftMatch = true;
                            break;
                        }
                    }
                    if (shiftMatch) {
                        outputContext += " " + shift.text; // Append the specific refinement
                        break; // Stop after the first relevant shift to prevent bloat
                    }
                }
            }
        }
    }
}

// Apply gathered lore securely to the scenario
if (outputContext !== "") {
    context.character.scenario += "\n\n[System Lore Override:" + outputContext + "\n]";
}