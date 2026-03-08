"use strict";

// ─── Opgave 1: Flyt dodger til venstre ─────────────────────────────────────
function moveDodgerLeft() {
  // Fjern "px" fra værdien og konverter til et heltal
  const leftNumbers = dodger.style.left.replace("px", "");
  const left = parseInt(leftNumbers, 10);

  // Tjek at dodgeren ikke er nået til venstre kant
  if (left > 0) {
    dodger.style.left = `${left - 1}px`; // Flyt 1 pixel til venstre
    playSoundOnMovement();
  } else {
    playGameOverSound(); // Dodgeren har ramt venstre kant
  }
}
