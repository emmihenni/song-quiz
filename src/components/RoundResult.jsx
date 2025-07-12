import React from "react";

function normalize(str) {
  return (str || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

export default function RoundResult({ songMeta, guesses, onNextRound, punkte, setPunkte }) {
  if (!songMeta || !guesses) return null;

  // Vergleich
  const results = [1, 2].map(team => {
    const guess = guesses[`team${team}`];
    const artistCorrect = guess.artist && (normalize(songMeta.artists).includes(normalize(guess.artist)) || normalize(guess.artist).includes(normalize(songMeta.artists)));
    const songCorrect = guess.song && (normalize(songMeta.name).includes(normalize(guess.song)) || normalize(guess.song).includes(normalize(songMeta.name)));
    const points = (artistCorrect ? 1 : 0) + (songCorrect ? 1 : 0);
    return { artistCorrect, songCorrect, points, guess };
  });

  // Punkte aktualisieren
  React.useEffect(() => {
    if (punkte && setPunkte) {
      setPunkte([
        punkte[0] + results[0].points,
        punkte[1] + results[1].points
      ]);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ margin: "2rem 0", background: "#f1f1f1", borderRadius: 8, padding: 24 }}>
      <h2>Runden-Ergebnis</h2>
      <div style={{ display: "flex", gap: 32, justifyContent: "center" }}>
        <div>
          <b>Richtige Lösung:</b>
          <div><img src={songMeta.albumCover} alt="Cover" style={{ width: 80, borderRadius: 6, margin: "8px 0" }} /></div>
          <div><b>{songMeta.artists}</b> – <b>{songMeta.name}</b></div>
        </div>
        {[1, 2].map((team, i) => (
          <div key={team} style={{ minWidth: 180 }}>
            <b>Team {team}</b>
            <div>Künstler: <span className={results[i].artistCorrect ? "correct" : "incorrect"}>{results[i].guess.artist || "-"}</span></div>
            <div>Song: <span className={results[i].songCorrect ? "correct" : "incorrect"}>{results[i].guess.song || "-"}</span></div>
            <div><b>Punkte: {results[i].points}</b></div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 24 }}>
        <button onClick={onNextRound}>Nächste Runde</button>
      </div>
      <style>{`.correct{color:#1DB954;font-weight:bold}.incorrect{color:#ff6347}`}</style>
    </div>
  );
} 