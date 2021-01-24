import { createSelector } from 'reselect';

const selectPlayTimer = (state) => {
  return state.playDuration;
};

export const selectDuration = createSelector([selectPlayTimer], (playDuration) => {
  return playDuration.duration;
});

export const selectCurrentTimer = createSelector([selectPlayTimer], (playDuration) => {
  return playDuration.currentTimer;
});
