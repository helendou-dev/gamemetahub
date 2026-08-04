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
    headerImage: '/images/games/elden-ring-header-v20260803.jpg',
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
    headerImage: '/images/games/baldurs-gate-3-header-v20260803.jpg',
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
    headerImage: '/images/games/rampage-evolution-header-v20260803.jpg',
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
    headerImage: '/images/games/sir-we-have-an-orc-problem-header-v20260803.jpg',
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
    headerImage: '/images/games/beast-of-reincarnation-header-v20260803.jpg',
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
    headerImage: '/images/games/mistfall-hunter-header-v20260803.jpg',
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
    headerImage: '/images/games/league-of-legends-header-v20260803.jpg',
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
    headerImage: '/images/games/black-myth-zhong-kui-header-v20260803.jpg',
    description: "Game Science's next Black Myth title — a dark Chinese mythology ARPG featuring Zhong Kui, the legendary ghost-hunting deity. Announced at Gamescom 2025. Coming to PC, PS5, and Xbox Series X/S.",
    releaseYear: 'TBA',
    developer: 'Game Science',
    publisher: 'Game Science',
    tags: ['Action RPG', 'Chinese Mythology', 'Dark Fantasy', 'Soulslike', 'Single-Player'],
    emoji: '👹',
  },
  'silent-hill-f': {
    name: 'Silent Hill f',
    slug: 'silent-hill-f',
    headerImage: '/images/games/silent-hill-f-header-v20260803.jpg',
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
    headerImage: '/images/games/palworld-header-v20260803.jpg',
    description: "Pocketpair's survival crafting phenomenon — catch, breed, and battle 287 Pals across floating islands and the World Tree. 40 million players. 1.0 full release July 2026.",
    releaseYear: '2026',
    developer: 'Pocketpair',
    publisher: 'Pocketpair',
    tags: ['Survival', 'Crafting', 'Creature Collection', 'Open World', 'Multiplayer'],
    emoji: '🐾',
  },
};

/** Ordered list for homepage "Popular Games" section */
export const POPULAR_GAMES_ORDER: string[] = [
  'elden-ring',
  'baldurs-gate-3',
  'rampage-evolution',
  'sir-we-have-an-orc-problem',
  'beast-of-reincarnation',
  'mistfall-hunter',
  'league-of-legends',
  'black-myth-zhong-kui',
  'silent-hill-f',
  'palworld',
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
