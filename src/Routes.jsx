import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Auth from './components/Auth';
import Logout from './components/Logout';
import App from './containers/App';
import HomePage from './containers/HomePage';
import UserProfileEditPage from './containers/UserProfileEditPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route name="auth" path="auth" component={Auth} />
    <Route name="profile" path="profile" component={ UserProfileEditPage } />
    <Route name="logout" path="logout" component={Logout} />
    <Route path="*" component={HomePage} />
  </Route>
);
