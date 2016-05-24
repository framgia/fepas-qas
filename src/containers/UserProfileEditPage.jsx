import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listenToProfile, submitProfile } from '../actions/users_action';
import store from '../store';
import InputField from '../components/InputField';

class UserProfileEditPage extends Component {
  constructor() {
    super();
    // Bind event handle by this kind
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
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
    };
  }

  render() {
    let partialView;
    // Setup template if data is received
    if (this.props.data) {
      const { firstName, lastName, displayName } = this.props.data;
      partialView = (
        <form onSubmit={ this.handleSubmit }>
          First Name:
          <InputField type={ 'text' } placeholder={ 'First Name' }
            value={ firstName } handleChange={ this.handleFieldChange('firstName') }
          />
          <br />
          Last Name:
          <InputField type={ 'text' } placeholder={ 'Last Name' }
            value={ lastName } handleChange={ this.handleFieldChange('lastName') }
          />
          <br />
          Display Name:
          <InputField type={ 'text' } placeholder={ 'Display Name' }
            value={ displayName } handleChange={ this.handleFieldChange('displayName') }
          />
          <br />
          <input type="submit" value="Save" />
        </form>
      );
    }

    let containerView;
    // Check if data loading process is completed or not
    if (this.props.hasReceiveData) {
      containerView = partialView;
    } else if (this.props.isSubmitting) {
      containerView = (
        <div>
          Submitting...
        </div>
      );
    } else {
      containerView = (
        <div>
          Loading data...<br />Did you logged in?
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

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileEditPage);
