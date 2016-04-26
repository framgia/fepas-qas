// import React, { Component, PropTypes } from 'react';
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import Routes from '../Routes';

// For stateless component, do not use this.props
// Use arguments instead
const Layout = ({ store, history }) => {
  return (
    <Provider store={store}>
      <Router history={history} routes={Routes} />
    </Provider>
  );
};

// Set PropTypes if necessary
Layout.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default Layout;
