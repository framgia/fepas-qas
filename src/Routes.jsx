import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Auth from './components/Auth';
import Logout from './components/Logout';
import App from './containers/App';
import HomePage from './containers/HomePage';
import UserProfileEditPage from './containers/UserProfileEditPage';
import Question from './containers/Question';
import CreateQuestion from './containers/CreateQuestion';
import Vote from './containers/Vote';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route name="auth" path="auth" component={Auth} />
    <Route name="profile" path="profile" component={ UserProfileEditPage } />
    <Route name="logout" path="logout" component={Logout} />
    <Route name="question detail" path="questions/:questionId" component={ Question } />
    <Route name="create question" path="new_question" component={CreateQuestion} />
    <Route name="vote list" path="votes" component={ Vote } />
    <Route path="*" component={HomePage} />
  </Route>
);
