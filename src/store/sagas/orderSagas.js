import { put } from 'redux-saga/effects';

import axios from '../../axios-orders';
import * as actions from '../actions';

export function* purchaseBurgerSaga (action) {
    const { token, orderData } = action;
    yield put(actions.purchaseBurgerStart());

    try {
        const response = yield axios.post(`/orders.json?auth=${token}`, orderData);
        yield put(actions.purchaseBurgerSuccess(response.data.name, orderData));
    } catch (error) {
        yield put(actions.purchaseBurgerFail(error));
    }
}