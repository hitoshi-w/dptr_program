import { call, put, takeLatest } from 'redux-saga/effects';
import {
  TaskList,
  Task,
  TaskActions,
  readAll,
  createTask,
  putTask,
  deleteTask,
} from 'reducers/taskReducer';
import * as api from 'saga/api/task';

function* runReadAll(action: ReturnType<typeof readAll.request>) {
  const { currentUser, taskState } = action.payload;
  const data: TaskList[] = yield call(api.readAll, currentUser, taskState);
  yield put(readAll.success(data));
}

function* runCreateTask(action: ReturnType<typeof createTask.request>) {
  const { task, currentUser } = action.payload;
  const data: Task = yield call(api.createTask, currentUser, task);
  yield put(createTask.success(data));
}

function* runPutTask(action: ReturnType<typeof putTask.request>) {
  const { task, currentUser } = action.payload;
  const data: Task = yield call(api.putTask, currentUser, task);
  yield put(putTask.success(data));
}

function* runDeleteTask(action: ReturnType<typeof deleteTask.request>) {
  const { task, currentUser } = action.payload;
  const data: Task = yield call(api.deleteTask, currentUser, task);
  yield put(deleteTask.success(data));
}

function* watchProject() {
  yield takeLatest(TaskActions.READ_ALL_REQUEST, runReadAll);
  yield takeLatest(TaskActions.CREATE_TASK_REQUEST, runCreateTask);
  yield takeLatest(TaskActions.PUT_TASK_REQUEST, runPutTask);
  yield takeLatest(TaskActions.DELETE_TASK_REQUEST, runDeleteTask);
}

export default watchProject;
