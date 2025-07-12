import React, { useState } from "react";

export default function YearSortPanel({ songHistory, currentSong, onSubmit }) {
  const [answers, setAnswers] = useState({ team1: 0, team2: 0 });

  if (!songHistory.length || !currentSong) return null;

  // Sortiere die History nach Jahr
  const sorted = [...songHistory].sort((a, b) => parseInt(a.releaseYear) - parseInt(b.releaseYear));

  // Erzeuge die Einfüge-Positionen (zwischen jedem Song und an den Enden)
  const positions = [];
  for (let i = 0; i <= sorted.length; i++) {
    let label = "";
    if (i === 0) {
      label = `Vor allen (${sorted[0].name})`;
    } else if (i === sorted.length) {
      label = `Nach allen (${sorted[sorted.length - 1].name})`;
    } else {
      label = `Zwischen (${sorted[i - 1].name}) und (${sorted[i].name})`;
    }
    positions.push({ idx: i, label });
  }

  const handleChange = (team, value) => {
    setAnswers(a => ({ ...a, [team]: parseInt(value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(answers, sorted);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 32, justifyContent: "center", margin: "2rem 0" }}>
      {[1, 2].map(team => (
        <div key={team} style={{ background: "#fff", borderRadius: 10, boxShadow: "0 2px 10px #eee", padding: 20, minWidth: 260 }}>
          <h3>Team {team}</h3>
          <div style={{ marginBottom: 10 }}>
            <div>Wo würdet ihr <b>{currentSong.name}</b> in die bisherige Reihenfolge einsortieren?</div>
            <select value={answers[`team${team}`]} onChange={e => handleChange(`team${team}`, e.target.value)} required style={{ marginTop: 10, width: "100%" }}>
              {positions.map(pos => (
                <option key={pos.idx} value={pos.idx}>{pos.label}</option>
              ))}
            </select>
          </div>
        </div>
      ))}
      <div style={{ display: "flex", alignItems: "center" }}>
        <button type="submit" style={{ height: 50, fontSize: 18 }}>Antworten abgeben</button>
      </div>
    </form>
  );
} 