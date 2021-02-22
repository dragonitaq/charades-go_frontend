import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/home/home.component';
import Play from './pages/play/play.component';
import Result from './pages/result/result.component';

import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/play' component={Play} />
          <Route exact path='/result' component={Result} />
        </Switch>
      </div>
    );
  }
}

export default App;
