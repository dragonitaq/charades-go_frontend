const initialState = {
  duration: 2, // minute
  initialTimer: 0, // second
  currentTimer: 0, // second
};

const timerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'increaseDuration':
      return {
        ...state,
        duration: state.duration + 1,
      };
    case 'decreaseDuration':
      return {
        ...state,
        duration: state.duration - 1,
      };
    case 'convertDurationToInitialTimer':
      return {
        ...state,
        initialTimer: state.duration * 60,
      };
    case 'copyInitialTimerToCurrentTimer':
      return {
        ...state,
        currentTimer: state.initialTimer,
      };
    case 'countDownTimer':
      return {
        ...state,
        currentTimer: state.currentTimer - 1,
      };
    default:
      return state;
  }
};

export default timerReducer;
