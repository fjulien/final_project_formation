import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.scss';

import NavbarTop from './containers/NavbarTop';
import ModalLogin from './components/ModalLogin';
import Home from './components/Home';
import ModalConf from './components/ModalConf';
import Newmovie from './components/Newmovie';


class App extends Component {
  render() {
    return (
      <div className="App">
        <NavbarTop />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/modal' component={ModalLogin} />
          <Route path='/conf' component={ModalConf} />
          <Route path='/new-movie' component={Newmovie} />
        </Switch>
      </div>
    );
  }
}

export default App;
