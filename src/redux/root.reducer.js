import { combineReducers } from 'redux';

import playContentReducer from './playContent/playContent.reducer';
import playDurationReducer from './playDuration/playDuration.reducer';
import utilitiesReducer from './utilities/utilities.reducer';

const rootReducer = combineReducers({
  playContent: playContentReducer,
  playDuration: playDurationReducer,
  utilities: utilitiesReducer,
});

export default rootReducer;
