"use client";

import { useEffect, useRef, useState } from "react";

const NYTIMES_PASSWORD = "REDACTED";
const STORAGE_KEY = "nytimes_unlocked";

export default function NytimesGate() {
  const [unlocked, setUnlocked] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") {
      setUnlocked(true);
    }
  }, []);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    if (password === NYTIMES_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setFadeOut(true);
      window.setTimeout(() => setUnlocked(true), 420);
      return;
    }

    setError(true);
    setPassword("");
    inputRef.current?.focus();
    window.setTimeout(() => setError(false), 600);
  };

  if (unlocked) {
    return (
      <iframe
        src="/nytimes.html"
        className="nytimes-frame"
        title="Iris Wang — New York Times Advertising"
      />
    );
  }

  return (
    <div className={`nytimes-gate${fadeOut ? " nytimes-gate--exit" : ""}`}>
      <div className="nytimes-gate-card">
        <div className="nytimes-gate-label">Restricted Access</div>
        <h1 className="nytimes-gate-title">
          Please enter the <em>password.</em>
        </h1>
        <form className="nytimes-gate-form" onSubmit={submit}>
          <input
            ref={inputRef}
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={`nytimes-gate-input${error ? " nytimes-gate-input--error" : ""}`}
            autoFocus
            autoComplete="off"
            aria-label="Password"
          />
          <div className={`nytimes-gate-error${error ? " nytimes-gate-error--show" : ""}`}>
            Incorrect password
          </div>
          <button type="submit" className="nytimes-gate-button">
            Enter
          </button>
        </form>
        <div className="nytimes-gate-hint">For NYT Advertising review — Iris Wang · 2026</div>
      </div>
    </div>
  );
}
