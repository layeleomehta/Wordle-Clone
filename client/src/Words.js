import wordBank from "./sgb-words.txt"

// this is gonna be the gameboard: it's a 6X5 matrix. Each row represents attempt, 
// each column represents letter of the 5 letter word. 
export const boardDefault = [
                             ["", "", "", "", ""], 
                             ["", "", "", "", ""], 
                             ["", "", "", "", ""],
                             ["", "", "", "", ""], 
                             ["", "", "", "", ""], 
                             ["", "", "", "", ""]
                            ]

export const generateWordSet = async () => {
    let wordBankSet; 
    let randomWord; 

    const wordBankResponse = await fetch(wordBank); 
    const wordBankText = await wordBankResponse.text(); 
    let wordBankArr = wordBankText.split("\n"); 
    // last word in array is empty string for some reason, so just popping that off
    wordBankArr.pop(); 

    //generate random word
    randomWord = wordBankArr[Math.floor(Math.random() * wordBankArr.length)]; 

    wordBankSet = new Set(wordBankArr); 
    return {wordBankSet, randomWord}; 
}