import React from "react";

interface SongMeta {
  id: string;
  uri: string;
  name: string;
  artists: string | { name: string }[];
  releaseYear: string;
  albumCover?: string;
  [key: string]: any;
}

interface SongHistoryProps {
  songs: SongMeta[];
}

export default function SongHistory({ songs }: SongHistoryProps) {
  if (!songs.length) return null;
  // Songs nach Erscheinungsjahr sortieren (aufsteigend)
  const sortedSongs = [...songs].sort((a, b) => parseInt(a.releaseYear) - parseInt(b.releaseYear));
  return (
    <div style={{ margin: "2rem 0" }}>
      <h3>Bisher gespielte Songs</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {sortedSongs.map((song, idx) => (
          <div key={song.id || idx} className="text-light" style={{ border: "1px solid #ccc", borderRadius: 8, padding: 12, minWidth: 120, textAlign: "center", background: "var(--card-bg)" }}>
            <img src={song.albumCover} alt="cover" style={{ width: 60, borderRadius: 4, marginBottom: 6 }} />
            <div style={{ fontWeight: "bold" }}>{song.name}</div>
            <div>{typeof song.artists === "string" ? song.artists : song.artists.map(a => a.name).join(", ")}</div>
            <div style={{ fontSize: 12, color: "#888" }}>{song.releaseYear}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 