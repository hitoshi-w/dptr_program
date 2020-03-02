import { call, put, takeLatest } from 'redux-saga/effects';
import {
  Task,
  TaskListState,
  TaskActions,
  readAll,
  createTask,
  deleteTask,
  putTask,
  putTasks,
} from 'reducers/taskReducer';
import * as api from 'saga/api/task';

function* runReadAll(action: ReturnType<typeof readAll.request>) {
  const currentUser = action.payload;
  const data: TaskListState = yield call(api.readAll, currentUser);
  yield put(readAll.success(data));
}

function* runCreateTask(action: ReturnType<typeof createTask.request>) {
  const { params, currentUser } = action.payload;
  const data: Task = yield call(api.createTask, currentUser, params);
  yield put(createTask.success(data));
}

function* runDeleteTask(action: ReturnType<typeof deleteTask.request>) {
  const { params, currentUser } = action.payload;
  const data: {
    id: string;
    statusId: number;
  } = yield call(api.deleteTask, currentUser, params);
  yield put(deleteTask.success(data));
}

function* runPutTask(action: ReturnType<typeof putTask.request>) {
  const { params, currentUser } = action.payload;
  const data: Task = yield call(api.putTask, currentUser, params);
  yield put(putTask.success(data));
}

function* runPutTasks(action: ReturnType<typeof putTasks.request>) {
  const { params, currentUser } = action.payload;
  yield call(api.putTasks, currentUser, params);
  yield put(putTasks.success());
}

function* watchProject() {
  yield takeLatest(TaskActions.READ_ALL_REQUEST, runReadAll);
  yield takeLatest(TaskActions.CREATE_TASK_REQUEST, runCreateTask);
  yield takeLatest(TaskActions.DELETE_TASK_REQUEST, runDeleteTask);
  yield takeLatest(TaskActions.PUT_TASK_REQUEST, runPutTask);
  yield takeLatest(TaskActions.PUT_TASKS_REQUEST, runPutTasks);
}

export default watchProject;
