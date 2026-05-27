"use client";

import { useEffect, useRef, useState } from "react";

const AITHER_PASSWORD = "REDACTED";
const STORAGE_KEY = "aither_unlocked";

export default function AitherGate() {
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

    if (password === AITHER_PASSWORD) {
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
        src="/aither.html"
        className="aither-frame"
        title="Iris Wang — AITHER Application"
      />
    );
  }

  return (
    <div className={`aither-gate${fadeOut ? " aither-gate--exit" : ""}`}>
      <div className="aither-gate-card">
        <div className="aither-gate-label">Restricted Access</div>
        <h1 className="aither-gate-title">
          Please enter the <em>password.</em>
        </h1>
        <form className="aither-gate-form" onSubmit={submit}>
          <input
            ref={inputRef}
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={`aither-gate-input${error ? " aither-gate-input--error" : ""}`}
            autoFocus
            autoComplete="off"
            aria-label="Password"
          />
          <div className={`aither-gate-error${error ? " aither-gate-error--show" : ""}`}>
            Incorrect password
          </div>
          <button type="submit" className="aither-gate-button">
            Enter
          </button>
        </form>
        <div className="aither-gate-hint">For AITHER review — Iris Wang · 2026</div>
      </div>
    </div>
  );
}
