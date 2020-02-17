import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { User, UserActions, getUser } from 'reducers/userReducer';
import * as api from 'saga/api/user';

function* runGetUser() {
  const data: User = yield call(api.getUser);
  yield put(getUser.success(data));
}

function* watchUser() {
  takeLatest(UserActions.GET_USER_REQUEST, runGetUser);
}
// export const watchUser = [takeLatest(UserActions.GET_USER_REQUEST, runGetUser)];

export default watchUser;
