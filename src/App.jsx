import { useState } from "react";
import "./App.css";
import Ueberschrift from "./components/Ueberschrift";
import PunkteAnzeige from "./components/PunkteAnzeige";
import SpotifyLogin from "./components/SpotifyLogin";
import DeviceSelector from "./components/DeviceSelector";
import PlaylistSelector from "./components/PlaylistSelector";
import SongHistory from "./components/SongHistory";
import TeamGuessPanel from "./components/TeamGuessPanel";
import RoundResult from "./components/RoundResult";
import YearSortPanel from "./components/YearSortPanel";

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [deviceId, setDeviceId] = useState("");
  const [songMeta, setSongMeta] = useState(null);
  const [guesses, setGuesses] = useState(null);
  const [punkte, setPunkte] = useState([0, 0]);
  const [showResult, setShowResult] = useState(false);
  const [trackPool, setTrackPool] = useState([]);
  const [songHistory, setSongHistory] = useState([]);
  const [showSortPanel, setShowSortPanel] = useState(false);
  const [sortAnswers, setSortAnswers] = useState(null);
  const [sortFeedback, setSortFeedback] = useState("");

  const handleTracksLoaded = (tracks) => {
    setTrackPool(tracks);
    setSongMeta(null);
    setGuesses(null);
    setShowResult(false);
    setSongHistory([]);
    setShowSortPanel(false);
    setSortAnswers(null);
    setSortFeedback("");
  };

  const handleSongLoaded = (meta) => {
    setSongMeta(meta);
    setGuesses(null);
    setShowResult(false);
    setShowSortPanel(false);
    setSortAnswers(null);
    setSortFeedback("");
  };

  const handleGuesses = (g) => {
    setGuesses(g);
    if (songHistory.length > 0) {
      setShowSortPanel(true);
    } else {
      setShowResult(true);
    }
  };

  const handleSortSubmit = (answers, sortedHistory) => {
    setSortAnswers(answers);
    const currentYear = parseInt(songMeta.releaseYear);
    let correctIdx = 0;
    while (
      correctIdx < sortedHistory.length &&
      parseInt(sortedHistory[correctIdx].releaseYear) < currentYear
    ) {
      correctIdx++;
    }
    let punkteNeu = [...punkte];
    let feedback = [];
    [1, 2].forEach((team, i) => {
      if (answers[`team${team}`] === correctIdx) {
        punkteNeu[i] += 1;
        feedback.push(`Team ${team} erhält 1 Punkt für die richtige Einsortierung!`);
      }
    });
    setPunkte(punkteNeu);
    setSortFeedback(feedback.join(" "));
    setShowResult(true);
    setShowSortPanel(false);
  };

  const handleNextRound = () => {
    setSongHistory(h => [...h, songMeta]);
    setSongMeta(null);
    setGuesses(null);
    setShowResult(false);
    setShowSortPanel(false);
    setSortAnswers(null);
    setSortFeedback("");
  };

  const playRandomFromPool = async () => {
    if (!trackPool.length) return;
    const unused = trackPool.filter(t => !songHistory.some(s => s.id === t.id));
    if (!unused.length) return alert("Alle Songs wurden gespielt!");
    const randomTrack = unused[Math.floor(Math.random() * unused.length)];
    await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ uris: [randomTrack.uri] })
    });
    setSongMeta(randomTrack);
    setGuesses(null);
    setShowResult(false);
    setShowSortPanel(false);
    setSortAnswers(null);
    setSortFeedback("");
  };

  return (
    <div className="App" style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <Ueberschrift />
      <PunkteAnzeige punkte={punkte} />
      <SongHistory songs={songHistory} />
      {!accessToken && <SpotifyLogin onToken={setAccessToken} />}
      {accessToken && !deviceId && (
        <DeviceSelector accessToken={accessToken} onDeviceSelected={setDeviceId} />
      )}
      {accessToken && deviceId && !trackPool.length && (
        <PlaylistSelector accessToken={accessToken} onTracksLoaded={handleTracksLoaded} />
      )}
      {accessToken && deviceId && trackPool.length > 0 && !songMeta && (
        <div style={{ margin: "1rem 0" }}>
          <button onClick={playRandomFromPool}>Zufälligen Song aus Playlist abspielen</button>
        </div>
      )}
      {songMeta && !showResult && !showSortPanel && (
        <TeamGuessPanel onSubmit={handleGuesses} />
      )}
      {songMeta && showSortPanel && songHistory.length > 0 && (
        <YearSortPanel songHistory={songHistory} currentSong={songMeta} onSubmit={handleSortSubmit} />
      )}
      {songMeta && showResult && (
        <>
          {sortFeedback && <div style={{ color: "#1DB954", fontWeight: "bold", margin: "1rem 0" }}>{sortFeedback}</div>}
          <RoundResult songMeta={songMeta} guesses={guesses} onNextRound={handleNextRound} punkte={punkte} setPunkte={setPunkte} />
        </>
      )}
    </div>
  );
}

export default App;
