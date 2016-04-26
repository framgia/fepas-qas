import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Auth from './components/Auth';
import App from './containers/App';
import HomePage from './containers/HomePage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route name="auth" path="auth" component={Auth} />
  </Route>
);
