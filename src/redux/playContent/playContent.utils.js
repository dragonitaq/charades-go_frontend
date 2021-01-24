export const addNewCorrectAmount = (correctAmount) => {
  return (correctAmount = correctAmount + 1);
};

export const addNewCorrectWord = (correctItems, payload) => {
  return [...correctItems, payload];
};

export const addNewGuessedAmount = (guessAmount) => {
  return (guessAmount = guessAmount + 1);
};

export const addNewGuessedWord = (guessItems, payload) => {
  return [...guessItems, payload];
};
