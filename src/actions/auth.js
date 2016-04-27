import C from '../constants';
import Firebase from 'firebase';
import { browserHistory } from 'react-router';

const fireRef = new Firebase(C.FIREBASE_URI);

export const listenToAuth = () => {
  return (dispatch, getState) => {
    fireRef.onAuth((authData) => {
      if (authData && authData.google) {
        dispatch({
          type: C.AUTH_LOGIN,
          uid: authData.uid,
          username: authData.google.displayName,
          profileImageUrl: authData.google.profileImageURL
        });
      } else {
        if (getState().auth.status !== C.AUTH_ANONYMOUS) {
          dispatch({ type: C.AUTH_LOGOUT });
        }
      }
    });
  };
};

export const openAuth = () => {
  return (dispatch) => {
    dispatch({ type: C.AUTH_OPEN });
    fireRef.authAnonymously((error) => {
      console.log('Authenticating...');
      if (error) {
        dispatch({ type: C.FEEDBACK_DISPLAY_ERROR, error: `Login failed! ${error}` });
        dispatch({ type: C.AUTH_LOGOUT });
      }
    });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({ type: C.AUTH_LOGOUT });
    fireRef.unauth();
  };
};

export const authWithGoogle = () => {
  return (dispatch) => {
    fireRef.authWithOAuthPopup('google', (error, authData) => {
      if (error) {
        dispatch({ type: C.FEEDBACK_DISPLAY_ERROR, error: `Login failed! ${error}` });
        dispatch({ type: C.AUTH_LOGOUT });
      } else {
        console.log('Authenticated successfully with payload:', authData);
        dispatch({
          type: C.AUTH_LOGIN,
          uid: authData.uid,
          username: authData.google.displayName,
          profileImageUrl: authData.google.profileImageURL
        });
        browserHistory.push('/');
      }
    });
  };
};
