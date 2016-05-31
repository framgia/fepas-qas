import React, { Component } from 'react';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class MuiComponent extends Component {
  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }
}

MuiComponent.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default MuiComponent;
