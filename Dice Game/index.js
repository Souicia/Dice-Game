const currentTurnID = document.getElementById('turn-id')
const playerScore = document.getElementById('player-score')
const playerDiceScore = document.getElementById('player-dice-score')
const playerWon = document.getElementById('player-won')
const botScore = document.getElementById('bot-score')
const botDiceScore = document.getElementById('bot-dice-score')
const botWon = document.getElementById('bot-won')
const throwDice = document.getElementById('die')
const resetGame = document.getElementById('reset')
const overlay = document.getElementById('modal')
const ruleBtn = document.getElementById('rules')
const roundSystem = document.getElementById('rounds')
const closeOverlayBtn = document.getElementById('close')

let pScore = 0
let bScore = 0
let playerTurn = true;
let stillPlaying = true;
let timesPlayerWon = 0
let timesBotWon = 0
let playerWonTheRound = false
let amountOfRounds = 0;


window.addEventListener('DOMContentLoaded', function() {
  playerWon.textContent = `Times won: ${timesPlayerWon}`
  botWon.textContent = `Times won: ${timesBotWon}`
})

roundSystem.addEventListener('click', function() {
  amountOfRounds = Number(prompt('Enter amount of rounds (max 10):'))
  if (amountOfRounds === 1) {
    roundSystem.textContent = `Game of ${amountOfRounds} round`
  }else if (amountOfRounds > 1){
    roundSystem.textContent = `Game of ${amountOfRounds} rounds`
  }
})

throwDice.addEventListener('click', function() {
  if (amountOfRounds > 0 && amountOfRounds <=10){
    if (stillPlaying){
      if (playerTurn) {
        playerPlaying()
      }else {
        botPlaying()  
      }
      if (pScore > 19) {
        playerHasWon()
      }else if (bScore > 19) {
        botHasWon()
      }
    }if ((amountOfRounds === timesPlayerWon)){
      someoneWon()
      currentTurnID.textContent = "Congrats! You defeated the Bot!"
    }else if(amountOfRounds === timesBotWon){
      someoneWon()
      currentTurnID.textContent = "Better luck next time, young padawan!"
    }
  }else {
    alert('Enter amount of rounds')
    }
})

function playerPlaying() {
  const playerDie = Math.floor(Math.random() * 6 ) + 1
  pScore += playerDie

  resetGame.style.display = 'none'
  currentTurnID.textContent = "Bot turn"
  playerScore.textContent = `Score: ${pScore}`
  playerDiceScore.textContent = playerDie
  botDiceScore.classList.add('active')
  playerDiceScore.classList.remove('active')
  playerTurn = !playerTurn;
}

function botPlaying() {
  const botDie = Math.floor(Math.random() * 6 ) + 1
  bScore += botDie

  resetGame.style.display = 'none'
  currentTurnID.textContent = "Player 1 turn"
  botScore.textContent = `Score: ${bScore}`
  botDiceScore.textContent = botDie
  botDiceScore.classList.remove('active')
  playerDiceScore.classList.add('active')
  playerTurn = !playerTurn
}

function playerHasWon() {
  currentTurnID.textContent = "Player 1 won"
  timesPlayerWon++
  playerWon.textContent = `Times won: ${timesPlayerWon}`
  resetGame.style.display = 'block'
  stillPlaying = false
  playerTurn = false
  playerWonTheRound = true

}

function botHasWon() {
  currentTurnID.textContent = "Bot won"
  timesBotWon++
  botWon.textContent = `Times won: ${timesBotWon}`
  resetGame.style.display = 'block'
  stillPlaying = false
  playerTurn = true
  playerWonTheRound = false

}

function someoneWon() {
  amountOfRounds = 0
  timesPlayerWon = 0
  timesBotWon = 0
  botWon.textContent = `Times won: 0`
  playerWon.textContent = `Times won: 0`
  roundSystem.textContent = "Enter amount of rounds"
}

resetGame.addEventListener('click', function() {
  pScore = 0
  bScore = 0
  stillPlaying = true

  playerScore.textContent = `Score: ${pScore}`
  playerDiceScore.textContent = "-"

  botScore.textContent = `Score: ${bScore}`
  botDiceScore.textContent = "-"

  if (playerWonTheRound) {
    currentTurnID.textContent = "Bot turn"
    botDiceScore.classList.add('active')
    playerDiceScore.classList.remove('active')
  }else {
    currentTurnID.textContent = "Player 1 turn"
    botDiceScore.classList.remove('active')
    playerDiceScore.classList.add('active')
  }
})

ruleBtn.addEventListener('click', function() {
  overlay.style.display = 'flex'
})

closeOverlayBtn.addEventListener('click', function() {
  overlay.style.display = 'none'
})
