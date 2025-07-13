import React, { useState } from "react";

interface TeamGuess {
  artist: string;
  song: string;
}

interface Guesses {
  team1: TeamGuess;
  team2: TeamGuess;
}

interface TeamGuessPanelProps {
  onSubmit: (guesses: Guesses) => void;
}

export default function TeamGuessPanel({ onSubmit }: TeamGuessPanelProps) {
  const [guesses, setGuesses] = useState<Guesses>({
    team1: { artist: "", song: "" },
    team2: { artist: "", song: "" }
  });

  const handleChange = (team: keyof Guesses, field: keyof TeamGuess, value: string) => {
    setGuesses(g => ({
      ...g,
      [team]: { ...g[team], [field]: value }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(guesses);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="team-guess-form"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        justifyContent: "center",
        margin: "2rem 0"
      }}
    >
      {[1, 2].map(team => (
        <div
          key={team}
          style={{
            background: "#fff",
            borderRadius: 10,
            boxShadow: "0 2px 10px #eee",
            padding: 20,
            minWidth: 0,
            width: "100%",
            boxSizing: "border-box"
          }}
        >
          <h3>Team {team}</h3>
          <div style={{ marginBottom: 10 }}>
            <label>Künstler:<br />
              <input type="text" value={guesses[`team${team}` as keyof Guesses].artist} onChange={e => handleChange(`team${team}` as keyof Guesses, "artist", e.target.value)} required />
            </label>
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>Songtitel:<br />
              <input type="text" value={guesses[`team${team}` as keyof Guesses].song} onChange={e => handleChange(`team${team}` as keyof Guesses, "song", e.target.value)} required />
            </label>
          </div>
        </div>
      ))}
      <div style={{ display: "flex", alignItems: "center", marginTop: 12 }}>
        <button type="submit" style={{ width: "100%", height: 50, fontSize: 18 }}>Tipps abgeben</button>
      </div>
    </form>
  );
} 