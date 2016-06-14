import React from 'react';
import { Route, IndexRoute } from 'react-router';

// component
import Auth from './components/Auth';
import Logout from './components/Logout';

// container
import App from './containers/App';
import HomePage from './containers/HomePage';
import UserProfileEditPage from './containers/UserProfileEditPage';
import QuestionCreatePage from './containers/QuestionCreatePage';
import QuestionListPage from './containers/QuestionListPage';
import QuestionPage from './containers/QuestionPage';
import QuestionEditPage from './containers/QuestionEditPage';

export default (
  <Route path="/" component={ App }>
    <IndexRoute component={ HomePage } />
    <Route name="auth" path="auth" component={ Auth } />
    <Route name="profile" path="profile" component={ UserProfileEditPage } />
    <Route name="logout" path="logout" component={ Logout } />
    <Route name="questions list" path="questions" component= { QuestionListPage } />
    <Route name="question detail" path="question/:questionId" component={ QuestionPage } />
    <Route name="question create" path="new_question" component={ QuestionCreatePage } />
    <Route name="question edit" path="question/edit/:questionId" component={ QuestionEditPage } />
    <Route path="*" component={ HomePage } />
  </Route>
);
