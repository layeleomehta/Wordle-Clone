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
    const wordBankResponse = await fetch(wordBank); 
    const wordBankText = await wordBankResponse.text(); 
    let wordBankArr = wordBankText.split("\n"); 
    // last word in array is empty string for some reason, so just popping that off
    wordBankArr.pop(); 
    wordBankSet = new Set(wordBankArr); 

    return {wordBankSet}; 
}