import { Task } from 'reducers/taskReducer';

export interface TaskEdit {
  isOpen: boolean;
  task: Task | null;
}

interface TaskEditState {
  taskEdit: TaskEdit;
}

const initTaskEdit: TaskEditState = {
  taskEdit: { isOpen: false, task: null },
};

//actions
export const TaskEditActions = {
  OPEN_TASK_EDIT: 'OPEN_TASK_EDIT',
  CLOSE_TASK_EDIT: 'CLOSE_TASK_EDIT',
} as const;

//action creators
export const openTaskEdit = (task: Task) => ({
  type: TaskEditActions.OPEN_TASK_EDIT as typeof TaskEditActions.OPEN_TASK_EDIT,
  payload: task,
});

export const closeTaskEdit = () => ({
  type: TaskEditActions.CLOSE_TASK_EDIT as typeof TaskEditActions.CLOSE_TASK_EDIT,
});

//action types
export type TaskEditActionTypes =
  | ReturnType<typeof openTaskEdit>
  | ReturnType<typeof closeTaskEdit>;

//reducer
export const taskEditReducer = (
  state = initTaskEdit,
  action: TaskEditActionTypes,
): TaskEditState => {
  switch (action.type) {
    case TaskEditActions.OPEN_TASK_EDIT:
      return { ...state, taskEdit: { isOpen: true, task: action.payload } };
    case TaskEditActions.CLOSE_TASK_EDIT:
      return { ...state, taskEdit: { isOpen: false, task: null } };
    default:
      return state;
  }
};
