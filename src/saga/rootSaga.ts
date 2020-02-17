import { all } from 'redux-saga/effects';
import watchTask from 'saga/taskSaga';
import watchUser from 'saga/userSaga';

export default function* rootSaga() {
  yield all([watchTask(), watchUser()]);
}
