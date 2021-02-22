import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './root.reducer';

const middlewares = [thunk];

// REVIEW
// middlewares.push(logger);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));

// For when not using Chrome redux dev tool extension.
// export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
