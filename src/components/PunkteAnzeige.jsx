import React from "react";

export default function PunkteAnzeige({ punkte }) {
  return (
    <div style={{ display: "flex", gap: "2rem", margin: "1rem 0" }}>
      <div>Team 1: <b>{punkte[0]}</b> Punkte</div>
      <div>Team 2: <b>{punkte[1]}</b> Punkte</div>
    </div>
  );
} 