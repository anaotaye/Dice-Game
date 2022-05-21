'use strict';

//Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('.current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

//Stating actions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

//Getting player names
const player0Name = prompt("What is Player 1's name?");
const player1Name = prompt("What is Player 2's name?");
console.log(player0Name, player1Name);

if (player0Name !== null && player1Name !== null) {
  document.getElementById('name--0').textContent = player0Name;
  document.getElementById('name--1').textContent = player1Name;
}

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const inPlay = function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    //Check for rolled dice and display image
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //Check for rolled dice 1 and add to current score
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //1. Switch to other player (differentiate between both players)
      switchPlayer();
    }
  }
};

btnRoll.addEventListener(
  'click',
  //Generate a random dice roll
  inPlay
);

btnHold.addEventListener('click', function () {
  //1.Add current score to active player's score
  if (playing) {
    scores[activePlayer] += currentScore;
    diceEl.classList.add('hidden');

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.Check if player's total score >= 100 and declare active player winner and end game
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  //Resetting all variables
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  playing = true;

  //Hiding the dice
  diceEl.classList.add('hidden');

  //Resetting scored elements
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;
  document.getElementById('score--0').textContent = 0;
  document.getElementById('score--1').textContent = 0;

  //Resetting the background states
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
});
