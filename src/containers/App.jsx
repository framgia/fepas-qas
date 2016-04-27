import React, { Component } from 'react';
import store from '../store';
import { listenToAuth } from '../actions/auth';

import Navbar from '../components/Navbar';

export default class App extends Component {
  componentWillMount() {
    store.dispatch(listenToAuth());
  }

  render() {
    const { children } = this.props;
    return (
      <div className="container">
        <Navbar />
        <div className="jumbotron">
          { children }
        </div>
      </div>
    );
  }
}
