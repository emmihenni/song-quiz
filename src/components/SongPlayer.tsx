import React from "react";

const GENRES = [
  "pop", "rock", "hip-hop", "electronic", "jazz", "classical", "country", "r-n-b", "indie", "folk"
];

export default function SongPlayer({ accessToken, deviceId, onSongLoaded }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const playRandomSong = async () => {
    setLoading(true);
    setError("");
    try {
      const randomGenre = GENRES[Math.floor(Math.random() * GENRES.length)];
      const searchRes = await fetch(`https://api.spotify.com/v1/search?q=genre:${randomGenre}&type=track&limit=50`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      const searchData = await searchRes.json();
      if (!searchData.tracks || searchData.tracks.items.length === 0) throw new Error("Keine Songs gefunden.");
      const randomTrack = searchData.tracks.items[Math.floor(Math.random() * searchData.tracks.items.length)];
      // Song abspielen
      await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ uris: [randomTrack.uri] })
      });
      // Albumdaten für Jahr
      const albumRes = await fetch(`https://api.spotify.com/v1/albums/${randomTrack.album.id}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      const albumData = await albumRes.json();
      const songMeta = {
        name: randomTrack.name,
        artists: randomTrack.artists.map(a => a.name).join(", "),
        albumCover: randomTrack.album.images[0]?.url || "https://via.placeholder.com/100",
        releaseYear: albumData.release_date?.substring(0, 4) || "Unbekannt"
      };
      onSongLoaded(songMeta);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      <button onClick={playRandomSong} disabled={!accessToken || !deviceId || loading}>
        Zufälligen Song abspielen
      </button>
      {loading && <span> Lädt...</span>}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
} 