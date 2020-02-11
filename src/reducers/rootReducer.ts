import { combineReducers } from 'redux';
import { authReducer } from 'reducers/authReducer';
import { taskReducer } from 'reducers/taskReducer';
import { loadingReducer } from 'reducers/loadingReducer';

export const rootReducer = combineReducers({
  authReducer,
  taskReducer,
  loadingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
