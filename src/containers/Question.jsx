import React, { Component } from 'react';
import C from '../constants';
import Firebase from 'firebase';
import store from '../store';
import { connect } from 'react-redux';

const fireRef = new Firebase(C.FIREBASE_URI).child('questions');

class Question extends Component {
  componentWillMount() {
    const questionId = this.props.params.questionId;
    store.dispatch(this.getQuestionById(questionId));
  }

  getQuestionById(id) {
    return (dispatch) => {
      fireRef.orderByChild('uid').equalTo(id).once('child_added').then((snap) => {
        const question = snap.val();
        return dispatch({
          type: C.QUESTION_DETAIL_GET,
          data: question
        });
      });
    };
  }

  render() {
    const question = this.props.question;
    let content;
    if (question.status) {
      content = (
        <div>
          <p>Title: {question.data.title}</p>
          <p>Content: {question.data.content}</p>
          <p>Tags: {question.data.tags}</p>
        </div>
      );
    } else {
      content = (
        <p></p>
      );
    }
    return content;
  }
}

const mapStateToProps = (state) => {
  return {
    question: state.question,
  };
};

export default connect(mapStateToProps)(Question);
