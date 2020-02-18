import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { Project, ProjectActions, readProject } from 'reducers/taskReducer';
import * as api from 'saga/api/task';

function* runReadProject(action: ReturnType<typeof readProject.request>) {
  const currentUser = action.payload;
  const data: Project[] = yield call(api.readProject, currentUser);
  yield put(readProject.success(data));
}

function* watchProject() {
  yield takeLatest(ProjectActions.READ_PROJECT_REQUEST, runReadProject);
}

export default watchProject;
