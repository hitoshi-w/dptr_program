import { Dispatch } from 'redux';
import { db } from 'index';
import { RootState } from 'reducers/rootReducer';

export interface TaskEntity {
  [key: string]: { title: string };
}

interface TaskState {
  tasks: TaskEntity;
}

const initTask: TaskState = {
  tasks: {},
};
//actions
export const TaskActions = {
  READ_TASKS_REQUEST: 'READ_TASKS_REQUEST',
  READ_TASKS_SUCCESS: 'READ_TASKS_SUCCESS',
} as const;

//action creators
export const readTasks = {
  request: () => ({
    type: TaskActions.READ_TASKS_REQUEST as typeof TaskActions.READ_TASKS_REQUEST,
  }),
  success: (result: TaskEntity) => ({
    type: TaskActions.READ_TASKS_SUCCESS as typeof TaskActions.READ_TASKS_SUCCESS,
    payload: result,
  }),
};

export type TaskActionTypes =
  | ReturnType<typeof readTasks.request>
  | ReturnType<typeof readTasks.success>;

//reducers
export const taskReducer = (
  state = initTask,
  action: TaskActionTypes,
): TaskState => {
  switch (action.type) {
    case TaskActions.READ_TASKS_SUCCESS:
      return { ...state, tasks: action.payload };
    default:
      return state;
  }
};
