import React, {useContext, useEffect} from 'react'
import {AppContext} from "../App"; 

function Letter({attemptVal, letterPosition}) {
    const { board, correctWord, currAttempt, disabledLetters, setDisabledLetters} = useContext(AppContext); 
    const letter = board[attemptVal][letterPosition];
    
    const correct = correctWord[letterPosition] === letter; 
    const almost = !correct && letter !== "" && correctWord.includes(letter); 

    const letterState = (currAttempt.attemptNumber > attemptVal) && (correct ? "correct" : almost ? "almost" : "error");
    
    
    useEffect(() => {
        if(letter !== "" && !correct && !almost){
            if(!disabledLetters.includes(letter)){
                setDisabledLetters((prev) => [...prev, letter]);
            }
        }
    }, [currAttempt.attemptNumber]); 

    
  return (
    <div className='letter' id={letterState}>{letter}</div>
  )
}

export default Letter; 