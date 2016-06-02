import React from 'react';
import MuiComponent from './MuiComponent';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import TextEditor from './TextEditor';

class QuestionForm extends MuiComponent {
  render() {
    const { question, action, handleFieldChange, handleSubmit } = this.props;
    return (
      <form onSubmit={ handleSubmit }>
        <TextField id="question_title" type="text"
          hintText="Your question title"
          floatingLabelText="Question Title"
          onChange={ handleFieldChange('title') }
          defaultValue={ question.title }
        />
        <br />
        <TextEditor id="question_content"
          hint="Question Content"
          onChange={ handleFieldChange('content') }
          defaultValue = { question.content }
        />
        <br />
        <TextField id="question_tag" type="text"
          hintText="At least one, max 5 tags"
          floatingLabelText="Tag"
          onChange={ handleFieldChange('tag') }
          defaultValue ={ question.tag }
        />
        <br />
        <RaisedButton type="submit" label={ action.label } primary />
      </form>
    );
  }
}
QuestionForm.defaultProps = {
  question: {
    title: '',
    content: '',
    tag: ''
  },
  action: {
    label: 'Create'
  }
};

export default QuestionForm;
