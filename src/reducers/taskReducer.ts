import { User } from 'reducers/userReducer';

export interface Task {
  id: number;
  statusId: number;
  content: string;
  priority: string;
  staff: string;
}

export interface TaskState {
  tasks: Task[];
  taskId: number;
}

const initTasks: TaskState = {
  tasks: [],
  taskId: 0,
};

//actions
export const TaskActions = {
  READ_ALL_REQUEST: 'READ_ALL_REQUEST',
  READ_ALL_SUCCESS: 'READ_ALL_SUCCESS',
  CREATE_TASK_REQUEST: 'CREATE_TASK_REQUEST',
  CREATE_TASK_SUCCESS: 'CREATE_TASK_SUCCESS',
  DELETE_TASK_REQUEST: 'DELETE_TASK_REQUEST',
  DELETE_TASK_SUCCESS: 'DELETE_TASK_SUCCESS',
} as const;

//action creators
export const readAll = {
  request: (currentUser: User) => ({
    type: TaskActions.READ_ALL_REQUEST as typeof TaskActions.READ_ALL_REQUEST,
    payload: currentUser,
  }),
  success: (result: TaskState) => ({
    type: TaskActions.READ_ALL_SUCCESS as typeof TaskActions.READ_ALL_SUCCESS,
    payload: result,
  }),
};

export const createTask = {
  request: (currentUser: User, params: Task) => ({
    type: TaskActions.CREATE_TASK_REQUEST as typeof TaskActions.CREATE_TASK_REQUEST,
    payload: { currentUser, params },
  }),
  success: (result: Task) => ({
    type: TaskActions.CREATE_TASK_SUCCESS as typeof TaskActions.CREATE_TASK_SUCCESS,
    payload: result,
  }),
};

export const deleteTask = {
  request: (currentUser: User, id: number) => ({
    type: TaskActions.DELETE_TASK_REQUEST as typeof TaskActions.DELETE_TASK_REQUEST,
    payload: { currentUser, id },
  }),
  success: (result: number) => ({
    type: TaskActions.DELETE_TASK_SUCCESS as typeof TaskActions.DELETE_TASK_SUCCESS,
    payload: result,
  }),
};

export type TaskActionTypes =
  | ReturnType<typeof readAll.request>
  | ReturnType<typeof readAll.success>
  | ReturnType<typeof createTask.request>
  | ReturnType<typeof createTask.success>
  | ReturnType<typeof deleteTask.request>
  | ReturnType<typeof deleteTask.success>;

//reducers
export const taskReducer = (
  state = initTasks,
  action: TaskActionTypes,
): TaskState => {
  switch (action.type) {
    case TaskActions.READ_ALL_SUCCESS:
      return {
        ...state,
        tasks: action.payload.tasks,
        taskId: action.payload.taskId,
      };
    case TaskActions.CREATE_TASK_SUCCESS:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        taskId: action.payload.id + 1,
      };
    case TaskActions.DELETE_TASK_SUCCESS:
      return {
        tasks: state.tasks.filter(task => task.id !== action.payload),
        taskId: state.taskId,
      };
    default:
      return state;
  }
};
