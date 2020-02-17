import { TaskForm } from 'components/tasks/TaskNew';

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
  CREATE_TASK_REQUEST: 'CREATE_TASK_REQUEST',
  CREATE_TASK_SUCCESS: 'CREATE_TASK_SUCCESS',
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

export const createTask = {
  request: (params: TaskForm) => ({
    type: TaskActions.CREATE_TASK_REQUEST as typeof TaskActions.CREATE_TASK_REQUEST,
    payload: params,
  }),
  success: (result: TaskEntity) => ({
    type: TaskActions.CREATE_TASK_SUCCESS as typeof TaskActions.CREATE_TASK_SUCCESS,
    payload: result,
  }),
};

export type TaskActionTypes =
  | ReturnType<typeof readTasks.request>
  | ReturnType<typeof readTasks.success>
  | ReturnType<typeof createTask.request>
  | ReturnType<typeof createTask.success>;

//reducers
export const taskReducer = (
  state = initTask,
  action: TaskActionTypes,
): TaskState => {
  switch (action.type) {
    case TaskActions.CREATE_TASK_SUCCESS:
    case TaskActions.READ_TASKS_SUCCESS:
      return { ...state, tasks: action.payload };
    default:
      return state;
  }
};
