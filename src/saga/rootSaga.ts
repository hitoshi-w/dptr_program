import { all } from 'redux-saga/effects';
import watchTask from 'saga/taskSaga';

export default function* rootSaga() {
  yield all([watchTask()]);
}
