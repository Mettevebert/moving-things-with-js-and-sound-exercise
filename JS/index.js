"use strict";

// Opgave 1: Flyt dodger til venstre 
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

// Opgave 2: Flyt dodger op 
function moveDodgerUp() {
  // Vi bruger style.bottom fordi vi bevæger os lodret
  const bottomNumbers = dodger.style.bottom.replace("px", "");
  const bottom = parseInt(bottomNumbers, 10);

  // Spillebanen er 400px høj og dodgeren er 20px høj, så maks. bottom = 380px
  if (bottom < 380) {
    dodger.style.bottom = `${bottom + 1}px`; // Flyt 1 pixel op
    playSoundOnMovement();
  } else {
    playGameOverSound(); // Dodgeren har ramt toppen
  }
}

// Opgave 3: Flyt dodger ned 
function moveDodgerDown() {
  const bottomNumbers = dodger.style.bottom.replace("px", "");
  const bottom = parseInt(bottomNumbers, 10);

  if (bottom > 0) {
    dodger.style.bottom = `${bottom - 1}px`; // Flyt 1 pixel ned
    playSoundOnMovement();
  } else {
    playGameOverSound(); // Dodgeren har ramt bunden
  }
}