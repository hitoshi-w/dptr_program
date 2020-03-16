import { combineReducers } from 'redux';
import { userReducer } from 'reducers/userReducer';
import { taskReducer } from 'reducers/taskReducer';
import { taskEditReducer } from 'reducers/taskEditReducer';
import { taskDeleteReducer } from 'reducers/taskDeleteReducer';

export const rootReducer = combineReducers({
  userReducer,
  taskReducer,
  taskEditReducer,
  taskDeleteReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
