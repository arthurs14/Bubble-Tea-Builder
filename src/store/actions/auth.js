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

export const logout = () => {
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT,
  };
};

export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

// Check auth timeout
export const checkAuthTimeout = (expirationTime) => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime: expirationTime,
  };
};

// Log user in if user exists
export const auth = (email, password, isSignup) => {
  return {
    type: actionTypes.AUTH_USER,
    email: email,
    password: password,
    isSignup: isSignup,
  }
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATE,
  };
};