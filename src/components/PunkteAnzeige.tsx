import React from "react";

interface PunkteAnzeigeProps {
  punkte: number[];
}

export default function PunkteAnzeige({ punkte }: PunkteAnzeigeProps) {
  return (
    <div style={{ display: "flex", gap: "2rem", margin: "1rem 0" }}>
      <div>Team 1: <b>{punkte[0]}</b> Punkte</div>
      <div>Team 2: <b>{punkte[1]}</b> Punkte</div>
    </div>
  );
} 