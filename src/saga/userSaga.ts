import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { User, UserActions } from 'reducers/userReducer';
import * as api from 'saga/api/user';

function* runGoogleLogin() {
  // const data: User = yield call(api.googleLogin);
  // yield put(googleLogin.success(data));
}

function* watchUser() {
  // takeLatest(UserActions.GOOGLE_LOGIN_REQUEST, runGoogleLogin);
}
// export const watchUser = [takeLatest(UserActions.GET_USER_REQUEST, runGetUser)];

export default watchUser;
