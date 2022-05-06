import './App.css';
import React, {useState, createContext, useEffect} from 'react'; 
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import GameOver from './components/GameOver';
import {boardDefault, generateWordSet} from "./Words"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AppContext = createContext(); 

function App() {
  const [board, setBoard] = useState(boardDefault); 
  const [currAttempt, setCurrAttempt] = useState({
    attemptNumber: 0, 
    letterPosition: 0
  }); 
  const [wordSet, setWordSet] = useState(new Set()); 
  const [disabledLetters, setDisabledLetters] = useState([]); 
  const [gameOver, setGameOver] = useState({
    gameOver: false, 
    correctGuess: false
  }); 

  useEffect(() => {

    return async () => {
      const words = await generateWordSet(); 
      setWordSet(words.wordBankSet); 
    } 
  }, []); 

  const correctWord = "ALIAS"; 

  const onSelectLetter = (keyVal) => {
    if(currAttempt.letterPosition > 4) return; 
    const newBoard = [...board]; 
    newBoard[currAttempt.attemptNumber][currAttempt.letterPosition] = keyVal; 
    setBoard(newBoard); 
    setCurrAttempt({...currAttempt, letterPosition: currAttempt.letterPosition + 1}); 
  } 

  const onDelete = () => {
    if(currAttempt.letterPosition === 0) return; 
    const newBoard = [...board]; 
    newBoard[currAttempt.attemptNumber][currAttempt.letterPosition - 1] = "";
    setBoard(newBoard); 
    setCurrAttempt({...currAttempt, letterPosition: currAttempt.letterPosition - 1}); 
  } 

  const onEnter = () => {
    if(currAttempt.letterPosition <= 4) return; 

    let currWord = ""; 
    for (let i=0; i<5; i++){
      currWord += board[currAttempt.attemptNumber][i];  
    }

    currWord = currWord.toLowerCase(); 
    if(wordSet.has(currWord)){
      setCurrAttempt({...currAttempt, attemptNumber: currAttempt.attemptNumber+1, letterPosition: 0}); 
    } else {
      toast.error("Not a valid word!")
    }

    if(currWord === correctWord.toLowerCase()){
      setGameOver({
        gameOver: true, 
        correctGuess: true
      }); 
      return; 
    }

    if(currAttempt.attemptNumber >= 5){
      setGameOver({
        gameOver: true, 
        correctGuess: false
      })
    }


  } 



  return (
    <div className="App">
      <nav><h1>Wordle</h1></nav>

      <ToastContainer/>
      <AppContext.Provider value={{board, 
                                   setBoard, 
                                   currAttempt, 
                                   setCurrAttempt, 
                                   onSelectLetter, 
                                   onDelete, 
                                   onEnter,
                                   correctWord, 
                                   disabledLetters, 
                                   setDisabledLetters, 
                                   gameOver, 
                                   setGameOver
                                   }}>
        <div className="game">
          <Board/>
          {gameOver.gameOver ? <GameOver/> : <Keyboard/>}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
