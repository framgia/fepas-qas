import React from 'react';
import MuiComponent from '../components/MuiComponent';
import { connect } from 'react-redux';
import { submitQuestion } from '../actions/questions_action';
import QuestionForm from '../components/QuestionForm';

class CreateQuestion extends MuiComponent {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.convertTags();
    this.props.submitQuestion(this.props.data);
  }

  handleFieldChange(field) {
    return (e, value = '') => {
      Object.assign(this.props.data, {
        [field]: value || e.target.value.trim()
      });
    };
  }

  convertTags() {
    const tags = [];
    if (this.props.data.tag) {
      this.props.data.tag.split(',').forEach((tag) => {
        tags.push(tag.trim());
      });
    }
    this.props.data.tag = tags;
  }

  render() {
    return (
      <QuestionForm
        handleFieldChange={ this.handleFieldChange }
        handleSubmit={ this.handleSubmit }
      />
    );
  }
}

const mapStateToProps = (state) => {
  // Extract neccesary properties from reducer
  const { data } = state.questionReducer;
  return { data };
};

const mapDispatchToProps = {
  submitQuestion
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuestion);
