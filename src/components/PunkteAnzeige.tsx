import React from "react";

interface PunkteAnzeigeProps {
  punkte: number[];
  color?: string;
}

export default function PunkteAnzeige({ punkte, color = "#fff" }: PunkteAnzeigeProps) {
  return (
    <div style={{ display: "flex", gap: "2rem", margin: "1rem 0" }}>
      <div style={{ color }}>Team 1: <b>{punkte[0]}</b> Punkte</div>
      <div style={{ color }}>Team 2: <b>{punkte[1]}</b> Punkte</div>
    </div>
  );
} 