import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { TaskState, TaskActions, readAll } from 'reducers/taskReducer';
import * as api from 'saga/api/task';

function* runReadAll(action: ReturnType<typeof readAll.request>) {
  const currentUser = action.payload;
  const data: TaskState = yield call(api.readAll, currentUser);
  yield put(readAll.success(data));
}

// function* runCreateTask(action: ReturnType<typeof createTask.request>) {
// const { params, currentUser } = action.payload;
// const data: Task = yield call(api.createTask, params, currentUser, sortIndex);
// yield put(readAll.success(data));
// sortIndex += 1;
// }

function* watchProject() {
  yield takeLatest(TaskActions.READ_ALL_REQUEST, runReadAll);
  // yield takeLatest(TaskActions.CREATE_TASK_REQUEST, runCreateTask);
}

export default watchProject;
