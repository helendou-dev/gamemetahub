// ============================================
// game-data.ts — Centralized Game Metadata
// Single source of truth for all game info.
// Update here → all pages sync automatically.
// ============================================

export interface GameMeta {
  name: string;
  slug: string;
  headerImage: string;
  description: string;
  releaseYear: string;
  developer: string;
  publisher: string;
  tags: string[];
  emoji?: string; // for Popular Games etc.
}

export const ALL_GAMES: Record<string, GameMeta> = {
  'elden-ring': {
    name: 'Elden Ring',
    slug: 'elden-ring',
    headerImage: '/images/games/elden-ring-header-v20260806.jpg',
    description: "FromSoftware's masterpiece — an open-world action RPG set in the Lands Between. Explore a vast dark fantasy world, face demigods, and become the Elden Lord.",
    releaseYear: '2022',
    developer: 'FromSoftware',
    publisher: 'Bandai Namco',
    tags: ['Action RPG', 'Open World', 'Soulslike', 'Dark Fantasy'],
    emoji: '⚔️',
  },
  'baldurs-gate-3': {
    name: "Baldur's Gate 3",
    slug: 'baldurs-gate-3',
    headerImage: '/images/games/baldurs-gate-3-header-v20260806.jpg',
    description: "Larian Studios' award-winning CRPG set in the Dungeons & Dragons universe. Experience deep storytelling, tactical turn-based combat, and unprecedented player freedom.",
    releaseYear: '2023',
    developer: 'Larian Studios',
    publisher: 'Larian Studios',
    tags: ['CRPG', 'Turn-Based', 'D&D', 'Fantasy', 'Story-Rich'],
    emoji: '🎲',
  },
  'rampage-evolution': {
    name: 'Rampage Evolution',
    slug: 'rampage-evolution',
    headerImage: '/images/games/rampage-evolution-header-v20260806.jpg',
    description: "Tencent's massive 2026 summer hit — open-world survival PVP with mutation-based evolution, territory control, and base building. 40 million pre-registrations worldwide.",
    releaseYear: '2026',
    developer: 'Tencent',
    publisher: 'Tencent',
    tags: ['Survival', 'Open World', 'Evolution', 'PVP', 'Multiplayer'],
    emoji: '🦖',
  },
  'sir-we-have-an-orc-problem': {
    name: 'Sir, We Have an Orc Problem',
    slug: 'sir-we-have-an-orc-problem',
    headerImage: '/images/games/sir-we-have-an-orc-problem-header-v20260806.jpg',
    description: 'A progressive tower defense roguelite from Mumpitz Games. Defend against 100,000+ physics-driven orcs with turrets, lasers, and nukes in a satisfying fail-forward loop.',
    releaseYear: '2026',
    developer: 'Mumpitz Games',
    publisher: 'Mumpitz Games',
    tags: ['Tower Defense', 'Roguelite', 'Indie', 'Strategy', 'Incremental'],
    emoji: '🧌',
  },
  'beast-of-reincarnation': {
    name: 'Beast of Reincarnation',
    slug: 'beast-of-reincarnation',
    headerImage: '/images/games/beast-of-reincarnation-header-v20260806.jpg',
    description: "Game Freak's dark action RPG set in post-apocalyptic Japan. Fight alongside your dog Koo in a hybrid real-time and tactical combat system. Day one on Game Pass.",
    releaseYear: '2026',
    developer: 'Game Freak',
    publisher: 'Fictions',
    tags: ['Action RPG', 'Post-Apocalyptic', 'Single-Player', 'Soulslike', 'Story-Rich'],
    emoji: '🐺',
  },
  'mistfall-hunter': {
    name: 'Mistfall Hunter',
    slug: 'mistfall-hunter',
    headerImage: '/images/games/mistfall-hunter-header-v20260806.jpg',
    description: 'Bellring Games\' dark fantasy PvPvE extraction RPG. Six classes, lethal death penalty, crossplay on PC, PS5, and Xbox. Day one on Game Pass.',
    releaseYear: '2026',
    developer: 'Bellring Games',
    publisher: 'Skystone Games',
    tags: ['Extraction RPG', 'PvPvE', 'Dark Fantasy', 'Multiplayer', 'Soulslike'],
    emoji: '🌫️',
  },
  'league-of-legends': {
    name: 'League of Legends',
    slug: 'league-of-legends',
    headerImage: '/images/games/league-of-legends-header-v20260806.jpg',
    description: "Riot Games' genre-defining MOBA. Five-on-five team fights, ever-evolving champions, and a ranked ladder that has defined competitive PC gaming for over 15 years.",
    releaseYear: '2009',
    developer: 'Riot Games',
    publisher: 'Riot Games',
    tags: ['MOBA', 'Competitive', 'Multiplayer', 'Strategy', 'Esports'],
    emoji: '🏆',
  },
  'black-myth-zhong-kui': {
    name: 'Black Myth: Zhong Kui',
    slug: 'black-myth-zhong-kui',
    headerImage: '/images/games/black-myth-zhong-kui-header-v20260806.jpg',
    description: "Game Science's next Black Myth title — a dark Chinese mythology ARPG featuring Zhong Kui, the legendary ghost-hunting deity. Announced at Gamescom 2025. Coming to PC, PS5, and Xbox Series X/S.",
    releaseYear: 'TBA',
    developer: 'Game Science',
    publisher: 'Game Science',
    tags: ['Action RPG', 'Chinese Mythology', 'Dark Fantasy', 'Soulslike', 'Single-Player'],
    emoji: '👹',
  },
  'black-myth-wukong': {
    name: 'Black Myth: Wukong',
    slug: 'black-myth-wukong',
    headerImage: '/images/games/black-myth-wukong-header-v20260806.jpg',
    description: "Game Science's landmark Chinese mythology action RPG. Play as the Destined One in a breathtaking journey inspired by Journey to the West. 2024 TGA Best Action Game winner, 25+ million copies sold, the game that put Chinese AAA on the global map.",
    releaseYear: '2024',
    developer: 'Game Science',
    publisher: 'Game Science',
    tags: ['Action RPG', 'Chinese Mythology', 'Soulslike', 'Single-Player', 'Boss Rush'],
    emoji: '🐒',
  },
  'monster-hunter-wilds': {
    name: 'Monster Hunter Wilds',
    slug: 'monster-hunter-wilds',
    headerImage: '/images/games/monster-hunter-wilds-header-v20260806.jpg',
    description: "Capcom's flagship hunting action RPG — explore dynamic ecosystems, hunt massive monsters solo or in co-op, and craft powerful gear. The next evolution of the Monster Hunter series, with cross-platform play on PC, PS5, and Xbox.",
    releaseYear: '2025',
    developer: 'Capcom',
    publisher: 'Capcom',
    tags: ['Action RPG', 'Co-op', 'Hunting', 'Open World', 'Multiplayer'],
    emoji: '🐉',
  },
  'silent-hill-f': {
    name: 'Silent Hill f',
    slug: 'silent-hill-f',
    headerImage: '/images/games/silent-hill-f-header-v20260806.jpg',
    description: "Konami's haunting return to Silent Hill — a psychological horror masterpiece set in 1960s Japan. Play as Hinako Shimizu in the fog-shrouded town of Ebisugaoka. Five endings, deep NG+ system, and one of 2025's most acclaimed horror games.",
    releaseYear: '2025',
    developer: 'Konami',
    publisher: 'Konami',
    tags: ['Survival Horror', 'Psychological Horror', 'Single-Player', 'Story-Rich', 'Japanese Horror'],
    emoji: '🌸',
  },
  'palworld': {
    name: 'Palworld',
    slug: 'palworld',
    headerImage: '/images/games/palworld-header-v20260806.jpg',
    description: "Pocketpair's survival crafting phenomenon — catch, breed, and battle 287 Pals across floating islands and the World Tree. 40 million players. 1.0 full release July 2026.",
    releaseYear: '2026',
    developer: 'Pocketpair',
    publisher: 'Pocketpair',
    tags: ['Survival', 'Crafting', 'Creature Collection', 'Open World', 'Multiplayer'],
    emoji: '🐾',
  },
  'project-zomboid': {
    name: 'Project Zomboid',
    slug: 'project-zomboid',
    headerImage: '/images/games/project-zomboid-header-v20260806.jpg',
    description: "The Indie Stone's hardcore open-world zombie survival sandbox. Loot, craft, build, farm, and fight to survive in a relentless post-apocalyptic Kentucky. 13 years in Early Access, Build 42 stable release July 2026.",
    releaseYear: '2013',
    developer: 'The Indie Stone',
    publisher: 'The Indie Stone',
    tags: ['Survival', 'Zombies', 'Open World', 'Sandbox', 'Multiplayer'],
    emoji: '🧟',
  },
  'fortnite': {
    name: 'Fortnite',
    slug: 'fortnite',
    headerImage: '/images/games/fortnite-header-v20260806.jpg',
    description: "Epic Games' genre-defining battle royale. Drop onto an ever-evolving island, build, battle, and adapt through seasonal events, massive crossovers, and zero-build modes that keep the meta fresh.",
    releaseYear: '2017',
    developer: 'Epic Games',
    publisher: 'Epic Games',
    tags: ['Battle Royale', 'Shooter', 'Multiplayer', 'Building', 'Cross-Platform'],
    emoji: '🏝️',
  },
  'marvel-tokon': {
    name: 'Marvel Tōkon: Fighting Souls',
    slug: 'marvel-tokon',
    headerImage: '/images/games/marvel-tokon-header-v20260807.jpg',
    description: "Arc System Works' 4v4 Marvel tag fighter featuring 20 launch characters across five teams. Shared health bar, progressive character unlocks, and the deepest assist system in the genre. Day one on PC, PS5, and PS4.",
    releaseYear: '2026',
    developer: 'Arc System Works',
    publisher: 'PlayStation Publishing / Marvel Games',
    tags: ['Fighting', 'Tag Fighter', '4v4', 'Superhero', 'Competitive'],
    emoji: '💥',
  },
  'apex-legends': {
    name: 'Apex Legends',
    slug: 'apex-legends',
    headerImage: '/images/games/apex-legends-header-v20260807b.jpg',
    description: "Respawn's genre-leading hero battle royale — 28 Legends, seasonal meta shifts, and the best gunplay in the genre. Season 30 Marked brings Bloodhound's Allfather's Cloak and the biggest systemic overhaul in years.",
    releaseYear: '2019',
    developer: 'Respawn Entertainment',
    publisher: 'Electronic Arts',
    tags: ['Battle Royale', 'Shooter', 'Hero Shooter', 'Multiplayer', 'Competitive'],
    emoji: '🎯',
  },
  'big-walk': {
    name: 'Big Walk',
    slug: 'big-walk',
    headerImage: '/images/games/big-walk-header-v20260806.jpg',
    description: "House House's 92-rated co-op adventure where communication is the real mechanic. Explore a vast Australian island with up to 12 friends, solve proximity-voice puzzles, and discover why walking and talking together is 2026's most talked-about gaming experience.",
    releaseYear: '2026',
    developer: 'House House',
    publisher: 'Panic',
    tags: ['Co-op', 'Puzzle', 'Adventure', 'Exploration', 'Cross-Platform'],
    emoji: '🚶',
  },
  'phantom-blade-zero': {
    name: 'Phantom Blade Zero',
    slug: 'phantom-blade-zero',
    headerImage: '/images/games/phantom-blade-zero-header-v20260807b.jpg',
    description: "S-GAME's Kungfupunk action RPG — play as Soul, an elite assassin with 66 days to live, in a dark wuxia world blending martial arts and steampunk. 30+ weapons, 8 endings, combat inspired by Hong Kong action cinema. Launching October 29, 2026 on PS5 and PC.",
    releaseYear: '2026',
    developer: 'S-GAME',
    publisher: 'S-GAME',
    tags: ['Action RPG', 'Wuxia', 'Kungfupunk', 'Martial Arts', 'Single-Player'],
    emoji: '🗡️',
  },
  'marvel-snap': {
    name: 'Marvel Snap',
    slug: 'marvel-snap',
    headerImage: '/images/games/marvel-snap-header-v20260809.jpg',
    description: "Second Dinner's strategic Marvel collectible card game — six-turn Three Locations battles featuring hundreds of heroes and villains. Free-to-play on iOS, Android, and Steam with cross-progression. The August 9 patch refunds Nexus Event tickets and rebalances nine cards including Hellcow and Jane Foster.",
    releaseYear: '2022',
    developer: 'Second Dinner',
    publisher: 'Skystone Games',
    tags: ['CCG', 'Card Game', 'Marvel', 'Free-to-Play', 'Cross-Platform'],
    emoji: '🃏',
  },
  'grain-rot': {
    name: 'GRAIN ROT',
    slug: 'grain-rot',
    headerImage: '/images/games/grain-rot-header-v20260810.jpg',
    description: "Beck & Branch Games' viral co-op extraction horror — control fragile wooden vessels inhabited by Living Sparks, descend into shifting burned ruins, steal furniture, and rebuild your Sanctuary Outpost. 350,000+ demo downloads and a Top 15 Steam Next Fest demo.",
    releaseYear: '2026',
    developer: 'Beck & Branch Games',
    publisher: 'Neem Interactive',
    tags: ['Co-op', 'Extraction Horror', 'Roguelike', 'Base Building', 'Indie'],
    emoji: '🔥',
  },
  'mortal-shell-2': {
    name: 'Mortal Shell II',
    slug: 'mortal-shell-2',
    headerImage: '/images/games/mortal-shell-2-header-v20260810.jpg',
    description: "Cold Symmetry's standalone sequel to the 2020 dark fantasy soulslike. Stamina bar removed, 8 playable Shells, 60+ dungeons in a compact open world. Launching August 20, 2026 on PC, PS5, and Xbox Series X/S.",
    releaseYear: '2026',
    developer: 'Cold Symmetry',
    publisher: 'Playstack',
    tags: ['Action RPG', 'Soulslike', 'Dark Fantasy', 'Single-Player', 'Open World'],
    emoji: '💀',
  },
  'world-of-warcraft': {
    name: 'World of Warcraft',
    slug: 'world-of-warcraft',
    headerImage: '/images/games/world-of-warcraft-header-v20260811.jpg',
    description: "Blizzard Entertainment's legendary MMORPG. The Midnight expansion continues with Patch 12.1: Curse of Ula'tek — explore the Coiled Isle, conquer the Venomous Abyss raid, and master the overhauled class meta.",
    releaseYear: '2004',
    developer: 'Blizzard Entertainment',
    publisher: 'Blizzard Entertainment',
    tags: ['MMORPG', 'Fantasy', 'Multiplayer', 'Open World', 'PvE', 'PvP'],
    emoji: '🐉',
  },
};

/** Ordered list for homepage "Popular Games" section */
export const POPULAR_GAMES_ORDER: string[] = [
  'world-of-warcraft',
  'mortal-shell-2',
  'grain-rot',
  'marvel-snap',
  'phantom-blade-zero',
  'marvel-tokon',
  'apex-legends',
  'big-walk',
  'black-myth-wukong',
  'elden-ring',
  'baldurs-gate-3',
  'project-zomboid',
  'rampage-evolution',
  'sir-we-have-an-orc-problem',
  'beast-of-reincarnation',
  'mistfall-hunter',
  'league-of-legends',
  'black-myth-zhong-kui',
  'monster-hunter-wilds',
  'silent-hill-f',
  'palworld',
  'fortnite',
];

/** Lightweight view for pages that only need name + image */
export interface GameCard {
  slug: string;
  name: string;
  image: string;
  emoji?: string;
}

export function getGameCard(slug: string): GameCard | undefined {
  const g = ALL_GAMES[slug];
  if (!g) return undefined;
  return { slug: g.slug, name: g.name, image: g.headerImage, emoji: g.emoji };
}

export function getPopularGames(): GameCard[] {
  return POPULAR_GAMES_ORDER.map((slug) => getGameCard(slug)!).filter(Boolean);
}
