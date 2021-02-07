import axios from 'axios';

import * as actionTypes from './actionTypes';

// Set loading state
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

// If successful will provide data of the session
export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData,
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
export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    }
    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbMQaqD-UtnyytKMA-7c92OWOLTN81rTk', authData)
  };
};