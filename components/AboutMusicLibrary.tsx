"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MusicSuggestionModal from "@/components/MusicSuggestionModal";
import {
  findTrackById,
  isGenreTrack,
  isMusicGenreFilter,
  MUSIC_FILTERS,
  MUSIC_GENRE_COLORS,
  musicGenreDisplay,
  musicStackLabel,
  ON_REPEAT_TRACKS,
  trackAccent,
  trackCountsByFilter,
  trackExhibitNumber,
  tracksForFilter,
  type MusicFilter,
  type MusicGenre,
  type MusicTrack,
} from "@/lib/music-data";

function GenrePill({ genre }: { genre: MusicGenre }) {
  const colors = MUSIC_GENRE_COLORS[genre];
  return (
    <span
      className="about-music-genre-pill"
      style={
        {
          "--genre-accent": colors.accent,
          "--genre-soft": colors.soft,
        } as React.CSSProperties
      }
    >
      {musicGenreDisplay(genre)}
    </span>
  );
}

function VinylDisc({ track, isPlaying }: { track: MusicTrack; isPlaying: boolean }) {
  const colors = trackAccent(track);

  return (
    <div
      className="about-music-vinyl-wrap"
      style={
        {
          "--label-accent": colors.accent,
          "--label-glow": colors.glow,
        } as React.CSSProperties
      }
    >
      <div
        className={`about-music-vinyl${isPlaying ? " about-music-vinyl--spinning" : ""}`}
        aria-hidden="true"
      >
        {[110, 90, 70].map((diameter) => (
          <div
            key={diameter}
            className="about-music-vinyl-groove"
            style={{
              width: diameter,
              height: diameter,
              marginTop: -diameter / 2,
              marginLeft: -diameter / 2,
            }}
          />
        ))}

        <div className="about-music-vinyl-label-slot">
          <AnimatePresence mode="wait">
            <motion.div
              key={track.id}
              className="about-music-vinyl-label"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            />
          </AnimatePresence>
        </div>

        <div className="about-music-vinyl-spindle" />
      </div>

      <svg className="about-music-tonearm" viewBox="0 0 80 120" fill="none" aria-hidden="true">
        <circle cx="64" cy="12" r="5" fill="#CCCCCC" />
        <line x1="64" y1="12" x2="28" y2="90" stroke="#BBBBBB" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="22" y="88" width="10" height="5" rx="1" fill="#BBBBBB" />
      </svg>
    </div>
  );
}

function TrackRow({
  track,
  isActive,
  index,
  onSelect,
}: {
  track: MusicTrack;
  isActive: boolean;
  index: number;
  onSelect: () => void;
}) {
  const colors = trackAccent(track);
  const isGenre = isGenreTrack(track);

  return (
    <button
      type="button"
      className={`about-music-track${isActive ? " about-music-track--active" : ""}${isGenre ? " about-music-track--genre" : " about-music-track--repeat"}`}
      data-genre={isGenre ? track.genre : undefined}
      aria-current={isActive ? "true" : undefined}
      aria-label={`Play ${track.track} by ${track.artist}`}
      style={
        {
          "--genre-accent": colors.accent,
          "--genre-soft": colors.soft,
        } as React.CSSProperties
      }
      onClick={onSelect}
    >
      <span className="about-music-track-index">{String(index + 1).padStart(2, "0")}</span>
      <span className="about-music-track-copy">
        <span className="about-music-track-title">{track.track}</span>
        <span className="about-music-track-artist">{track.artist}</span>
      </span>
    </button>
  );
}

function AddTrackCard({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="about-music-track about-music-track--add"
      aria-label="Suggest a song"
      onClick={onClick}
    >
      <span className="about-music-track-index" aria-hidden="true">
        +
      </span>
      <span className="about-music-track-copy">
        <span className="about-music-track-title">Suggest a song</span>
        <span className="about-music-track-artist">Send me a rec</span>
      </span>
    </button>
  );
}

export default function AboutMusicLibrary() {
  const [activeFilter, setActiveFilter] = useState<MusicFilter>("on-repeat");
  const [activeTrackId, setActiveTrackId] = useState(ON_REPEAT_TRACKS[0]?.id ?? "");
  const [isPlaying, setIsPlaying] = useState(true);
  const [suggestOpen, setSuggestOpen] = useState(false);

  const filteredTracks = useMemo(() => tracksForFilter(activeFilter), [activeFilter]);
  const counts = useMemo(() => trackCountsByFilter(), []);

  useEffect(() => {
    if (!filteredTracks.some((track) => track.id === activeTrackId)) {
      setActiveTrackId(filteredTracks[0]?.id ?? "");
    }
  }, [activeFilter, filteredTracks, activeTrackId]);

  const activeTrack = findTrackById(activeTrackId) ?? filteredTracks[0];
  const stackLabel = musicStackLabel(activeFilter);

  if (!activeTrack) {
    return (
      <div className="about-music">
        <p className="about-music-empty">Nothing in this stack yet.</p>
      </div>
    );
  }

  return (
    <>
      <div className="about-music">
        <div className="about-library-filters" role="tablist" aria-label="Filter tracks">
          {MUSIC_FILTERS.map(({ id, label, emoji }) => {
            const isActive = activeFilter === id;
            const genreColors = isMusicGenreFilter(id) ? MUSIC_GENRE_COLORS[id] : null;

            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`about-library-filter about-music-filter${isActive ? " about-library-filter--active" : ""}`}
                data-genre={isMusicGenreFilter(id) ? id : undefined}
                style={
                  genreColors
                    ? ({
                        "--genre-accent": genreColors.accent,
                        "--genre-soft": genreColors.soft,
                      } as React.CSSProperties)
                    : undefined
                }
                onClick={() => setActiveFilter(id)}
              >
                {emoji ? (
                  <span className="about-library-filter-emoji" aria-hidden="true">
                    {emoji}
                  </span>
                ) : null}
                {label}
                <span className="about-library-filter-count">{counts[id]}</span>
              </button>
            );
          })}
        </div>

        <div className="about-music-hero">
          <div className="about-music-deck">
            <div className="about-music-deck-status">
              <span className="about-music-deck-label">currently spinning</span>
              <button
                type="button"
                className={`about-music-play-toggle${isPlaying ? " about-music-play-toggle--live" : ""}`}
                aria-label={isPlaying ? "Pause turntable" : "Spin turntable"}
                aria-pressed={isPlaying}
                onClick={() => setIsPlaying((playing) => !playing)}
              >
                <span className="about-music-play-dot" aria-hidden="true" />
              </button>
            </div>

            <VinylDisc track={activeTrack} isPlaying={isPlaying} />
          </div>

          <div className="about-music-placard" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTrack.id}
                className="about-music-placard-inner"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              >
                <p className="about-music-placard-eyebrow">Exhibit {trackExhibitNumber(activeTrack)}</p>
                {isGenreTrack(activeTrack) ? (
                  <GenrePill genre={activeTrack.genre} />
                ) : (
                  <span className="about-music-repeat-pill">On repeat now</span>
                )}
                <h3 className="about-music-placard-title">{activeTrack.track}</h3>
                <p className="about-music-placard-artist">{activeTrack.artist}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="about-music-stack">
          <div className="about-music-stack-header">
            <h3 className="about-music-stack-label">{stackLabel}</h3>
            <span className="about-music-stack-count">{filteredTracks.length}</span>
          </div>

          <div className="about-music-stack-list" role="list">
            {filteredTracks.map((track, index) => (
              <TrackRow
                key={track.id}
                track={track}
                index={index}
                isActive={track.id === activeTrackId}
                onSelect={() => {
                  setActiveTrackId(track.id);
                  setIsPlaying(true);
                }}
              />
            ))}
            <AddTrackCard onClick={() => setSuggestOpen(true)} />
          </div>
        </div>
      </div>

      <MusicSuggestionModal isOpen={suggestOpen} onClose={() => setSuggestOpen(false)} />
    </>
  );
}
