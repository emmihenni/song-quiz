import React from "react";

export default function SongListe({ songs }) {
  const sortierteSongs = [...songs].sort((a, b) => a.jahr - b.jahr);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1rem" }}>
      {sortierteSongs.map((song, idx) => (
        <div key={idx} style={{ border: "1px solid #ccc", borderRadius: 8, padding: 12, minWidth: 120, textAlign: "center", background: "#f9f9f9" }}>
          <div style={{ fontWeight: "bold" }}>{song.song}</div>
          <div>{song.artist}</div>
          <div style={{ fontSize: 12, color: "#888" }}>{song.jahr}</div>
        </div>
      ))}
    </div>
  );
} 