import React, {useContext}from 'react'; 
import {AppContext} from "../App"; 

function Key({keyVal, bigKey}) {
    const {board, setBoard, currAttempt, setCurrAttempt} = useContext(AppContext); 

    const selectLetter = () => {
        if(keyVal == "ENTER"){
            if(currAttempt.letterPosition <= 4) return; 
            setCurrAttempt({...currAttempt, attemptNumber: currAttempt.attemptNumber+1, letterPosition: 0}); 
        } else {
            if(currAttempt.letterPosition > 4) return; 
            const newBoard = [...board]; 
            newBoard[currAttempt.attemptNumber][currAttempt.letterPosition] = keyVal; 
            setBoard(newBoard); 
            setCurrAttempt({...currAttempt, letterPosition: currAttempt.letterPosition + 1}); 
        }
    }  

  return (
    <div className='key' id={bigKey ? "big" : ""} onClick={() => selectLetter()}>{keyVal}</div>
  )
}

export default Key; 