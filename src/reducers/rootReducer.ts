import { combineReducers } from 'redux';
import { userReducer } from 'reducers/userReducer';
import { taskReducer } from 'reducers/taskReducer';
import { modalReducer } from './modalReducer';
// import { loadingReducer } from 'reducers/loadingReducer';

export const rootReducer = combineReducers({
  userReducer,
  taskReducer,
  modalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
