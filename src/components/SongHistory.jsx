import React from "react";

export default function SongHistory({ songs }) {
  if (!songs.length) return null;
  return (
    <div style={{ margin: "2rem 0" }}>
      <h3>Bisher gespielte Songs</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {songs.map((song, idx) => (
          <div key={song.id || idx} style={{ border: "1px solid #ccc", borderRadius: 8, padding: 12, minWidth: 120, textAlign: "center", background: "#f9f9f9" }}>
            <img src={song.albumCover} alt="cover" style={{ width: 60, borderRadius: 4, marginBottom: 6 }} />
            <div style={{ fontWeight: "bold" }}>{song.name}</div>
            <div>{song.artists}</div>
            <div style={{ fontSize: 12, color: "#888" }}>{song.releaseYear}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 