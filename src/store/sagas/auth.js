import { put, delay }  from 'redux-saga/effects';

import * as actions from '../actions/index';

// Turn function into Generator
// Executed incrementally -> wait for async code to finish (example)
export function* logoutSaga (action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(actions.logoutSucceed);
}

export function* checkAuthTimeoutSaga (action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}