import React, { useState } from "react";

export default function SongEingabe({ onSongSubmit }) {
  const [song, setSong] = useState("");
  const [artist, setArtist] = useState("");
  const [jahr, setJahr] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (song && artist && jahr) {
      onSongSubmit({ song, artist, jahr: parseInt(jahr) });
      setSong("");
      setArtist("");
      setJahr("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <input
        type="text"
        placeholder="Songname"
        value={song}
        onChange={(e) => setSong(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Artist"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Jahr"
        value={jahr}
        onChange={(e) => setJahr(e.target.value)}
        required
        min="1900"
        max={new Date().getFullYear()}
      />
      <button type="submit">Hinzufügen</button>
    </form>
  );
} 