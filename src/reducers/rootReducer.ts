import { combineReducers } from 'redux';
import { authReducer } from 'reducers/authReducer';
import { taskReducer } from 'reducers/taskReducer';

export const rootReducer = combineReducers({ authReducer, taskReducer });

export type RootState = ReturnType<typeof rootReducer>;
