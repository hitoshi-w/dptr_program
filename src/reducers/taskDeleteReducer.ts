import { Task } from 'reducers/taskReducer';

export interface TaskDelete {
  isOpen: boolean;
  task: Task | null;
}

interface TaskDeleteState {
  taskDelete: TaskDelete;
}

const initTaskDelete: TaskDeleteState = {
  taskDelete: { isOpen: false, task: null },
};

//actions
export const TaskDeleteActions = {
  OPEN_TASK_DELETE: 'OPEN_TASK_DELETE',
  CLOSE_TASK_DELETE: 'CLOSE_TASK_DELETE',
} as const;

//action creators
export const openTaskDelete = (task: Task) => ({
  type: TaskDeleteActions.OPEN_TASK_DELETE as typeof TaskDeleteActions.OPEN_TASK_DELETE,
  payload: task,
});

export const closeTaskDelete = () => ({
  type: TaskDeleteActions.CLOSE_TASK_DELETE as typeof TaskDeleteActions.CLOSE_TASK_DELETE,
});

//action types
export type TaskDeleteActionTypes =
  | ReturnType<typeof openTaskDelete>
  | ReturnType<typeof closeTaskDelete>;

//reducer
export const taskDeleteReducer = (
  state = initTaskDelete,
  action: TaskDeleteActionTypes,
): TaskDeleteState => {
  switch (action.type) {
    case TaskDeleteActions.OPEN_TASK_DELETE:
      return { taskDelete: { isOpen: true, task: action.payload } };
    case TaskDeleteActions.CLOSE_TASK_DELETE:
      return { taskDelete: { isOpen: false, task: null } };
    default:
      return state;
  }
};
