import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { UserEntity, UserActions, getUser } from 'reducers/userReducer';
import * as api from 'saga/api/user';

function* runGetUser() {
  const data: UserEntity = yield call(api.getUser);
  yield put(getUser.success(data));
}

export const watchUser = [takeLatest(UserActions.GET_USER_REQUEST, runGetUser)];
