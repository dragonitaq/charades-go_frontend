const initialState = {
  showHowToPlay: false,
  showNoFnPopUp: false,
  sound: true,
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
    case 'toggleSound':
      return {
        ...state,
        sound: !state.sound,
      };
    default:
      return state;
  }
};

export default timerReducer;
