export type MusicGenre = "world" | "texas-made" | "late-night" | "sunny-days";

export type MusicFilter = "on-repeat" | MusicGenre;

export interface OnRepeatTrack {
  id: string;
  artist: string;
  track: string;
  labelColor: string;
}

export interface GenreTrack {
  id: string;
  artist: string;
  track: string;
  genre: MusicGenre;
}

export type MusicTrack = OnRepeatTrack | GenreTrack;

export const MUSIC_GENRE_ORDER: MusicGenre[] = [
  "world",
  "texas-made",
  "late-night",
  "sunny-days",
];

export const MUSIC_GENRE_COLORS: Record<
  MusicGenre,
  { accent: string; soft: string; glow: string }
> = {
  world: {
    accent: "#7DD3FC",
    soft: "rgba(125, 211, 252, 0.12)",
    glow: "rgba(125, 211, 252, 0.28)",
  },
  "texas-made": {
    accent: "#E0C79A",
    soft: "rgba(224, 199, 154, 0.14)",
    glow: "rgba(224, 199, 154, 0.24)",
  },
  "late-night": {
    accent: "#A78BFA",
    soft: "rgba(167, 139, 250, 0.12)",
    glow: "rgba(167, 139, 250, 0.28)",
  },
  "sunny-days": {
    accent: "#F0ABFC",
    soft: "rgba(240, 171, 252, 0.12)",
    glow: "rgba(240, 171, 252, 0.24)",
  },
};

export const MUSIC_FILTERS: { id: MusicFilter; label: string; emoji?: string }[] = [
  { id: "on-repeat", label: "On repeat now" },
  { id: "world", label: "World", emoji: "🌍" },
  { id: "texas-made", label: "Texas-made" },
  { id: "late-night", label: "Late night" },
  { id: "sunny-days", label: "Sunny days" },
];

export const MUSIC_GENRE_LABELS: Record<MusicGenre, string> = {
  world: "World",
  "texas-made": "Texas-made",
  "late-night": "Late night",
  "sunny-days": "Sunny days",
};

/** Original rotation — separate from genre shelves */
export const ON_REPEAT_TRACKS: OnRepeatTrack[] = [
  { id: "baby-steps", artist: "Olivia Dean", track: "Baby Steps", labelColor: "#C8B8B4" },
  { id: "human-nature", artist: "Michael Jackson", track: "Human Nature", labelColor: "#6B8E6B" },
  { id: "new-york", artist: "Rüfüs Du Sol", track: "New York", labelColor: "#4A6B8A" },
  { id: "no-ordinary-love", artist: "Sade", track: "No Ordinary Love", labelColor: "#C4A882" },
  { id: "favorite-girl", artist: "Justin Bieber", track: "Favorite Girl", labelColor: "#B8A8C8" },
  { id: "free-your-mind", artist: "Prospa", track: "Free Your Mind", labelColor: "#7DD3FC" },
];

/** Genre shelves — no overlap with on-repeat */
export const GENRE_TRACKS: GenreTrack[] = [
  { id: "sudden-shower", artist: "ECLIPSE", track: "Sudden Shower", genre: "world" },
  { id: "starlight", artist: "CHANNI", track: "Starlight", genre: "world" },
  { id: "love", artist: "Wave to Earth", track: "love.", genre: "world" },
  { id: "only", artist: "LeeHi", track: "Only", genre: "world" },
  { id: "move", artist: "TAEMIN", track: "MOVE", genre: "world" },
  { id: "couldve-been-her", artist: "Ella Langley", track: "Could've Been Her", genre: "texas-made" },
  { id: "am-i-okay", artist: "Megan Moroney", track: "Am I Okay?", genre: "texas-made" },
  { id: "werent-for-the-wind", artist: "Ella Langley", track: "Weren't for the Wind", genre: "texas-made" },
  { id: "thought-it-was-love", artist: "Ty Myers", track: "Thought It Was Love", genre: "texas-made" },
  { id: "be-her", artist: "Ella Langley", track: "Be Her", genre: "texas-made" },
  { id: "kiss-of-life", artist: "Sade", track: "Kiss of Life", genre: "late-night" },
  { id: "by-your-side", artist: "Sade", track: "By Your Side", genre: "late-night" },
  { id: "eternal-flame", artist: "Mariah the Scientist", track: "Eternal Flame", genre: "late-night" },
  { id: "into-you", artist: "Ariana Grande", track: "Into You", genre: "late-night" },
  { id: "shut-it-down", artist: "Drake", track: "Shut It Down", genre: "late-night" },
  { id: "nice-to-each-other", artist: "Olivia Dean", track: "Nice to Each Other", genre: "sunny-days" },
  { id: "talk-to-you", artist: "ANOTR", track: "Talk to You", genre: "sunny-days" },
  { id: "gravity", artist: "John Mayer", track: "Gravity", genre: "sunny-days" },
  { id: "iris", artist: "Goo Goo Dolls", track: "Iris", genre: "sunny-days" },
  { id: "runaway-love", artist: "Justin Bieber", track: "Runaway Love", genre: "sunny-days" },
];

export const MUSIC_SUGGESTION_EMAIL = "iriswang32@gmail.com";

export const MUSIC_SUGGESTION_COPY = {
  title: "Send a song my way",
  lede: "If it changed how you see something — I want to hear it.",
  placeholder: "Track + artist",
};

export function isGenreTrack(track: MusicTrack): track is GenreTrack {
  return "genre" in track;
}

export function trackAccent(track: MusicTrack): { accent: string; soft: string; glow: string } {
  if (isGenreTrack(track)) return MUSIC_GENRE_COLORS[track.genre];
  return {
    accent: track.labelColor,
    soft: `${track.labelColor}1F`,
    glow: `${track.labelColor}47`,
  };
}

export function musicGenreDisplay(genre: MusicGenre): string {
  if (genre === "world") return "🌍 World";
  return MUSIC_GENRE_LABELS[genre];
}

export function musicStackLabel(filter: MusicFilter): string {
  if (filter === "on-repeat") return "On repeat now";
  const match = MUSIC_FILTERS.find(({ id }) => id === filter);
  if (match?.emoji) return `${match.emoji} ${match.label}`;
  return match?.label ?? "On the turntable";
}

export function isMusicGenreFilter(filter: MusicFilter): filter is MusicGenre {
  return filter !== "on-repeat";
}

export function tracksForFilter(filter: MusicFilter): MusicTrack[] {
  if (filter === "on-repeat") return ON_REPEAT_TRACKS;
  return GENRE_TRACKS.filter((track) => track.genre === filter);
}

export function findTrackById(id: string): MusicTrack | undefined {
  return ON_REPEAT_TRACKS.find((track) => track.id === id) ?? GENRE_TRACKS.find((track) => track.id === id);
}

export function trackCountsByFilter(): Record<MusicFilter, number> {
  return {
    "on-repeat": ON_REPEAT_TRACKS.length,
    world: GENRE_TRACKS.filter((t) => t.genre === "world").length,
    "texas-made": GENRE_TRACKS.filter((t) => t.genre === "texas-made").length,
    "late-night": GENRE_TRACKS.filter((t) => t.genre === "late-night").length,
    "sunny-days": GENRE_TRACKS.filter((t) => t.genre === "sunny-days").length,
  };
}

export function trackExhibitNumber(track: MusicTrack): string {
  const pool = isGenreTrack(track) ? GENRE_TRACKS : ON_REPEAT_TRACKS;
  const index = pool.findIndex((item) => item.id === track.id);
  return String(index + 1).padStart(2, "0");
}
