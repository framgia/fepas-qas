import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listenToProfile, submitProfile } from '../actions/users_action';
import store from '../store';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import CircularProgressDeterminate from '../components/CircularProgressDeterminate';

class UserProfileEditPage extends Component {
  constructor() {
    super();
    // Bind event handle by this kind
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.state = {
      firstNameError: '',
      lastNameError: '',
      displayNameError: '',
      disabled: false,
    };
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  componentWillMount() {
    // Dispatch a load data action
    // NOTE: Do not use this.props.listenToProfile here
    // since it is only assigned once an action was dispatched
    store.dispatch(listenToProfile());
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.submitProfile(this.props.data);
  }

  handleFieldChange(field) {
    return (e) => {
      Object.assign(this.props.data, {
        [field]: e.target.value.trim()
      });
      const stateToSet = {};
      const value = e.target.value.trim();
      stateToSet[field] = value;
      if (value === '') {
        stateToSet[`${field}Error`] = 'This field is required';
        this.setState({
          disabled: true
        });
      } else {
        stateToSet[`${field}Error`] = '';
        this.setState({
          disabled: false
        });
      }
      this.setState(stateToSet);
    };
  }

  render() {
    let partialView;
    // Setup template if data is received
    if (this.props.data) {
      partialView = (
        <Paper zDepth={2}>
          <div className="profile-form">
            <TextField
              hintText="First Name"
              value={this.props.data.firstName}
              fullWidth
              floatingLabelText="First Name"
              floatingLabelFixed
              errorText={this.state.firstNameError}
              onChange={this.handleFieldChange('firstName')}
            />
            <TextField
              hintText="Last Name"
              value={this.props.data.lastName}
              fullWidth
              floatingLabelText="Last Name"
              floatingLabelFixed
              errorText={this.state.lastNameError}
              onChange={this.handleFieldChange('lastName')}
            />
            <TextField
              hintText="Display Name"
              value={this.props.data.displayName}
              fullWidth
              floatingLabelText="Display Name"
              floatingLabelFixed
              errorText={this.state.displayNameError}
              onChange={this.handleFieldChange('displayName')}
            />
            <div className="btn-profile-submit">
              <RaisedButton label="Submit" primary onClick={this.handleSubmit}
                disabled={this.state.disabled}
              />
            </div>
          </div>
        </Paper>
      );
    }

    let containerView;
    // Check if data loading process is completed or not
    if (this.props.hasReceiveData) {
      containerView = partialView;
    } else if (this.props.isSubmitting) {
      containerView = (
        <CircularProgress className="loading" />
      );
    } else {
      containerView = (
        <div>
          <CircularProgressDeterminate />
          Did you logged in?
        </div>
      );
    }
    return containerView;
  }
}

const mapStateToProps = (state) => {
  // Extract neccesary properties from reducer
  const { data, hasReceiveData, isSubmitting } = state.userReducer;
  return {
    data,
    hasReceiveData,
    isSubmitting
  };
};

const mapDispatchToProps = {
  submitProfile
};

UserProfileEditPage.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileEditPage);
