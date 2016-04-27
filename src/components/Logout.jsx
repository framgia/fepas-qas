import React, { Component } from 'react';
import store from '../store';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/auth';

class Logout extends Component {
  componentWillMount() {
    store.dispatch(logoutUser());
  }
  render() {
    return <p>You are now logged out</p>;
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

const mapDispatchToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
