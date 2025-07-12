import React from "react";

export default function DeviceSelector({ accessToken, onDeviceSelected }) {
  const [devices, setDevices] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const fetchDevices = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://api.spotify.com/v1/me/player/devices", {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      const data = await res.json();
      setDevices(data.devices || []);
    } catch (e) {
      setError("Fehler beim Laden der Geräte.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (accessToken) fetchDevices();
  }, [accessToken]);

  return (
    <div style={{ margin: "1rem 0" }}>
      <button onClick={fetchDevices} disabled={loading}>
        Geräte aktualisieren
      </button>
      {loading && <span> Lädt...</span>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <select onChange={e => onDeviceSelected(e.target.value)} style={{ marginLeft: 16 }}>
        <option value="">Gerät wählen</option>
        {devices.map(device => (
          <option key={device.id} value={device.id}>
            {device.name} {device.is_active ? "(Aktiv)" : ""}
          </option>
        ))}
      </select>
    </div>
  );
} 