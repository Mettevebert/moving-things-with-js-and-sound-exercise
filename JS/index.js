"use strict"; // Slår strict mode til – hjælper med at fange fejl tidligt

// Hent dodger-elementet og lydelementerne fra HTML
const dodger = document.getElementById("dodger");
const movementSound = document.getElementById("movementSound");
const gameoverSound = document.getElementById("gameoverSound");

// ─── Opgave 4: Afspil bevægelseslyd ────────────────────────────────────────
// Nulstiller lyden til starten og afspiller den
function playSoundOnMovement() {
  movementSound.currentTime = 0; // Sæt afspilningsposition til starten
  movementSound.play();          // Afspil lyden
}

// ─── Opgave 5: Afspil game over-lyd ────────────────────────────────────────
// Afspilles når dodgeren rammer en kant eller en sten
function playGameOverSound() {
  gameoverSound.currentTime = 0; // Sæt afspilningsposition til starten
  gameoverSound.play();          // Afspil game over-lyden
}

// ─── Opgave 1: Flyt dodger til venstre ─────────────────────────────────────
function moveDodgerLeft() {
  // Fjern "px" fra værdien og konverter til et heltal
  const leftNumbers = dodger.style.left.replace("px", "");
  const left = parseInt(leftNumbers, 10);

  // Tjek at dodgeren ikke er nået til venstre kant
  if (left > 0) {
    dodger.style.left = `${left - 5}px`; // Flyt 5 pixels til venstre
    playSoundOnMovement();
  } else {
    playGameOverSound(); // Dodgeren har ramt venstre kant
  }
}

// ─── Opgave 1: Flyt dodger til højre ───────────────────────────────────────
function moveDodgerRight() {
  const leftNumbers = dodger.style.left.replace("px", "");
  const left = parseInt(leftNumbers, 10);

  // Spillebanen er 400px bred og dodgeren er 40px bred, så maks. left = 360px
  if (left < 360) {
    dodger.style.left = `${left + 5}px`; // Flyt 5 pixels til højre
    playSoundOnMovement();
  } else {
    playGameOverSound(); // Dodgeren har ramt højre kant
  }
}

// ─── Opgave 2: Flyt dodger op ───────────────────────────────────────────────
function moveDodgerUp() {
  // Vi bruger style.bottom fordi vi bevæger os lodret
  const bottomNumbers = dodger.style.bottom.replace("px", "");
  const bottom = parseInt(bottomNumbers, 10);

  // Spillebanen er 400px høj og dodgeren er 20px høj, så maks. bottom = 380px
  if (bottom < 380) {
    dodger.style.bottom = `${bottom + 5}px`; // Flyt 5 pixels op
    playSoundOnMovement();
  } else {
    playGameOverSound(); // Dodgeren har ramt toppen
  }
}

// ─── Opgave 3: Flyt dodger ned ──────────────────────────────────────────────
function moveDodgerDown() {
  const bottomNumbers = dodger.style.bottom.replace("px", "");
  const bottom = parseInt(bottomNumbers, 10);

  // Tjek at dodgeren ikke er nået til bunden
  if (bottom > 0) {
    dodger.style.bottom = `${bottom - 5}px`; // Flyt 5 pixels ned
    playSoundOnMovement();
  } else {
    playGameOverSound(); // Dodgeren har ramt bunden
  }
}

// ─── Lyt efter tastetryk og kald den rigtige funktion ───────────────────────
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") {
    moveDodgerLeft();  // Venstre piletast → flyt til venstre
  }
  if (e.key === "ArrowRight") {
    moveDodgerRight(); // Højre piletast → flyt til højre
  }
  if (e.key === "ArrowUp") {
    moveDodgerUp();    // Op piletast → flyt op
  }
  if (e.key === "ArrowDown") {
    moveDodgerDown();  // Ned piletast → flyt ned
  }
});

// ─── Opgave 8: Spilmekanik – faldende sten ──────────────────────────────────
let score = 0;           // Spillerens nuværende score
let gameActive = false;  // Holder styr på om spillet er i gang
let rockInterval = null; // Reference til intervallet der skaber nye sten

// Opretter en ny faldende sten og tilføjer den til spillebanen
function createRock() {
  const rock = document.createElement("div");
  rock.classList.add("rock");

  // Placer stenen på en tilfældig vandret position (0–380px)
  const randomLeft = Math.floor(Math.random() * 381);
  rock.style.left = `${randomLeft}px`;
  rock.style.top = "0px";
  document.getElementById("game").appendChild(rock);

  // Animér stenen så den falder ned gennem spillebanen
  const fall = setInterval(() => {
    if (!gameActive) {
      // Stop animationen hvis spillet ikke er aktivt
      clearInterval(fall);
      rock.remove();
      return;
    }

    const currentTop = parseInt(rock.style.top, 10);
    rock.style.top = `${currentTop + 2}px`; // Flyt stenen 2px ned per frame

    // Fjern stenen og giv et point når den falder ud af spillebanen
    if (currentTop > 400) {
      clearInterval(fall);
      rock.remove();
      score++;
      document.getElementById("score").textContent = `Score: ${score}`;
      return;
    }

    // Kollisionsdetektion – tjek om dodgeren og stenen overlapper hinanden
    const rockRect = rock.getBoundingClientRect();
    const dodgerRect = dodger.getBoundingClientRect();

    const hit =
      rockRect.left   < dodgerRect.right  &&
      rockRect.right  > dodgerRect.left   &&
      rockRect.top    < dodgerRect.bottom &&
      rockRect.bottom > dodgerRect.top;

    if (hit) {
      // Dodgeren er ramt – spillet er slut!
      clearInterval(fall);
      rock.remove();
      gameOver();
    }
  }, 20);
}

// Starter spillet og nulstiller alle værdier
function startGame() {
  score = 0;
  gameActive = true;
  document.getElementById("score").textContent = "Score: 0";
  document.getElementById("start").style.display = "none";
  document.getElementById("game-over-msg").style.display = "none";

  // Opgave 7: Nulstil dodgerens position til midten af spillebanen
  dodger.style.left = "180px";
  dodger.style.bottom = "0px";

  // Opret en ny sten hvert sekund
  rockInterval = setInterval(createRock, 1000);
}

// Afslutter spillet og viser game over-beskeden
function gameOver() {
  gameActive = false;
  clearInterval(rockInterval);
  playGameOverSound();

  const msg = document.getElementById("game-over-msg");
  msg.style.display = "block";
  msg.textContent = `Game Over! Du fik ${score} point 💀`;
}

// Lyt efter klik på start-knappen
document.getElementById("start").addEventListener("click", startGame);