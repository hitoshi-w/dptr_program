import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { TaskEntity, TaskActions, readTasks } from 'reducers/taskReducer';
import * as api from 'saga/api/task';

function* runReadTasks() {
  const data: TaskEntity = yield call(api.readTasks);
  yield put(readTasks.success(data));
}

export const watchTask = [
  takeLatest(TaskActions.READ_TASKS_REQUEST, runReadTasks),
];
