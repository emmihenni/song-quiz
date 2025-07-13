import React from "react";

const CLIENT_ID = "68286e6fbf0048e083e3d2d53b18dc40"; // Dein Spotify Client ID
const SCOPES = [
  "user-read-email",
  "user-read-private",
  "user-modify-playback-state",
  "user-read-playback-state",
  "playlist-read-private",
  "playlist-read-collaborative",
];

export default function SpotifyLogin({ onToken }) {
  const REDIRECT_URI =
    typeof window !== "undefined" ? window.location.origin : "";
  console.log(REDIRECT_URI);

  const handleLogin = () => {
    const authUrl =
      "https://accounts.spotify.com/authorize?" +
      new URLSearchParams({
        client_id: CLIENT_ID,
        response_type: "token",
        redirect_uri: REDIRECT_URI,
        scope: SCOPES.join(" "),
        show_dialog: "true",
      }).toString();
    window.location.href = authUrl;
  };

  React.useEffect(() => {
    // Token aus URL extrahieren
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get("access_token");
      if (token) {
        window.location.hash = "";
        onToken(token);
      }
    }
  }, [onToken]);

  return (
    <div style={{ textAlign: "center", margin: "2rem 0" }}>
      <button
        onClick={handleLogin}
        style={{
          background: "#1DB954",
          color: "white",
          padding: "1rem 2rem",
          border: "none",
          borderRadius: 24,
          fontSize: 18,
          cursor: "pointer",
        }}
      >
        Mit Spotify verbinden
      </button>
    </div>
  );
}
