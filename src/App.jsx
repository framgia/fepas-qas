import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { listenToAuth } from './actions/auth';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Auth from './components/Auth';
import Main from './components/Main';

const history = syncHistoryWithStore(browserHistory, store);

function AppRouter({ children }) {
  return (
    <div>
      <header>
        {' '}
        <Link to="/">Home</Link>
        {' '}
        <Link to="/auth">Auth</Link>
      </header>
      { children }
    </div>
  );
}
export class App extends Component {
  componentWillMount() {
    store.dispatch(listenToAuth());
  }
  render() {
    return (
      <Provider store={store}>
        <div>
          <Router history={history}>
            <Route path="/" component={AppRouter}>
              <IndexRoute component={Main} />
              <Route path="auth" component={Auth} />
            </Route>
          </Router>
        </div>
      </Provider>
    );
  }
}
