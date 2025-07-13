import React from "react";

interface UeberschriftProps {
  color?: string;
}

export default function Ueberschrift({ color = "#fff" }: UeberschriftProps) {
  return (
    <header>
      <h1 style={{ color }}>{"Song Quiz"}</h1>
    </header>
  );
} 