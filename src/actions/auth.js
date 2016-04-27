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
    fireRef.onAuth((authData) => {
      if (authData && authData.google) {
        dispatch({ type: C.AUTH_LOGOUT });
        fireRef.unauth();
      }
      browserHistory.push('/');
    });
  };
};

export const authWithGoogle = () => {
  const _authDispatch = (dispatch) => {
    return new Promise((resolve, reject) => {
      fireRef.authWithOAuthPopup('google', (error, authData) => {
        if (error) {
          dispatch({ type: C.FEEDBACK_DISPLAY_ERROR, error: `Login failed! ${error}` });
          dispatch({ type: C.AUTH_LOGOUT });
          reject(error);
        } else {
          console.log('Authenticated successfully with payload:', authData);
          dispatch({
            type: C.AUTH_LOGIN,
            uid: authData.uid,
            username: authData.google.displayName,
            profileImageUrl: authData.google.profileImageURL
          });
          browserHistory.push('/');
          console.log('Resolving...');
          resolve(authData);
        }
      });
    });
  };

  const _syncProfile = (authData) => {
    console.log('_syncUser', authData);
    return new Promise((resolve) => {
      console.log('Promise');
      fireRef.child('profiles').equalTo(authData.uid).once('value').then((snap) => {
        console.log(snap.val());
        if (!snap.exists()) {
          console.log('Pushing...');
          const profileInfo = authData[authData.provider].cachedUserProfile;
          const profile = {
            uid: authData.uid,
            firstName: profileInfo.family_name,
            lastName: profileInfo.given_name,
            gender: profileInfo.gender,
            displayName: authData[authData.provider].displayName
          };
          fireRef.child('profiles').push(profile).then(console.log);
          resolve();
        }
      });
    });
  };

  return (dispatch) => {
    _authDispatch(dispatch).then((authData) => {
      _syncProfile(authData);
    }, console.log);
  };
};
