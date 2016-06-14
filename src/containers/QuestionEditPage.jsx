import React from 'react';
import MuiComponent from '../components/MuiComponent';
import { connect } from 'react-redux';
import store from '../store';
import QuestionForm from '../components/QuestionForm';
import Loading from '../components/Loading';
import { getQuestionById, updateQuestion } from '../actions/questions_action';

class QuestionEditPage extends MuiComponent {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  componentWillMount() {
    const { question } = this.props;
    const questionId = this.props.params.questionId;
    store.dispatch(getQuestionById(question, questionId));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.convertTags();
    this.props.updateQuestion(this.props.params.questionId, this.props.data);
  }

  convertTags() {
    const tags = [];
    if (this.props.data.tag && typeof(this.props.data.tag) === 'string') {
      this.props.data.tag.split(',').forEach((tag) => {
        tags.push(tag.trim());
      });
      this.props.data.tag = tags;
    }
  }

  handleFieldChange(field) {
    return (e, value = '') => {
      Object.assign(this.props.data, {
        [field]: value || e.target.value.trim()
      });
    };
  }

  render() {
    const { status, data } = this.props;
    let content;
    if (status) {
      content = (<QuestionForm
        question={ data }
        handleSubmit={ this.handleSubmit }
        handleFieldChange={ this.handleFieldChange }
      />);
    } else {
      content = (<Loading />);
    }
    return content;
  }
}

const mapStateToProps = (state) => {
  const data = state.questionReducer.data;
  const status = state.questionReducer.status;
  return { data, status };
};

const mapDispatchToProps = {
  updateQuestion
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionEditPage);
