"use strict";

class Game {
  constructor() {
    this.cards = Array.from(document.querySelectorAll(".card"));
    this.gameField = document.getElementById("game-field");
    this.guessedCards = document.getElementById("guessed-cards");
    this.gameOver = document.getElementById("game-over");
    this.mathced = 0;
    this.toCheck = [];
    this.canFlip = true;
  }
  // Fisher-Yates shuffle algorithm
  shuffleCard() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      this.cards[j].style.order = i;
      this.cards[i].style.order = j;
    }
    this.checkCards();
  }
  // Checking for fliping cards
  checkCards() {
    this.cards.forEach((card) => {
      card.addEventListener("click", () => {
        card.classList.add("clicked");
        if (this.canFlip && !card.classList.contains("clicked")) {
          // exlucdng to check same card
          this.flip(card);
        }
      });
    });
  }
  // Flipping the card
  flip(card) {
    this.toCheck.push(card);
    if (this.toCheck.length === 2) {
      this.canFlip = false;
      setTimeout(() => {
        this.compare();
        this.canFlip = true;
      }, 1000);
    }
  }
  // Comparing the cards
  compare() {
    if (this.toCheck[0].innerHTML === this.toCheck[1].innerHTML) {
      // Disappearing matched cards
      this.mathced += 1;
      this.toCheck.forEach((card) => {
        card.classList.remove("clicked");
        card.classList.add("hide");
        this.guessedCards.innerHTML = this.mathced;
      });
      this.toCheck.length = 0;
    } else if (this.toCheck[0].innerHTML !== this.toCheck[1].innerHTML) {
      // Backflip unmatched cards
      this.toCheck.forEach((card) => {
        card.classList.remove("clicked");
      });
      this.toCheck.length = 0;
    }
    this.restart();
  }
  // Restart game after all cards matched
  restart() {
    if (this.mathced === 8) {
      this.gameOver.classList.add("visible");
      this.gameOver.addEventListener("click", () => {
        this.cards.forEach((card) => {
          card.classList.remove("hide");
          card.classList.remove("clicked");
          this.gameOver.classList.remove("visible");
          game();
        });
      });
    }
  }
}

let game = () => {
  const runGame = new Game();
  runGame.shuffleCard();
};

game();
