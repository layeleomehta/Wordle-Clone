import React, {useContext} from 'react'; 
import {AppContext} from "../App"; 

function GameOver() {
    const {gameOver, correctWord, currAttempt} = useContext(AppContext); 
  return (
    <div className='gameOver'>

        <h1>Game is done!</h1>
        <h2>{gameOver.correctGuess ? "You guessed correctly!" : "You did NOT guess the word!"}</h2>
        <h1>The correct word is: {correctWord}</h1>
        {gameOver.correctGuess && (<h1>You guessed in {currAttempt.attemptNumber} attempts!</h1>)}
    </div>
  )
}

export default GameOver; 