import React from "react";

export default function TeamWechsel({ aktuellesTeam, onTeamWechsel }) {
  return (
    <div style={{ margin: "1rem 0" }}>
      <span>Gerade am Zug: <b>Team {aktuellesTeam + 1}</b></span>
      <button style={{ marginLeft: 16 }} onClick={onTeamWechsel}>Team wechseln</button>
    </div>
  );
} 