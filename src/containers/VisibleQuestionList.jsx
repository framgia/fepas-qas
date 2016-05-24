import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
import Question from '../components/Question';
import Loading from '../components/Loading';
import { fetchQuestion } from '../actions/questions_action';
import store from '../store';
import lodash from 'lodash';

class VisibleQuestionList extends Component {
  componentWillMount() {
    const { questions } = this.props;
    const questionId = this.props.params.questionId;
    const tag = this.props.location.query.tag;
    store.dispatch(fetchQuestion(questions, questionId, tag));
  }

  render() {
    const { status, questions } = this.props;
    let content;
    if (status) {
      content = (<ul>
        {lodash.map(questions, (question, id) =>
          <Question key={id} question={question} uid={id} />
        )}
      </ul>);
    } else {
      content = (<Loading />);
    }
    return content;
  }
}

VisibleQuestionList.propTypes = {
  questions: PropTypes.object,
  status: PropTypes.bool
};

VisibleQuestionList.contextTypes = {
  router: PropTypes.object
};

const mapStateToProps = (state) => {
  const { questions, status } = state.questionReducer;
  return { questions, status };
};

export default connect(mapStateToProps)(VisibleQuestionList);
