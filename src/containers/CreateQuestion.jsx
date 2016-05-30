import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitQuestion } from '../actions/questions_action';
import InputField from '../components/InputField';
import InputTextField from '../components/InputTextField';

class CreateQuestion extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  componentDidMount() {
    this._editor = window.CKEDITOR.replace('new_question');
    window.CKEDITOR.instances.new_answer.on('contentDom', (e) => {
      window.CKEDITOR.instances.new_answer.document.on('keyup', () => {
        Object.assign(this.props.data, {
          ['content']: e.editor.getData().trim()
        });
      });
    });
  }

  componentWillUnmount() {
    this._editor.destroy();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.convertTags();
    this.props.submitQuestion(this.props.data);
  }

  handleFieldChange(field) {
    return (e) => {
      Object.assign(this.props.data, {
        [field]: e.target.value.trim()
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
      <form onSubmit={ this.handleSubmit }>
        Question Title:
        <InputField type={ 'text' } placeholder={' Your question title'}
          handleChange={ this.handleFieldChange('title') }
        />
        <br />
        Question Content:
        <InputTextField rows={ '5' } cols={ '60' } id= { 'new_question' }
          handleChange={ this.handleFieldChange('content') }
          placeholder={ 'Question content'}
        />
        <br />
        Tags:
        <InputField type={ 'text' } placeholder={' At least one, max 5 tags'}
          handleChange={ this.handleFieldChange('tag') }
        />
        <br />
        <input type="submit" value="Create" />
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  // Extract neccesary properties from reducer
  const { data, hasReceiveData, isSubmitting } = state.questionReducer;
  return {
    data,
    hasReceiveData,
    isSubmitting
  };
};

const mapDispatchToProps = {
  submitQuestion
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuestion);
