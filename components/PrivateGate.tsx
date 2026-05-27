"use client";

import { useEffect, useRef, useState } from "react";
import type { PrivateSlug } from "@/lib/private-access";

type PrivateGateProps = {
  slug: PrivateSlug;
  frameClassName: string;
  gateClassPrefix: string;
  frameTitle: string;
  hint: string;
};

export default function PrivateGate({
  slug,
  frameClassName,
  gateClassPrefix,
  frameTitle,
  hint,
}: PrivateGateProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let active = true;

    fetch(`/api/private/status/${slug}`)
      .then((response) => response.json())
      .then((data: { unlocked?: boolean }) => {
        if (active && data.unlocked) {
          setUnlocked(true);
        }
      })
      .catch(() => undefined);

    return () => {
      active = false;
    };
  }, [slug]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch("/api/private/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, password }),
    });

    if (response.ok) {
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
        src={`/api/private/content/${slug}`}
        className={frameClassName}
        title={frameTitle}
      />
    );
  }

  return (
    <div className={`${gateClassPrefix}${fadeOut ? ` ${gateClassPrefix}--exit` : ""}`}>
      <div className={`${gateClassPrefix}-card`}>
        <div className={`${gateClassPrefix}-label`}>Restricted Access</div>
        <h1 className={`${gateClassPrefix}-title`}>
          Please enter the <em>password.</em>
        </h1>
        <form className={`${gateClassPrefix}-form`} onSubmit={submit}>
          <input
            ref={inputRef}
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={`${gateClassPrefix}-input${error ? ` ${gateClassPrefix}-input--error` : ""}`}
            autoFocus
            autoComplete="off"
            aria-label="Password"
          />
          <div className={`${gateClassPrefix}-error${error ? ` ${gateClassPrefix}-error--show` : ""}`}>
            Incorrect password
          </div>
          <button type="submit" className={`${gateClassPrefix}-button`}>
            Enter
          </button>
        </form>
        <div className={`${gateClassPrefix}-hint`}>{hint}</div>
      </div>
    </div>
  );
}
