import axios from 'axios';

import * as actionTypes from './actionTypes';

// Set loading state
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

// If successful will provide data of the session
export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

// If any issues return the error
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

// Log user in if user exists
export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbMQaqD-UtnyytKMA-7c92OWOLTN81rTk';

    if (!isSignup) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAbMQaqD-UtnyytKMA-7c92OWOLTN81rTk';
    }

    axios.post(url, authData)
    .then(response => {
      console.log(response);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
    })
    .catch(err => {
      dispatch(authFail(err.response.data.error));
    })
  };
};