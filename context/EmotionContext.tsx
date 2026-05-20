"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

export type Emotion =
  | "happy"
  | "calm"
  | "curious"
  | "frustrated"
  | "ready-for-bed"
  | null;

export interface EmotionConfig {
  id: NonNullable<Emotion>;
  label: string;
  color: string;
  loadingMessage: string;
  isDark: boolean;
}

export const EMOTIONS: EmotionConfig[] = [
  {
    id: "happy",
    label: "happy",
    color: "#fde68a",
    loadingMessage: "i'm happy you are here too! 🌻",
    isDark: false,
  },
  {
    id: "calm",
    label: "calm",
    color: "#a7c4a0",
    loadingMessage: "building a zen portfolio...",
    isDark: false,
  },
  {
    id: "curious",
    label: "curious",
    color: "#bad6f0",
    loadingMessage: "you're in the right place! 🔍",
    isDark: false,
  },
  {
    id: "frustrated",
    label: "frustrated",
    color: "#f4a0a0",
    loadingMessage: "sending positive vibes to you... 🤍",
    isDark: false,
  },
  {
    id: "ready-for-bed",
    label: "ready for bed",
    color: "#1a1a1a",
    loadingMessage: "let's switch to dark mode. 🌙",
    isDark: true,
  },
];

interface EmotionContextValue {
  emotion: Emotion;
  emotionConfig: EmotionConfig | null;
  setEmotion: (emotion: Emotion) => void;
  isDark: boolean;
  showPicker: boolean;
  setShowPicker: (show: boolean) => void;
  hasChosen: boolean;
}

const EmotionContext = createContext<EmotionContextValue | null>(null);

const STORAGE_KEY = "museum-of-iris-emotion";
// sessionStorage key — clears on hard reload/new tab, persists during SPA navigation.
// This makes the picker re-appear on every page reload but not on route changes.
const SESSION_KEY = "museum-of-iris-picker-shown";

export function EmotionProvider({ children }: { children: React.ReactNode }) {
  // emotion/hasChosen start null/false on both server and client to avoid
  // hydration mismatches (Nav reads emotionConfig which derives from emotion).
  // They are restored from localStorage in useEffect after hydration.
  const [emotion, setEmotionState] = useState<Emotion>(null);
  const [hasChosen, setHasChosen] = useState(false);

  // showPicker uses lazy init: only affects EmotionPicker (ssr:false), no hydration mismatch.
  // Uses sessionStorage so picker re-appears on hard reload/new tab but not SPA navigation.
  const [showPicker, setShowPicker] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem(SESSION_KEY);
  });

  const applyTheme = useCallback((e: Emotion) => {
    const html = document.documentElement;
    html.removeAttribute("data-emotion");
    html.removeAttribute("data-theme");
    if (!e) return;
    html.setAttribute("data-emotion", e);
    const config = EMOTIONS.find((c) => c.id === e);
    if (config?.isDark) html.setAttribute("data-theme", "dark");
  }, []);

  // Restore emotion from localStorage after hydration (keeps SSR in sync).
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Emotion;
    if (stored && EMOTIONS.find((e) => e.id === stored)) {
      setEmotionState(stored);
      setHasChosen(true);
      applyTheme(stored);
    }
  }, [applyTheme]);

  const setEmotion = useCallback(
    (e: Emotion) => {
      setEmotionState(e);
      setHasChosen(true);
      if (e) {
        localStorage.setItem(STORAGE_KEY, e);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
      applyTheme(e);
    },
    [applyTheme]
  );

  const emotionConfig = emotion
    ? (EMOTIONS.find((e) => e.id === emotion) ?? null)
    : null;

  const isDark = emotionConfig?.isDark ?? false;

  return (
    <EmotionContext.Provider
      value={{
        emotion,
        emotionConfig,
        setEmotion,
        isDark,
        showPicker,
        setShowPicker,
        hasChosen,
      }}
    >
      {children}
    </EmotionContext.Provider>
  );
}

export function useEmotion(): EmotionContextValue {
  const ctx = useContext(EmotionContext);
  if (!ctx) throw new Error("useEmotion must be used within EmotionProvider");
  return ctx;
}
