import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  Task,
  TaskState,
  TaskActions,
  readAll,
  createTask,
  deleteTask,
  putTask,
} from 'reducers/taskReducer';
import * as api from 'saga/api/task';

function* runReadAll(action: ReturnType<typeof readAll.request>) {
  const currentUser = action.payload;
  const data: TaskState = yield call(api.readAll, currentUser);
  yield put(readAll.success(data));
}

function* runCreateTask(action: ReturnType<typeof createTask.request>) {
  const { params, currentUser } = action.payload;
  const data: Task = yield call(api.createTask, currentUser, params);
  yield put(createTask.success(data));
}

function* runDeleteTask(action: ReturnType<typeof deleteTask.request>) {
  const { id, currentUser } = action.payload;
  const data: number = yield call(api.deleteTask, currentUser, id);
  yield put(deleteTask.success(data));
}

function* runPutTask(action: ReturnType<typeof putTask.request>) {
  const { params, currentUser } = action.payload;
  const data: Task = yield call(api.putTask, currentUser, params);
  yield put(putTask.success(data));
}

function* watchProject() {
  yield takeLatest(TaskActions.READ_ALL_REQUEST, runReadAll);
  yield takeLatest(TaskActions.CREATE_TASK_REQUEST, runCreateTask);
  yield takeLatest(TaskActions.DELETE_TASK_REQUEST, runDeleteTask);
  yield takeLatest(TaskActions.PUT_TASK_REQUEST, runPutTask);
}

export default watchProject;
