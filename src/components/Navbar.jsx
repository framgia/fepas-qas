import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/auth';
import C from '../constants';

class Navbar extends Component {
  getRightNavbar(props) {
    switch (props.auth.status) {
      case C.AUTH_LOGGED_IN: return (
        <ul className="nav navbar-nav navbar-right">
          <li>
            <img className="profile-image img-circle img-responsive"
              src={props.auth.profileImageUrl} alt={props.auth.username}
            />
          </li>
          <li>
            <Link to="/" onClick={props.logoutUser}>
              <span className="glyphicon glyphicon-log-out"></span> Logout
            </Link>
          </li>
        </ul>
      );
      default: return (
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="/auth">
              <span className="glyphicon glyphicon-log-in"></span> Login
            </Link>
          </li>
        </ul>
      );
    }
  }
  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">Home</Link>
          </div>
          {this.getRightNavbar(this.props)}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

const mapDispatchToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
