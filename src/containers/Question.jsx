import React, { Component } from 'react';
import C from '../constants';
import Firebase from 'firebase';
import store from '../store';
import { connect } from 'react-redux';
import CommentForm from '../components/CommentForm';
import { upVoteQuestion, downVoteQuestion } from '../actions/vote_question_action';

const fireRef = new Firebase(C.FIREBASE_URI);

class Question extends Component {
  constructor() {
    super();
    this.handleVoteUp = this.handleVoteUp.bind(this);
    this.handleVoteDown = this.handleVoteDown.bind(this);
  }

  componentWillMount() {
    const questionId = this.props.params.questionId;
    store.dispatch(this.getQuestionById(questionId));
  }

  getQuestionById(id) {
    return (dispatch) => {
      const fireRefQuestion = fireRef.child('questions');
      const fireRefComment = fireRef.child('comments');
      fireRefQuestion.orderByChild('id').equalTo(id).once('child_added').then((snap) => {
        const question = snap.val();
        question.comments = [];
        fireRefComment.orderByChild('qid').equalTo(id).on('child_added', (snapshot) => {
          question.comments.push(snapshot.val());
        });
        return dispatch({
          type: C.QUESTION_DETAIL_GET,
          data: question
        });
      });
    };
  }

  handleVoteUp(e) {
    e.preventDefault();
    this.props.upVoteQuestion(this.props.data.id);
  }

  handleVoteDown(e) {
    e.preventDefault();
    this.props.downVoteQuestion(this.props.data.id);
  }

  render() {
    const question = this.props.question;
    let content;
    if (question.status) {
      const commentView = question.data.comments.reverse().map((comment) => {
        return (
          <li key={comment.id}>{comment.content}</li>
        );
      });
      content = (
        <div>
          <p>Title: {question.data.title}</p>
          <p>Content: {question.data.content}</p>
          <p>Votes count: {question.data.vote_count}</p>
          <div className="col-md-12">
            <form className="col-md-1" onSubmit={ this.handleVoteUp }>
              <input className="btn btn-success btn-sm" type="submit" value="Vote Up" />
            </form>
            <form className="col-md-1" onSubmit={ this.handleVoteDown }>
              <input className="btn btn-success btn-sm" type="submit" value="Vote down" />
            </form>
          </div><br />
          <p>Tags: {question.data.tags}</p>
          <ul>Comments: {commentView}</ul>
          <CommentForm qid={question.data.uid} />
        </div>
      );
    } else {
      content = (
        <CommentForm />
      );
    }
    return content;
  }
}

const mapStateToProps = (state) => {
  // Extract neccesary properties from reducer
  const { data, hasReceiveData, isSubmitting } = state.question;
  return {
    question: state.question,
    data,
    hasReceiveData,
    isSubmitting
  };
};

const mapDispatchToProps = {
  downVoteQuestion, upVoteQuestion
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
