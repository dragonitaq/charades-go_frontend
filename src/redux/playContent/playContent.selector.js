import { createSelector } from 'reselect';

const selectplayContent = (state) => {
  return state.playContent;
};

export const selectLanguage = createSelector([selectplayContent], (playContent) => {
  return playContent.language;
});

export const selectNeedLoader = createSelector([selectplayContent], (playContent) => {
  return playContent.needLoader;
});

export const selectErrorMessage = createSelector([selectplayContent], (playContent) => {
  return playContent.errorMessage;
});

export const selectCategories = createSelector([selectplayContent], (playContent) => {
  return playContent.categories;
});

export const selectSelectedCategory = createSelector([selectplayContent], (playContent) => {
  return playContent.selectedCategory;
});

export const selectVocabulary = createSelector([selectplayContent], (playContent) => {
  return playContent.vocabulary;
});

export const selectItemIndex = createSelector([selectplayContent], (playContent) => {
  return playContent.itemIndex;
});

export const selectGuessAmount = createSelector([selectplayContent], (playContent) => {
  return playContent.guessedAmount;
});

export const selectGuessItems = createSelector([selectplayContent], (playContent) => {
  return playContent.guessedItems;
});

export const selectCorrectAmount = createSelector([selectplayContent], (playContent) => {
  return playContent.correctAmount;
});

export const selectCorrectItems = createSelector([selectplayContent], (playContent) => {
  return playContent.correctItems;
});
