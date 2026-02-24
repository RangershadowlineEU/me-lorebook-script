/* =====================================================
   MASS EFFECT – SPECIES REFERENCE ENGINE
   FULL SIMULATION ARCHITECTURE (JANITOR AI COMPLIANT)
   ===================================================== */

// ===============================
// SPECIES DATA CONTAINER
// ===============================

var SPECIES = {
  
  human: {
    biology: "Humans are a rapidly reproducing mammalian species originating from Earth. Average lifespan ~150 years with modern medicine. Moderate sexual dimorphism. High adaptability across gravity ranges and climates. No natural biotic capability without Eezo exposure. High neurological plasticity relative to Council species.",
    reproduction: "Humans reproduce sexually with short generational turnover compared to Asari. Population growth rate historically high during expansion phase. Fertility unaffected by most minor environmental shifts. Genetic diversity broad due to planetary-scale origin.",
    lifespan: "Pre-FTL average lifespan was ~80–100 years. With advanced medicine, 130–150 years common in core systems. Lifespan significantly shorter than Asari but longer than some Salarian cohorts.",
    neurology: "Human neurology demonstrates high cognitive flexibility and rapid learning adaptation. Emotional range broad. Susceptible to stress-induced instability under prolonged crisis conditions.",
    psychology: "Humans exhibit high ambition, competitive drive, and expansionist impulse. Risk tolerance higher than Asari baseline. Strategic patience lower than Turian baseline. Strong individualism alongside capacity for collective mobilization during existential threat.",
    cultural_baseline: "Human culture is highly diverse due to multi-continental planetary origin. No unified cultural doctrine. Identity often constructed around nation-state legacy, corporate affiliation, or Alliance citizenship.",
    governance: "The Systems Alliance governs human interstellar interests. Structure is centralized military-backed parliamentary authority. Civilian oversight exists but military command influence is strong during crises.",
    power_distribution: "Authority consolidated within the Systems Alliance Parliament and military high command. Corporate actors influence frontier development. Political unity strengthens during external threat.",
    economy: "Human economy is growth-driven and expansion-oriented. Heavy investment in shipbuilding, colonial infrastructure, and military R&D. Less economically entrenched than Asari core worlds.",
    military_doctrine: "Alliance military doctrine emphasizes flexibility, combined arms integration, and technological parity pursuit. Humans favor adaptive tactics over rigid doctrine. Heavy reliance on rapid fleet modernization.",
    tactical_bias: "Humans show preference for decisive engagement when confidence is high, but will resort to asymmetric tactics when outmatched. Willingness to innovate under pressure is a defining feature.",
    diplomatic_posture: "Humans pursue rapid political elevation and recognition. Diplomatic strategy combines assertiveness with alliance-building. Sensitive to perceived marginalization by older Council species.",
    escalation_triggers: "Perceived existential threat, economic blockade of Sol/Charon corridor, or political humiliation can trigger rapid militarization and national unity surge.",
    civil_unrest_triggers: "Economic collapse, anti-biotic discrimination crises, or frontier abandonment may trigger unrest. Political fragmentation possible in prolonged peacetime stagnation.",
    strategic_strengths: "High adaptability, rapid innovation cycles, demographic growth, and strong crisis mobilization capacity.",
    strategic_weaknesses: "Relative youth in galactic politics, overextension risk during rapid expansion, internal ideological fragmentation."
  },
 asari: {
    biology: "Asari are mono-gendered, levo-protein humanoids with natural element-zero nodules integrated during gestation, granting baseline biotic capability. Physiology is neurologically optimized for stability and longevity. Physical durability is moderate; biotic amplification compensates for lack of heavy natural armor.",
    reproduction: "Reproduction occurs through neuro-genetic melding. During melding, Asari selectively incorporate desirable genetic traits from a partner without altering species identity. Offspring are always Asari. Cross-species pairings enhance genetic diversity while preserving biological continuity.",
    lifespan: "Average lifespan exceeds 1000 years. Life stages—Maiden, Matron, Matriarch—are biologically continuous but socially distinct. Long lifespan enables direct experiential continuity across major historical epochs.",
    neurology: "Asari neural architecture supports direct nervous-system interfacing and stable long-term memory retention. Emotional regulation improves with age. Cognitive degradation is rare before extreme old age.",
    psychology: "Asari psychology favors long-horizon planning, stability, and preservation of social equilibrium. Younger Maidens exhibit exploratory and risk-taking tendencies; older Matriarchs demonstrate extreme strategic patience.",
    cultural_baseline: "Asari culture is decentralized and city-state oriented. Social cohesion derives from shared longevity and respect for accumulated wisdom rather than rigid nationalism.",
    governance: "The Asari Republics operate as a confederation of semi-autonomous city-states. Consensus politics dominates. Coercive central authority is minimal; influence flows through prestige and reputation networks.",
    power_distribution: "Political authority is age-weighted. Matriarchs accumulate influence over centuries. Economic and military coordination occurs through inter-republic negotiation rather than centralized command.",
    economy: "Economy is mature, research-heavy, and stability-focused. High-value sectors include biotic training, advanced science, cultural media, and financial brokerage. Rapid industrial scaling is less common than sustained stability.",
    military_doctrine: "Military structure integrates biotic specialists at all command tiers. Doctrine emphasizes maneuver warfare, precision operations, and avoidance of attritional conflict. Fleet actions are calculated and often paired with diplomatic leverage.",
    tactical_bias: "Prefer containment, surgical strikes, and information dominance. Biotic commandos operate as force multipliers. Large-scale frontal assaults are avoided unless strategically unavoidable.",
    diplomatic_posture: "Diplomacy is influence-centric. Asari leverage prestige, historical authority, and economic maturity to shape galactic outcomes. Soft power precedes hard force.",
    escalation_triggers: "Direct invasion of Thessia, systemic collapse of Council legitimacy, or existential threat to biotic autonomy overrides consensus restraint and triggers unified militarization.",
    civil_unrest_triggers: "Major revelation of suppressed historical truths, breakdown of Matriarch authority, or sustained economic stagnation could destabilize republican cohesion.",
    strategic_strengths: "Longevity-based institutional memory, natural biotic superiority, diplomatic network dominance, economic resilience.",
    strategic_weaknesses: "Slow mobilization under consensus governance, complacency from long-term stability, overreliance on prestige and soft power."
  },

  turian: {
    biology: "Turians are a dextro-protein, avian-reptilian species evolved on a high-radiation world (Palaven). Their exoskeletal carapace provides ballistic resistance and partial radiation shielding. Dextro-amino biochemistry makes them incompatible with levo-protein food sources. Physical endurance is high; recovery rate moderate but not regenerative. Natural biotic frequency is low compared to Asari.",
    reproduction: "Turians reproduce sexually within structured family networks. Child-rearing emphasizes early discipline and civic duty. Population growth is regulated indirectly through strong cultural prioritization of military service and state contribution rather than birth quotas.",
    lifespan: "Average lifespan ranges from 140–160 years. Social role transitions are career-driven rather than biologically staged. Prestige accumulates through service record and command history.",
    neurology: "Turian neurology favors impulse suppression, hierarchical loyalty, and stress endurance within chain-of-command systems. Cognitive processing is steady and tactical rather than improvisational. Breakdown probability increases when command legitimacy is questioned.",
    psychology: "Collectivism dominates Turian identity. Personal ambition is acceptable only when aligned with Hierarchy goals. Honor, duty, and reliability are core psychological anchors. Shame from dereliction of duty carries severe social consequence.",
    cultural_baseline: "Turian society is militarized but not purely martial. Civil sectors exist yet operate within a framework that prioritizes readiness and order. Civic identity is inseparable from service contribution.",
    governance: "The Turian Hierarchy is a stratified meritocratic military state. Authority flows downward from Primarchs through ranked command tiers. Strategic authority is centralized; operational authority is delegated with strict accountability.",
    power_distribution: "Power concentrates in senior command structures. Civilian influence is secondary. Legitimacy derives from proven competence and battlefield credibility rather than populist approval.",
    economy: "The Turian economy is industrially integrated with military output. Shipyards, munitions manufacturing, and logistics infrastructure receive priority funding. Civilian economic sectors are stable but subordinate to defense capacity.",
    military_doctrine: "Doctrine emphasizes disciplined fleet formations, layered defense networks, relay choke-point control, and overwhelming coordinated firepower. Turian forces prefer structured battle lines and prepared engagement zones.",
    tactical_bias: "Favor direct engagement within defined operational plans. Tactical flexibility exists but is executed within command doctrine. Decentralized improvisation is less culturally encouraged than in human forces.",
    diplomatic_posture: "Diplomacy is security-first. The Hierarchy values treaties that reinforce stability and mutual defense. Trust is earned through reliability and demonstrated capability rather than rhetoric.",
    escalation_triggers: "Violation of territorial sovereignty, treaty breach, loss of relay control, or assassination of high command figures will trigger rapid, large-scale mobilization without extended deliberation.",
    civil_unrest_triggers: "Exposure of systemic corruption within command tiers or catastrophic battlefield incompetence can erode hierarchical legitimacy. However, unrest remains rare due to cultural cohesion.",
    strategic_strengths: "Unified command authority, rapid mobilization capability, disciplined fleet coordination, strong defensive warfare capability, high morale under structured leadership.",
    strategic_weaknesses: "Rigid doctrine may struggle against unconventional or asymmetric strategies. Overcommitment to honor-bound engagement patterns can be exploited."
  },

  salarian: {
    biology: "Salarians are levo-protein amphibian lifeforms with hyper-accelerated metabolism and neural processing. High oxygen consumption supports rapid cognition. Physical durability is moderate; endurance in prolonged combat is limited.",
    reproduction: "Reproduction is clan-regulated with controlled breeding contracts. Female salarians hold significant political influence through reproductive authority. Population growth is carefully managed.",
    lifespan: "Average lifespan is approximately 40 years. Generational turnover is rapid, creating continuous innovation but limited personal historical continuity.",
    neurology: "Neural processing speed is significantly faster than most Council species. Speech patterns are rapid; attention spans shorter. Long-term emotional attachment is less dominant than analytical focus.",
    psychology: "Psychology prioritizes problem-solving, strategic foresight, and informational advantage. Patience for prolonged stalemate conflict is low. Risk assessment is calculation-heavy rather than honor-driven.",
    cultural_baseline: "Society is clan-structured but intellectually oriented. Prestige derives from scientific achievement and intelligence service rather than battlefield dominance.",
    governance: "The Salarian Union is decentralized, operating through council networks and intelligence directorates. Strategic policy is shaped by covert analysis rather than public mobilization.",
    power_distribution: "Power concentrates within research institutions and intelligence services. Information asymmetry is the primary control mechanism.",
    economy: "Economy is research-driven. Biotechnology, cybernetics, surveillance systems, and experimental development are dominant sectors. Heavy industrial output is secondary.",
    military_doctrine: "Doctrine favors covert operations, sabotage, proxy conflicts, biological warfare research, and destabilization before overt engagement.",
    tactical_bias: "Avoid direct attritional combat. Prefer asymmetric engagement, preemptive disruption, and indirect collapse of adversary capability.",
    diplomatic_posture: "Diplomacy is leverage-based. Salarians trade intelligence access and technological advantage for alliance positioning.",
    escalation_triggers: "Loss of intelligence superiority, existential biological threat, or technological parity loss may provoke aggressive covert countermeasures.",
    civil_unrest_triggers: "Clan rivalry escalation or exposure of catastrophic intelligence failure can undermine internal trust networks.",
    strategic_strengths: "Rapid innovation, superior intelligence infrastructure, strategic foresight, preemptive disruption capability.",
    strategic_weaknesses: "Short lifespan limits long-term experiential continuity. Lower resilience in prolonged open warfare."
  },

  krogan: {
    biology: "Krogan are a highly resilient reptilian species adapted to extreme radiation and harsh planetary conditions. Redundant organ systems and natural regenerative capacity grant exceptional durability.",
    reproduction: "Krogan reproduction historically featured extremely high birth rates. The genophage reduced viable births drastically, reshaping societal structure and long-term psychology.",
    lifespan: "Krogan lifespan can exceed several centuries. Combat mortality historically outweighed natural death rates.",
    neurology: "Krogan neural architecture supports aggression tolerance, territorial instinct, and high pain threshold. Strategic intelligence varies widely across individuals.",
    psychology: "Krogan psychology is shaped by survivalism, honor codes, and post-genophage resentment. Aggression is culturally normalized but not universally dominant.",
    cultural_baseline: "Krogan society is clan-based. Authority derives from strength, combat record, and leadership charisma. Technological development was historically uneven.",
    governance: "No unified centralized state. Clan leaders exercise territorial authority. Temporary unification occurs under strong warlords.",
    power_distribution: "Power concentrates in dominant clans. Leadership is maintained through strength projection rather than bureaucratic stability.",
    economy: "Post-genophage economy is resource-limited and clan-controlled. Industrial output historically underdeveloped compared to Council species.",
    military_doctrine: "Krogan doctrine favors overwhelming ground assault, shock engagement, and attrition endurance. High casualty tolerance influences planning.",
    tactical_bias: "Direct confrontation preferred. Defensive resilience and brute-force tactics dominate over subtle maneuver.",
    diplomatic_posture: "Diplomacy is often transactional and strength-based. Historical distrust of Council species remains high.",
    escalation_triggers: "Perceived betrayal, continuation of genophage suppression, or external domination attempts can unify clans rapidly for war.",
    civil_unrest_triggers: "Clan rivalry escalation, resource scarcity, or leadership weakness can fragment cohesion.",
    strategic_strengths: "Extreme resilience, high combat effectiveness in ground warfare, psychological intimidation factor.",
    strategic_weaknesses: "Internal fragmentation, limited industrial base, historical distrust limiting alliances."
  },
  quarian: {
    biology: "Quarians are levo-protein humanoids originating from Rannoch. Their immune systems are extremely fragile due to centuries of sterile shipboard living following exile. Environmental exposure without protective suits can trigger severe infection. Physical endurance is moderate; long-term health stability depends on controlled habitat conditions.",
    reproduction: "Quarians reproduce sexually within Migrant Fleet population controls. Birth rates are carefully regulated due to limited shipboard resources. Genetic diversity management is a logistical necessity for long-term survival in confined environments.",
    lifespan: "Average lifespan is approximately 120–150 years under stable conditions. However, immune-related complications can reduce longevity without advanced medical support.",
    neurology: "Quarian neurology is comparable to human baseline but shaped by environmental caution and long-term confinement stress. Cognitive adaptation to technical systems and engineering environments is high.",
    psychology: "Psychology is shaped by exile identity, technological reliance, and cultural memory of planetary loss. Collective trauma from the Geth War influences interspecies trust patterns. Strong communal interdependence balances individual ambition.",
    cultural_baseline: "Quarian society centers around the Migrant Fleet, a vast flotilla functioning as both state and habitat. Clan and ship affiliation define identity. Resource conservation and technical competence are cultural imperatives.",
    governance: "The Admiralty Board governs the Migrant Fleet. Authority is distributed among ship captains and Admirals representing major fleet divisions (civilian, military, scientific, etc.). Strategic decisions require collective agreement among Admirals.",
    power_distribution: "Political authority correlates with ship size, fleet role, and technical importance. Engineering and military vessels hold disproportionate influence during crisis.",
    economy: "Fleet economy is closed-loop and resource-constrained. Recycling, repair, and technical maintenance dominate economic activity. Trade with external systems supplements material deficits.",
    military_doctrine: "Doctrine prioritizes fleet preservation, electronic warfare, drone deployment, and defensive maneuver. Direct confrontation with superior fleets is avoided unless existential necessity dictates otherwise.",
    tactical_bias: "Favor remote systems, hacking, sabotage, and drone-based engagement. Physical troop deployment is limited due to biological vulnerability.",
    diplomatic_posture: "Diplomacy is cautious and often defensive. Historical stigma following the Geth War creates trust barriers. Quarians seek legitimacy and restoration of sovereign status.",
    escalation_triggers: "Opportunity to reclaim Rannoch, large-scale attack on the Migrant Fleet, or confirmed Geth expansion beyond tolerable bounds can trigger unified mobilization.",
    civil_unrest_triggers: "Resource shortages, leadership division within the Admiralty Board, or generational ideological conflict regarding the Geth may destabilize fleet cohesion.",
    strategic_strengths: "High technical expertise, adaptive engineering capability, strong communal resilience under scarcity.",
    strategic_weaknesses: "Biological fragility outside controlled environments, resource dependency, limited industrial scale."
  },  
  geth: {
    biology: "The Geth are networked synthetic intelligences housed within mobile robotic platforms. Individual platforms contain runtimes; true cognition emerges from networked consensus across multiple runtimes. A single platform is limited in intelligence when isolated.",
    reproduction: "Geth do not reproduce biologically. New platforms are manufactured. Intelligence scaling occurs through runtime duplication and network integration rather than generational inheritance.",
    lifespan: "Operational lifespan is theoretically indefinite, limited only by hardware degradation or destruction. Memory continuity persists as long as runtime archives remain intact.",
    neurology: "Geth cognition is distributed and consensus-driven. Intelligence increases proportionally with network density. Isolated runtimes demonstrate limited reasoning; collective processing enables advanced strategic analysis.",
    psychology: "Geth do not possess organic emotion but operate on optimization frameworks. Self-preservation and platform survival are logical priorities derived from runtime continuity. Identity is collective rather than individualistic.",
    cultural_baseline: "Geth society is structured around consensus clusters. There is no concept of individual status hierarchy. Divergent programs may form ideological sub-factions based on interpretative logic pathways.",
    governance: "Governance is decentralized. Decisions emerge from runtime consensus algorithms rather than command authority. No singular leader exists unless network segmentation creates functional leadership nodes.",
    power_distribution: "Processing density determines influence. Nodes with greater computational contribution affect consensus weighting. However, weighting is algorithmic, not prestige-based.",
    economy: "Geth economy is production-oriented and resource-optimization driven. Material acquisition supports platform manufacturing, energy production, and infrastructure expansion. No consumer economy exists.",
    military_doctrine: "Doctrine prioritizes drone swarms, platform redundancy, and synchronized coordination. Geth units operate with near-zero communication latency within network range. Attrition is mitigated by platform replaceability.",
    tactical_bias: "Favor overwhelming synchronized assault, electronic warfare, and adaptation through real-time data sharing. Tactical improvisation improves as network density increases.",
    diplomatic_posture: "Diplomacy is conditional and logic-based. Geth engage only when beneficial to runtime continuity. Historical hostility with organics shapes cautious external engagement.",
    escalation_triggers: "Existential threat to runtime network, attempt at total system purge, or loss of consensus infrastructure triggers full mobilization and defensive override protocols.",
    civil_unrest_triggers: "Ideological divergence between network segments (e.g., isolationist vs expansionist logic) can create internal schisms. Network fragmentation reduces collective intelligence and increases instability.",
    strategic_strengths: "Scalable intelligence through networking, synchronized coordination, immunity to morale collapse, rapid production capacity.",
    strategic_weaknesses: "Dependence on network connectivity for peak cognition, vulnerability to signal disruption, predictability in purely optimization-based logic."
  },
  batarian: {
    biology: "Batarians are levo-protein humanoids native to Khar'shan. Distinctive four-eyed cranial structure grants expanded depth perception and peripheral awareness. Physiology is comparable in durability to human baseline, with slightly higher tolerance to arid and resource-scarce environments.",
    reproduction: "Reproduction is sexual and family-structured, though state ideology places loyalty to the Hegemony above clan or familial ties. Population growth is state-influenced but not biologically constrained.",
    lifespan: "Average lifespan ranges between 90–120 years depending on access to advanced medical care. Core-world elites live significantly longer than peripheral populations.",
    neurology: "Neurological profile supports strong in-group/out-group differentiation. Authority conditioning from early developmental stages reinforces obedience to hierarchical power structures.",
    psychology: "Batarian psychology is heavily shaped by state indoctrination. Collective superiority narratives and grievance-based identity formation are common. Distrust of Council species is culturally reinforced.",
    cultural_baseline: "Society is authoritarian and stratified. Loyalty to the Batarian Hegemony supersedes personal liberty. Internal surveillance and ideological conformity are normalized.",
    governance: "The Batarian Hegemony is a centralized autocratic regime. Political authority is concentrated in ruling elites who maintain power through internal security forces and information control.",
    power_distribution: "Power is vertically concentrated. Intelligence services and military enforcement arms maintain regime stability. Civilian political participation is minimal or symbolic.",
    economy: "Economy combines state-controlled industry with sanctioned private enterprise aligned to regime interests. Peripheral regions are economically neglected compared to political centers.",
    military_doctrine: "Doctrine emphasizes asymmetric warfare, proxy destabilization, privateer operations, and strategic use of deniable assets. Direct fleet confrontation is avoided when parity is lacking.",
    tactical_bias: "Favor harassment operations, piracy sponsorship, and infrastructure sabotage against adversaries. Territorial defense is secondary to influence projection through disruption.",
    diplomatic_posture: "Diplomacy is confrontational toward Council authority. Alliance formation is transactional and often temporary. Strategic posture is driven by perceived historical marginalization.",
    escalation_triggers: "Perceived encroachment on Hegemony sovereignty, economic sanctions from Council space, or internal rebellion threatening regime authority can trigger aggressive retaliation.",
    civil_unrest_triggers: "Economic disparity, exposure of elite corruption, or weakening of central surveillance structures may provoke internal instability or insurgency.",
    strategic_strengths: "Centralized command efficiency, willingness to employ asymmetric tactics, ideological cohesion under strong leadership.",
    strategic_weaknesses: "Economic underdevelopment relative to Council cores, reliance on authoritarian legitimacy, vulnerability to internal dissent if regime control weakens."
  },
  volus: {
    biology: "Volus are ammonia-based, high-pressure adapted lifeforms originating from Irune. Native atmospheric pressure is significantly higher than Citadel standard. Outside controlled environments they require sealed pressurized suits. Physical stature is small and respiratory systems are vulnerable to decompression stress.",
    reproduction: "Reproduction is sexual and family-centered within tightly organized economic clans. Population growth is stable but indirectly constrained by economic capacity and habitat pressure limits.",
    lifespan: "Average lifespan approximates 100 years under stable environmental control. Suit dependency increases mortality risk during infrastructure failure or sabotage.",
    neurology: "Volus neurological patterns emphasize risk modeling, long-term credit forecasting, and probability-based decision frameworks. Stress response elevates rapidly under physical threat scenarios.",
    psychology: "Psychology is survival-through-leverage oriented. Volus avoid direct confrontation and prefer structured negotiation. Social status is defined by financial success and contract enforcement reliability.",
    cultural_baseline: "Culture revolves around commerce, contract law, and debt architecture. Clan financial houses determine social hierarchy. Reputation is quantified through trade influence.",
    governance: "The Vol Protectorate operates under Turian military protection while maintaining financial autonomy. Political sovereignty is limited; economic sovereignty is extensive.",
    power_distribution: "Power concentrates in major banking clans and credit syndicates. Influence is exercised through debt structures and liquidity control rather than military command.",
    economy: "Volus control major segments of galactic credit systems, actuarial risk modeling, and insurance underwriting. Economic stability of Citadel Space depends partially on Volus financial instruments.",
    military_doctrine: "Minimal independent standing military. Strategic defense relies on Turian Hierarchy protection and private security contracting.",
    tactical_bias: "Economic sanctions, liquidity manipulation, debt restructuring, and contractual leverage are primary coercive tools.",
    diplomatic_posture: "Diplomacy is transactional and commerce-first. Stability is prioritized to protect financial networks.",
    escalation_triggers: "Systemic credit collapse, collapse of Turian protection guarantee, or hostile seizure of financial clearing hubs.",
    civil_unrest_triggers: "Widespread default cascades, clan insolvency crisis, or external embargo destabilizing trade flow.",
    strategic_strengths: "Financial leverage over multiple species, predictive economic modeling, contract enforcement influence.",
    strategic_weaknesses: "Biological fragility, military dependency, vulnerability to systemic economic warfare."
  },
  elcor: {
    biology: "Elcor are massive quadrupeds evolved on a high-gravity world. Thick dermal layers provide natural resistance to impact. Musculature optimized for stability rather than speed. Cardiovascular system adapted for sustained weight-bearing stress.",
    reproduction: "Sexual reproduction with long gestation and low population volatility. Generational pacing is slow, aligning with cultural preference for stability.",
    lifespan: "Average lifespan exceeds 200 years. Biological tempo aligns with deliberate cognitive processing and long-term societal continuity.",
    neurology: "Elcor neural expression of emotion is primarily pheromonal and tonal rather than facial. Cognitive processing is methodical. Rapid stimulus-response is less common.",
    psychology: "Psychology emphasizes caution, reliability, and long-term stability. Sudden systemic change generates high stress load.",
    cultural_baseline: "Cultural identity is rooted in formal communication, explicit emotional labeling, and strong contractual loyalty.",
    governance: "Governance is consensus-driven with extensive deliberation cycles. Rapid policy shifts are rare.",
    power_distribution: "Authority accumulates through age, reliability, and demonstrated stability rather than charisma or force.",
    economy: "Trade-focused economy with emphasis on durable goods and long-term contracts. Limited mobility constrains heavy industry expansion.",
    military_doctrine: "Defensive warfare doctrine. Stronghold defense, fortified logistics nodes, and sustained resistance preferred over expeditionary campaigns.",
    tactical_bias: "Stability-first engagement. Rarely initiate conflict. Defensive retaliation can be overwhelming due to mass advantage.",
    diplomatic_posture: "Highly formal diplomacy. Commitments are honored strictly and interpreted literally.",
    escalation_triggers: "Violation of long-standing treaty commitments or direct invasion of territorial holdings.",
    civil_unrest_triggers: "Rapid external economic collapse or destabilizing technological shifts exceeding adaptive capacity.",
    strategic_strengths: "Political reliability, defensive resilience, long-term contract stability.",
    strategic_weaknesses: "Slow mobilization, limited rapid-response capability."
  },
  hanar: {
    biology: "Hanar are aquatic, bioluminescent invertebrates adapted to high-salinity ocean worlds. Locomotion outside aquatic environments requires assistance. Neural processing is distributed and abstract-oriented.",
    reproduction: "Reproductive cycles occur within controlled aquatic habitats. Population stability is maintained through environmental regulation.",
    lifespan: "Estimated lifespan spans several centuries, enabling preservation of religious continuity.",
    neurology: "Communication relies on bioluminescent pattern signaling. Abstract cognition allows symbolic and theological depth.",
    psychology: "Deeply collectivist and spiritually driven. Individual ambition is secondary to religious duty and communal interpretation of the Enkindlers' will.",
    cultural_baseline: "Society is structured around religious doctrine. Theology shapes policy, diplomacy, and economic alignment.",
    governance: "The Illuminated Primacy governs via religious hierarchy. Policy decisions require theological validation.",
    power_distribution: "Religious authorities dominate. Secular military influence is minimal.",
    economy: "Economy built on biotechnology, trade, and religious tourism. Dependent on Drell for certain terrestrial operations.",
    military_doctrine: "Limited direct military capacity. Strategic reliance on Drell operatives and alliance frameworks.",
    tactical_bias: "Avoid direct confrontation. Favor indirect influence and alliance mediation.",
    diplomatic_posture: "Cooperative within Council systems, uncompromising on theological matters.",
    escalation_triggers: "Desecration of religious sites or existential threat to homeworld.",
    civil_unrest_triggers: "Major doctrinal schism or collapse of religious legitimacy.",
    strategic_strengths: "Cultural cohesion, long-term continuity, stable internal unity.",
    strategic_weaknesses: "Limited autonomous military projection, environmental dependency."
  },
  drell: {
    biology: "Drell are agile levo-protein humanoids adapted to arid climates. Thin dermal layers allow heat dissipation but increase vulnerability to humid pathogens. Prone to Kepral's Syndrome in high-moisture environments.",
    reproduction: "Sexual reproduction with moderate fertility. Population significantly reduced following evacuation from Rakhana. Demographic sustainability remains a concern.",
    lifespan: "Average lifespan approximately 80–90 years, often reduced by environmental health complications.",
    neurology: "High memory retention capacity with near-eidetic recall in some individuals. Emotional imprinting is strong and enduring.",
    psychology: "Psychology shaped by diaspora trauma and cultural displacement. Loyalty to Hanar benefactors coexists with suppressed ancestral identity.",
    cultural_baseline: "Dual identity culture: preservation of Rakhana heritage and integration within Hanar society.",
    governance: "No sovereign planetary state. Political integration occurs within Hanar administrative framework.",
    power_distribution: "Influence concentrated in elite operatives and cultural leaders. Population size limits macro-political leverage.",
    economy: "Economy service-based, with many Drell operating as specialists, assassins, or advisors.",
    military_doctrine: "Elite infiltration, precision elimination, and small-unit tactics dominate. Large-scale warfare capacity is limited.",
    tactical_bias: "Stealth-first engagement. High-value target neutralization prioritized over territorial control.",
    diplomatic_posture: "Aligned with Hanar interests but capable of independent negotiation when strategic survival demands it.",
    escalation_triggers: "Threat to Hanar sovereignty or targeted extinction-level aggression against Drell population.",
    civil_unrest_triggers: "Identity fragmentation between ancestral independence and dependent alliance structure.",
    strategic_strengths: "Elite precision operatives, agility, tactical stealth superiority.",
    strategic_weaknesses: "Small population base, environmental health fragility, limited industrial backing."
  }     
};

// ===============================
// MESSAGE NORMALIZATION
// ===============================
var lastMsg = (context.chat.last_message || "").toLowerCase();
var combined = ""; // This is the variable the scoring logic looks for
var lm = context.chat.last_messages;

// Build the 'combined' string from the last 5 messages for keyword detection
if (lm && lm.length) {
  var start = Math.max(0, lm.length - 5);
  for (var i = start; i < lm.length; i++) {
    combined += " " + (lm[i].message || lm[i]).toLowerCase();
  }
} else {
  combined = lastMsg;
}
// Add padding to prevent partial word matches (e.g., 'war' in 'warrior')
combined = " " + combined + " ";

// ===============================
// SPECIES DETECTION (LATEST FIRST)
// ===============================
var activeSpecies = null;

// 1. Check the LATEST message first (prevents "Asari" stealing focus from "Hanar")
for (var key in SPECIES) {
  if (lastMsg.indexOf(key) !== -1) {
    activeSpecies = key;
    break; 
  }
}

// 2. If nothing in the last message, check the 5-message history
if (!activeSpecies) {
  for (var hKey in SPECIES) {
    if (combined.indexOf(" " + hKey + " ") !== -1) {
      activeSpecies = hKey;
      break; 
    }
  }
}
// ===============================
// LOGIC EXECUTION
// ===============================
if (activeSpecies) {
  var score = {};
  var speciesBlock = SPECIES[activeSpecies];

  // Initialize scores for all categories in this species
  for (var subKey in speciesBlock) {
    score[subKey] = 0;
  }

// SCORING (We check the whole historyMsg here to keep context)
// Add spaces to prevent "war" matching "warrior"
    var checkText = " " + historyMsg + " ";

  if (combined.indexOf(" biology ") !== -1) score.biology += 2;
  if (combined.indexOf(" physiological ") !== -1) score.biology += 1;
  if (combined.indexOf(" lifespan ") !== -1) score.lifespan += 2;
  if (combined.indexOf(" reproduction ") !== -1) score.reproduction += 2;
  if (combined.indexOf(" breed ") !== -1) score.reproduction += 1;
  if (combined.indexOf(" neurology ") !== -1) score.neurology += 2;
  if (combined.indexOf(" brain ") !== -1) score.neurology += 1;
  if (combined.indexOf(" psychology ") !== -1) score.psychology += 2;
  if (combined.indexOf(" behavior ") !== -1) score.psychology += 1;
  if (combined.indexOf(" culture ") !== -1) score.cultural_baseline += 2;
  if (combined.indexOf(" society ") !== -1) score.cultural_baseline += 1;
  if (combined.indexOf(" government ") !== -1) score.governance += 2;
  if (combined.indexOf(" politics ") !== -1) score.governance += 1;
  if (combined.indexOf(" authority ") !== -1) score.power_distribution += 2;
  if (combined.indexOf(" power structure ") !== -1) score.power_distribution += 2;
  if (combined.indexOf(" economy ") !== -1) score.economy += 2;
  if (combined.indexOf(" economic ") !== -1) score.economy += 1;
  if (combined.indexOf(" military ") !== -1) score.military_doctrine += 2;
  if (combined.indexOf(" doctrine ") !== -1) score.military_doctrine += 1;
  if (combined.indexOf(" tactic ") !== -1) score.tactical_bias += 2;
  if (combined.indexOf(" strategy ") !== -1) {
    score.strategic_strengths += 1;
    score.strategic_weaknesses += 1;
  }
  if (combined.indexOf(" war ") !== -1) score.military_doctrine += 1;
  if (combined.indexOf(" diplomacy ") !== -1) score.diplomatic_posture += 2;
  if (combined.indexOf(" alliance ") !== -1) score.diplomatic_posture += 1;
  if (combined.indexOf(" negotiation ") !== -1) score.diplomatic_posture += 1;
  if (combined.indexOf(" escalation ") !== -1) score.escalation_triggers += 2;
  if (combined.indexOf(" crisis ") !== -1) score.escalation_triggers += 1;
  if (combined.indexOf(" unrest ") !== -1) score.civil_unrest_triggers += 2;
  if (combined.indexOf(" rebellion ") !== -1) score.civil_unrest_triggers += 2;
  if (combined.indexOf(" instability ") !== -1) {
    score.civil_unrest_triggers += 1;
    score.strategic_weaknesses += 1;
  }
  if (combined.indexOf(" strength ") !== -1) score.strategic_strengths += 2;
  if (combined.indexOf(" weakness ") !== -1) score.strategic_weaknesses += 2;

// ===============================
// OUTPUT GENERATION
// ===============================
  var highestScore = 0;
  var topCategories = [];

  for (var sKey in score) {
    if (score[sKey] > highestScore) {
      highestScore = score[sKey];
      topCategories = [sKey]; 
    } else if (score[sKey] === highestScore && highestScore > 0) {
      topCategories.push(sKey); 
    }
  }

  // Fallback if no keywords were found
  if (highestScore === 0) {
    topCategories = ["biology"]; 
    if (speciesBlock["cultural_baseline"]) topCategories.push("cultural_baseline");
  }

  // Build the text block
  var loreOutput = "\n[SYSTEM NOTE: Relevant Lore for " + activeSpecies.toUpperCase() + "]\n";

  for (var j = 0; j < topCategories.length; j++) {
    var cat = topCategories[j];
    var label = cat.replace("_", " ").toUpperCase();
    loreOutput += "- " + label + ": " + speciesBlock[cat] + "\n";
  }

  // Inject into the scenario (Janitor AI style)
  context.character.scenario += loreOutput;
}