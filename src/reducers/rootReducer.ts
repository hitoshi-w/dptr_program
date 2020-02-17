import { combineReducers } from 'redux';
import { userReducer } from 'reducers/userReducer';
import { taskReducer } from 'reducers/taskReducer';
// import { loadingReducer } from 'reducers/loadingReducer';

export const rootReducer = combineReducers({
  userReducer,
  taskReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
