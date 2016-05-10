import React, { Component } from 'react';
import C from '../constants';
import Firebase from 'firebase';
import { connect } from 'react-redux';
import store from '../store';

const fireRef = new Firebase(C.FIREBASE_URI);

class Votes extends Component {
  componentWillMount() {
    // Dispatch a load data action
    // NOTE: Do not use this.props.listenToProfile here
    // since it is only assigned once an action was dispatched
    store.dispatch(this.getCurrentUserVote());
  }

  getCurrentUserVote() {
    return (dispatch, getState) => {
      const state = getState();
      const id = state.auth.uid;
      const fireRefVote = fireRef.child('votes');
      const fireRefQues = fireRef.child('questions');
      fireRefVote.orderByChild('user_id').equalTo(id).on('value', (snaps) => {
        const votes = [];
        snaps.forEach((snap) => {
          const vote = snap.val();
          fireRefQues.orderByChild('id').equalTo(vote.qid).once('child_added').then((qSnap) => {
            vote.questionTitle = qSnap.val().title;
            votes.push(vote);
            return dispatch({
              type: C.VOTES_GET,
              data: votes
            });
          });
        });
      });
    };
  }

  render() {
    const votes = this.props.votes;
    let content;
    if (votes.status) {
      const voteView = votes.data.map((vote) => {
        return (
          <tr>
            <td> {vote.questionTitle} </td>
            <td key={vote.id}> {vote.flag} </td>
          </tr>
        );
      });
      content = (
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Question title</th>
              <th>Vote</th>
            </tr>
          </thead>
          <tbody>
            { voteView }
          </tbody>
        </table>
      );
    } else {
      content = (
        <p>No vote</p>
      );
    }
    return content;
  }
}

const mapStateToProps = (state) => {
  const votes = state.vote;
  return {
    votes
  };
};

export default connect(mapStateToProps)(Votes);
