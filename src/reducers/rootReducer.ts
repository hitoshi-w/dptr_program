import { combineReducers } from 'redux';
import { userReducer } from 'reducers/userReducer';
import { taskReducer } from 'reducers/taskReducer';
import { modalReducer } from './modalReducer';
import { dialogReducer } from 'reducers/dialogReducer';

export const rootReducer = combineReducers({
  userReducer,
  taskReducer,
  modalReducer,
  dialogReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
