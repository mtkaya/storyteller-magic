import { useState } from "react";

export interface GameState {
  completedStories: string[];
  favoriteStories: string[];
  readingStreak: number;
  lastReadDate: string | null;
  totalStoriesRead: number;
  sleepScore: number;
  childName: string;
  isFirstLaunch: boolean;
}

const DEFAULT: GameState = {
  completedStories: [],
  favoriteStories: [],
  readingStreak: 0,
  lastReadDate: null,
  totalStoriesRead: 0,
  sleepScore: 0,
  childName: '',
  isFirstLaunch: true,
};

const KEY = "storyteller_state";

export function useGameState() {
  const [state, setState] = useState<GameState>(() => {
    try {
      const s = localStorage.getItem(KEY);
      return s ? { ...DEFAULT, ...JSON.parse(s) } : DEFAULT;
    } catch { return DEFAULT; }
  });

  const save = (next: GameState) => {
    setState(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
  };

  const completeStory = (id: string) => {
    const today = new Date().toDateString();
    const isNewDay = state.lastReadDate !== today;
    save({
      ...state,
      completedStories: state.completedStories.includes(id)
        ? state.completedStories : [...state.completedStories, id],
      totalStoriesRead: state.totalStoriesRead + 1,
      sleepScore: state.sleepScore + 50,
      lastReadDate: today,
      readingStreak: isNewDay ? state.readingStreak + 1 : state.readingStreak,
    });
  };

  const toggleFavorite = (id: string) => {
    const isFav = state.favoriteStories.includes(id);
    save({
      ...state,
      favoriteStories: isFav
        ? state.favoriteStories.filter(x => x !== id)
        : [...state.favoriteStories, id],
    });
  };

  const setChildName = (name: string) => {
    save({ ...state, childName: name, isFirstLaunch: false });
  };

  return { state, completeStory, toggleFavorite, setChildName };
}
