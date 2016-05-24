import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Auth from './components/Auth';
import Logout from './components/Logout';
import App from './containers/App';
import HomePage from './containers/HomePage';
import UserProfileEditPage from './containers/UserProfileEditPage';
import VisibleQuestionList from './containers/VisibleQuestionList';
import CreateQuestion from './containers/CreateQuestion';

export default (
  <Route path="/" component={ App }>
    <IndexRoute component={ HomePage } />
    <Route name="auth" path="auth" component={ Auth } />
    <Route name="profile" path="profile" component={ UserProfileEditPage } />
    <Route name="logout" path="logout" component={ Logout } />
    <Route name="question detail" path="questions/:questionId" component={ VisibleQuestionList } />
    <Route name="create question" path="new_question" component={ CreateQuestion } />
    <Route name="questions" path="questions" component= { VisibleQuestionList } />
    <Route path="*" component={HomePage} />
  </Route>
);
