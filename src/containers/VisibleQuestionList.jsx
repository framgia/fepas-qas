import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import MuiComponent from '../components/MuiComponent';
import Question from '../components/Question';
import Loading from '../components/Loading';
import { fetchQuestion } from '../actions/questions_action';
import store from '../store';
import lodash from 'lodash';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';

class VisibleQuestionList extends MuiComponent {
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
      content = (
        <div>
          <Subheader style={{ fontSize: '24px' }}>All Questions</Subheader>
          <Paper zDepth={2}>
            <Divider />
            <List>
              {lodash.map(questions, (question, id) =>
                [
                  <ListItem
                    disabled key={id} insetChildren
                    children={<Question key={id} question={question} uid={id} />}
                  />,
                  <Divider />
                ]
              )}
            </List>
          </Paper>
        </div>
      );
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
