import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import ScrollToTop from './utils/scrollToTop';
import store from './redux/store';

import './index.scss';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ScrollToTop>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
