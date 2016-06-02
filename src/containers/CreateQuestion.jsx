import React from 'react';
import MuiComponent from '../components/MuiComponent';
import { connect } from 'react-redux';
import { submitQuestion } from '../actions/questions_action';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class CreateQuestion extends MuiComponent {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  componentDidMount() {
    this._editor = window.CKEDITOR.replace('new_question');
    window.CKEDITOR.instances.new_question.on('key', (e) => {
      Object.assign(this.props.data, {
        ['content']: e.editor.getData().trim()
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
        <TextField id="question_title" type="text"
          hintText="Your question title"
          floatingLabelText="Question Title"
          onChange={ this.handleFieldChange('title') }
        />
        <br />
        <TextField rows={ 5 } id="new_question" multiLine fullWidth
          onChange={ this.handleFieldChange('content') }
        />
        <br />
        <TextField id="question_tag" type="text"
          hintText="At least one, max 5 tags"
          floatingLabelText="Tag"
          onChange={ this.handleFieldChange('tag') }
        />
        <br />
        <RaisedButton type="submit" label="Create" primary />
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
