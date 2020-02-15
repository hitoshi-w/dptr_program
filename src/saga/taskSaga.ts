import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  TaskEntity,
  TaskActions,
  readTasks,
  createTask,
} from 'reducers/taskReducer';
import * as api from 'saga/api/task';

function* runReadTasks() {
  const data: TaskEntity = yield call(api.readTasks);
  yield put(readTasks.success(data));
}

function* runCreateTask(action: ReturnType<typeof createTask.request>) {
  const data: TaskEntity = yield call(api.createTask, action.payload);
  yield put(createTask.success(data));
}

function* watchTask() {
  yield takeLatest(TaskActions.READ_TASKS_REQUEST, runReadTasks);
  yield takeLatest(TaskActions.CREATE_TASK_REQUEST, runCreateTask);
}

export default watchTask;
// export const watchTask = [
//   takeLatest(TaskActions.READ_TASKS_REQUEST, runReadTasks),
//   takeLatest(TaskActions.CREATE_TASK_REQUEST, runCreateTask),
// ];
