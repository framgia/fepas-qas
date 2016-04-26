import React from 'react';
import { render } from 'react-dom';
import Layout from './containers/Layout';

import store from './store';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

const history = syncHistoryWithStore(browserHistory, store);

render(<Layout store={ store } history={ history } />, document.getElementById('root'));
