import React from 'react';
import MuiComponent from './MuiComponent';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/auth';
import C from '../constants';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
import FontIcon from 'material-ui/FontIcon';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import { cyan500, grey50 } from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';

const style = {
  backgroundColor: cyan500,
};

class Navbar extends MuiComponent {
  getRightNavbar(props) {
    let avatar;
    let menu;
    switch (props.auth.status) {
      case C.AUTH_LOGGED_IN:
        avatar = (
          <Avatar
            src={props.auth.profileImageUrl}
            className="profile-image"
          />
        );
        menu = (
          <Menu>
            <Link to="/profile"><MenuItem>Profile</MenuItem></Link>
            <Link to="/logout"><MenuItem>Logout</MenuItem></Link>
          </Menu>
        );
        break;
      default:
        menu = (
          <Link to="/auth"><MenuItem>Login</MenuItem></Link>
        );
        break;
    }
    return (
      <ToolbarGroup lastChild>
        {avatar}
        <IconMenu
          iconButtonElement={
            <IconButton touch>
              <NavigationExpandMoreIcon color={grey50} />
            </IconButton>
          }
        >
          {menu}
        </IconMenu>
      </ToolbarGroup>
    );
  }
  render() {
    return (
      <Toolbar style={style}>
        <ToolbarGroup firstChild>
          <IconButton tooltip="Home">
            <Link to="/"><FontIcon className="muidocs-icon-action-home" color={grey50} /></Link>
          </IconButton>
        </ToolbarGroup>
        {this.getRightNavbar(this.props)}
      </Toolbar>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.authReducer };
};

const mapDispatchToProps = {
  logoutUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
