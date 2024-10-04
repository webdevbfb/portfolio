const express = require('express');
const app = express();
const readlineSync = require('readline-sync');
const chalk = require('chalk');

// 1. Filmtitel und Emojis definieren
const movieTitles = [
  "Der Pate",
  "Forrest Gump",
  "Inception",
  "Die Verurteilten",
  "Der Herr der Ringe",
  "Matrix",
  "Titanic",
  "Gladiator",
  "Schindlers Liste",
  "Star Wars"
];

const shrugmanEmoji = "¯\\_(:/)_/¯";

// 2. Spielvariablen initialisieren
let attempts = 10;
let wrongGuesses = [];
let correctGuesses = [];
let movieTitle = "";
let playerName = "";

// 3. Begrüßungsfunktion
function greet() {
  playerName = readlineSync.question(chalk.blue("Willkommen zum Shrugman-Spiel! Wie heißt du? "));
  console.log(chalk.green(`Willkommen ${playerName}!`));
}

// 4. Spielregeln anzeigen
function showGameRules() {
  console.log(chalk.yellow("Spielregeln:"));
  console.log(chalk.yellow("1. Ein Filmtitel wird zufällig ausgewählt."));
  console.log(chalk.yellow("2. Errate die Buchstaben des Titels."));
  console.log(chalk.yellow("3. Bei jeder falschen Vermutung wird ein Teil des Shrugman-Emojis gezeichnet."));
  console.log(chalk.yellow("4. Bei 10 falschen Vermutungen ist das Spiel vorbei."));
  console.log("\n");
}

// 5. Zufälligen Filmtitel auswählen
function randomTitle() {
  return movieTitles[Math.floor(Math.random() * movieTitles.length)];
}

// 6. Buchstabe vom Spieler abfragen
function getPlayerGuess() {
  while (true) {
    let letter = readlineSync.question(chalk.blue("Rate einen Buchstaben: "));
    letter = letter.trim();
    if (letter.length === 1) {
      return letter.toLowerCase();
    } else {
      console.log(chalk.red("Die Eingabe darf nur ein Zeichen sein."));
    }
  }
}

// 7. Spieler-Vermutung prüfen
function checkPlayerGuess(guess) {
  console.clear();
  if (correctGuesses.includes(guess) || wrongGuesses.includes(guess)) {
    console.log(chalk.red("Du hast diesen Buchstaben bereits geraten. Versuch einen anderen."));
    return;
  }

  if (movieTitle.toLowerCase().includes(guess)) {
    correctGuesses.push(guess);
    console.log(chalk.green("Richtig!"));
  } else {
    wrongGuesses.push(guess);
    attempts--;
    console.log(chalk.red("Falsch!"));
  }
  preview();
}

// 8. Spielvorschau anzeigen
function preview() {
  let previewString = "";
  for (const letter of movieTitle) {
    if (letter === " " || correctGuesses.includes(letter.toLowerCase())) {
      previewString += letter + " ";
    } else {
      previewString += "_ ";
    }
  }
  console.log(chalk.green(previewString));
  console.log(chalk.bgRed.white(shrugmanEmoji.slice(0, 10 - attempts)));
  if (wrongGuesses.length > 0) {
    console.log(chalk.red("Falsche Buchstaben: " + wrongGuesses.join(', ')));
  }
}

// 9. Shrugman-Emoji aktualisieren
function generateShrugman() {
  // Die Funktion wird in preview() aufgerufen
}

// 10. Spiel starten
function startGame() {
  greet();
  showGameRules();
  
  do {
    attempts = 10;
    wrongGuesses = [];
    correctGuesses = [];
    movieTitle = randomTitle();
    preview();

    while (attempts > 0 && correctGuesses.length < new Set(movieTitle.toLowerCase().replace(/ /g, '')).size) {
      const guess = getPlayerGuess();
      checkPlayerGuess(guess);
    }

    if (attempts === 0) {
      console.log(chalk.red(`Schade ${playerName} Du hast verloren! Der Filmtitel war: ${movieTitle}`));
    } else {
      console.log(chalk.green(`Herzlichen Glückwunsch ${playerName}! Du hast den Filmtitel erraten: ${movieTitle}`));
    }
  } while (readlineSync.keyInYN(chalk.blue("Möchtest du eine weitere Runde spielen?")));
}

startGame();