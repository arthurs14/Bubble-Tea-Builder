import { put }  from 'redux-saga/effects';

import * as actionTypes from '../actions';

// Turn function into Generator
// Executed incrementally -> wait for async code to finish (example)
function* logout (action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put({
        type: actionTypes.AUTH_LOGOUT,
    });
}