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

export function EmotionProvider({ children }: { children: React.ReactNode }) {
  const [emotion, setEmotionState] = useState<Emotion>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [hasChosen, setHasChosen] = useState(false);

  // Restore from localStorage on mount and show picker if first visit
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Emotion;
    if (stored && EMOTIONS.find((e) => e.id === stored)) {
      setEmotionState(stored);
      setHasChosen(true);
      applyTheme(stored);
    } else {
      setShowPicker(true);
    }
  }, []);

  const applyTheme = (e: Emotion) => {
    const html = document.documentElement;
    html.removeAttribute("data-emotion");
    html.removeAttribute("data-theme");

    if (!e) return;

    html.setAttribute("data-emotion", e);

    const config = EMOTIONS.find((c) => c.id === e);
    if (config?.isDark) {
      html.setAttribute("data-theme", "dark");
    }
  };

  const setEmotion = useCallback((e: Emotion) => {
    setEmotionState(e);
    setHasChosen(true);

    if (e) {
      localStorage.setItem(STORAGE_KEY, e);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }

    applyTheme(e);
  }, []);

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
