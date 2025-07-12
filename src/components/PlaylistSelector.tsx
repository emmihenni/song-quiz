import React from "react";

export default function PlaylistSelector({ accessToken, onTracksLoaded }) {
  const [playlists, setPlaylists] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [customInput, setCustomInput] = React.useState("");
  const [customTracks, setCustomTracks] = React.useState([]);

  React.useEffect(() => {
    if (!accessToken) return;
    const fetchPlaylists = async () => {
      setLoading(true);
      setError("");
      let all = [];
      let url = "https://api.spotify.com/v1/me/playlists?limit=50";
      try {
        while (url) {
          const res = await fetch(url, {
            headers: { Authorization: `Bearer ${accessToken}` }
          });
          const data = await res.json();
          all = all.concat(data.items);
          url = data.next;
        }
        setPlaylists(all);
      } catch (e) {
        setError("Fehler beim Laden der Playlists.");
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylists();
  }, [accessToken]);

  const handleSelect = (id) => {
    setSelected(sel => sel.includes(id) ? sel.filter(x => x !== id) : [...sel, id]);
  };

  const handleLoadTracks = async () => {
    setLoading(true);
    setError("");
    let allTracks = [];
    try {
      for (const pid of selected) {
        let url = `https://api.spotify.com/v1/playlists/${pid}/tracks?market=from_token&limit=100`;
        while (url) {
          const res = await fetch(url, {
            headers: { Authorization: `Bearer ${accessToken}` }
          });
          const data = await res.json();
          const validTracks = data.items
            .filter(item => item.track?.id && !item.track.is_local)
            .map(item => ({
              id: item.track.id,
              name: item.track.name,
              artists: item.track.artists.map(a => a.name).join(", "),
              albumCover: item.track.album.images[0]?.url || "https://via.placeholder.com/100",
              releaseYear: item.track.album.release_date?.substring(0, 4) || "Unbekannt",
              uri: item.track.uri
            }));
          allTracks = allTracks.concat(validTracks);
          url = data.next;
        }
      }
      allTracks = allTracks.concat(customTracks);
      onTracksLoaded(allTracks);
    } catch (e) {
      setError("Fehler beim Laden der Tracks.");
    } finally {
      setLoading(false);
    }
  };

  // Öffentliche Playlist laden
  const handleAddCustom = async () => {
    setLoading(true);
    setError("");
    let playlistId = "";
    // Extrahiere Playlist-ID aus URL oder ID
    const urlMatch = customInput.match(/playlist[/:]([a-zA-Z0-9]{22})/);
    if (urlMatch) playlistId = urlMatch[1];
    else if (/^[a-zA-Z0-9]{22}$/.test(customInput)) playlistId = customInput;
    else {
      setError("Ungültige Playlist-URL oder ID.");
      setLoading(false);
      return;
    }
    try {
      let url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?market=from_token&limit=100`;
      let tracks = [];
      while (url) {
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        const data = await res.json();
        const validTracks = data.items
          .filter(item => item.track?.id && !item.track.is_local)
          .map(item => ({
            id: item.track.id,
            name: item.track.name,
            artists: item.track.artists.map(a => a.name).join(", "),
            albumCover: item.track.album.images[0]?.url || "https://via.placeholder.com/100",
            releaseYear: item.track.album.release_date?.substring(0, 4) || "Unbekannt",
            uri: item.track.uri
          }));
        tracks = tracks.concat(validTracks);
        url = data.next;
      }
      setCustomTracks(prev => prev.concat(tracks));
      setCustomInput("");
      setError("");
    } catch (e) {
      setError("Fehler beim Laden der öffentlichen Playlist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: "2rem 0" }}>
      <h3>Wähle eine oder mehrere Playlists</h3>
      {loading && <div>Lädt...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div style={{ maxHeight: 300, overflowY: "auto", border: "1px solid #ddd", borderRadius: 5, padding: 10, background: "#fff" }}>
        {playlists.map(pl => (
          <label key={pl.id} style={{ display: "flex", alignItems: "center", marginBottom: 8, cursor: "pointer" }}>
            <input type="checkbox" checked={selected.includes(pl.id)} onChange={() => handleSelect(pl.id)} />
            <img src={pl.images[0]?.url || "https://via.placeholder.com/40"} alt="cover" style={{ width: 40, height: 40, borderRadius: 3, marginRight: 10 }} />
            <span style={{ flexGrow: 1 }}>{pl.name}</span>
            <span style={{ color: "#888", fontSize: 14, marginLeft: 10 }}>{pl.tracks.total} Songs</span>
          </label>
        ))}
      </div>
      <div style={{ margin: "16px 0" }}>
        <input
          type="text"
          placeholder="Öffentliche Playlist-URL oder ID einfügen"
          value={customInput}
          onChange={e => setCustomInput(e.target.value)}
          style={{ width: 320, maxWidth: "100%", marginRight: 8 }}
        />
        <button onClick={handleAddCustom} disabled={!customInput || loading} type="button">Hinzufügen</button>
      </div>
      {customTracks.length > 0 && <div style={{ color: "#1DB954", marginBottom: 8 }}>{customTracks.length} Tracks aus öffentlichen Playlists hinzugefügt</div>}
      <button onClick={handleLoadTracks} disabled={(selected.length === 0 && customTracks.length === 0) || loading} style={{ marginTop: 16 }}>
        Tracks laden
      </button>
    </div>
  );
} 