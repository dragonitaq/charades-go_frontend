import { createSelector } from 'reselect';

const selectUtilities = (state) => {
  return state.utilities;
};

export const selectShowHowToPlay = createSelector([selectUtilities], (showHowToPlay) => {
  return showHowToPlay.showHowToPlay;
});

export const selectShowNoFnPopUp = createSelector([selectUtilities], (showNoFnPopUp) => {
  return showNoFnPopUp.showNoFnPopUp;
});

export const selectSound = createSelector([selectUtilities], (sound) => {
  return sound.sound;
});
