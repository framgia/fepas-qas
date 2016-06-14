import React from 'react';
import MuiComponent from '../components/MuiComponent';
import Loading from '../components/Loading';
import Question from '../components/Question';
// import Comment from '../components/Comment';
import { connect } from 'react-redux';
import { getQuestionById } from '../actions/questions_action';
import store from '../store';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

class QuestionPage extends MuiComponent {
  componentWillMount() {
    const { question } = this.props;
    const questionId = this.props.params.questionId;
    store.dispatch(getQuestionById(question, questionId));
  }

  render() {
    const { status, question } = this.props;
    let content;
    if (status) {
      content = (
        <Paper zDepth={2}>
          <Question question={question} uid={question.key} />
          <Divider />
          <Subheader>Comments:</Subheader>
        </Paper>
      );
    } else {
      content = (<Loading />);
    }
    return content;
  }
}

const mapStateToProps = (state) => {
  const question = state.questionReducer.data;
  const status = state.questionReducer.status;
  return { question, status };
};

export default connect(mapStateToProps)(QuestionPage);
