import React, { useState } from "react";

export default function TeamGuessPanel({ onSubmit }) {
  const [guesses, setGuesses] = useState({
    team1: { artist: "", song: "" },
    team2: { artist: "", song: "" }
  });

  const handleChange = (team, field, value) => {
    setGuesses(g => ({
      ...g,
      [team]: { ...g[team], [field]: value }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(guesses);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 32, justifyContent: "center", margin: "2rem 0" }}>
      {[1, 2].map(team => (
        <div key={team} style={{ background: "#fff", borderRadius: 10, boxShadow: "0 2px 10px #eee", padding: 20, minWidth: 220 }}>
          <h3>Team {team}</h3>
          <div style={{ marginBottom: 10 }}>
            <label>Künstler:<br />
              <input type="text" value={guesses[`team${team}`].artist} onChange={e => handleChange(`team${team}`, "artist", e.target.value)} required />
            </label>
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>Songtitel:<br />
              <input type="text" value={guesses[`team${team}`].song} onChange={e => handleChange(`team${team}`, "song", e.target.value)} required />
            </label>
          </div>
        </div>
      ))}
      <div style={{ display: "flex", alignItems: "center" }}>
        <button type="submit" style={{ height: 50, fontSize: 18 }}>Tipps abgeben</button>
      </div>
    </form>
  );
} 