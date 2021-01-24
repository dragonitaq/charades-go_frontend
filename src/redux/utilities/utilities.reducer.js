const initialState = {
  showHowToPlay: false,
  showNoFnPopUp: false,
};

const timerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'toggleHowToPlay':
      return {
        ...state,
        showHowToPlay: !state.showHowToPlay,
      };
    case 'toggleNoFnPopUp':
      return {
        ...state,
        showNoFnPopUp: !state.showNoFnPopUp,
      };
    default:
      return state;
  }
};

export default timerReducer;
