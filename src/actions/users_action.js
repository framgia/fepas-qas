import C from '../constants';
import Firebase from 'firebase';

const userRef = new Firebase(C.FIREBASE_URI).child('users');

export const listenToProfile = () => {
  return (dispatch, getState) => {
    const state = getState();
    userRef.orderByChild('uid').equalTo(state.auth.uid).once('child_added').then((snap) => {
      console.log('listenToProfile', snap.val());
      return dispatch({
        type: C.PROFILE_RESPONSE_SUCCESS,
        data: snap.val()
      });
    }, (error) => {
      return dispatch({
        type: C.PROFILE_RESPONSE_FAILURE,
        error,
      });
    });
  };
};

export const submitProfile = (profile) => {
  return (dispatch, getState) => {
    const state = getState();
    dispatch({ type: C.PROFILE_DATA_SUBMITTING });
    userRef.orderByChild('uid').equalTo(state.auth.uid).once('child_added').then((snap) => {
      console.log('submitting now', snap, profile);
      userRef.child(snap.key()).set(profile).then((error) => {
        if (!error) {
          dispatch({ type: C.PROFILE_DATA_UPDATED });
        }
      });
    }, (error) => {
      return dispatch({
        type: C.PROFILE_RESPONSE_FAILURE,
        error,
      });
    });
  };
};
