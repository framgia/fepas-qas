import React, { Component } from 'react';
import C from '../constants';
import Firebase from 'firebase';
import { connect } from 'react-redux';
import store from '../store';

const fireRef = new Firebase(C.FIREBASE_URI);

class Comments extends Component {
  componentWillMount() {
    // Dispatch a load data action
    // NOTE: Do not use this.props.listenToProfile here
    // since it is only assigned once an action was dispatched
    store.dispatch(this.getCurrentUserComment());
  }

  getCurrentUserComment() {
    return (dispatch, getState) => {
      const state = getState();
      const id = state.auth.uid;
      const fireRefQues = fireRef.child('questions');
      const fireRefComment = fireRef.child('comments');
      fireRefComment.orderByChild('uid').equalTo(id).on('value', (snaps) => {
        const comments = [];
        snaps.forEach((snap) => {
          const comment = snap.val();
          fireRefQues.orderByChild('id').equalTo(comment.qid).once('child_added').then((qSnap) => {
            comment.questionTitle = qSnap.val().title;
            comments.push(comment);
            return dispatch({
              type: C.COMMENTS_GET,
              data: comments
            });
          });
        });
      });
    };
  }

  render() {
    const comments = this.props.comments;
    let content;
    if (comments.status) {
      const commentView = comments.data.map((comment) => {
        return (
          <tr>
            <td> {comment.questionTitle} </td>
            <td key={comment.id}> {comment.content} </td>
          </tr>
        );
      });
      content = (
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Question title</th>
              <th>Answer</th>
            </tr>
          </thead>
          <tbody>
            { commentView }
          </tbody>
        </table>
      );
    } else {
      content = (
        <p>No comment</p>
      );
    }
    return content;
  }
}

const mapStateToProps = (state) => {
  const comments = state.comment;
  return {
    comments
  };
};

export default connect(mapStateToProps)(Comments);
