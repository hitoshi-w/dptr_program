import { User } from 'reducers/userReducer';
import _ from 'lodash';

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

export interface TaskList {
  id: number;
  status: string;
  tasks: Task[];
}

export interface TaskListState {
  taskLists: TaskList[];
  taskId: number;
}

export const initTaskList: TaskListState = {
  taskLists: [
    {
      status: '着手',
      id: 0,
      tasks: [],
    },
    {
      status: '途中',
      id: 1,
      tasks: [],
    },
    {
      status: '完了',
      id: 2,
      tasks: [],
    },
  ],
  taskId: 0,
};

export interface DragIds {
  droppableIdStart: string;
  droppableIdEnd: string;
  droppableIndexStart: number;
  droppableIndexEnd: number;
  draggableId: string;
}

//actions
export const TaskActions = {
  READ_ALL_REQUEST: 'READ_ALL_REQUEST',
  READ_ALL_SUCCESS: 'READ_ALL_SUCCESS',
  CREATE_TASK_REQUEST: 'CREATE_TASK_REQUEST',
  CREATE_TASK_SUCCESS: 'CREATE_TASK_SUCCESS',
  DELETE_TASK_REQUEST: 'DELETE_TASK_REQUEST',
  DELETE_TASK_SUCCESS: 'DELETE_TASK_SUCCESS',
  PUT_TASK_REQUEST: 'PUT_TASK_REQUEST',
  PUT_TASK_SUCCESS: 'PUT_TASK_SUCCESS',
  DRAG_TASK: 'DRAG_TASK',
} as const;

//action creators
export const readAll = {
  request: (currentUser: User) => ({
    type: TaskActions.READ_ALL_REQUEST as typeof TaskActions.READ_ALL_REQUEST,
    payload: currentUser,
  }),
  success: (result: TaskListState) => ({
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
  request: (
    currentUser: User,
    params: {
      id: number;
      statusId: number;
    },
  ) => ({
    type: TaskActions.DELETE_TASK_REQUEST as typeof TaskActions.DELETE_TASK_REQUEST,
    payload: { currentUser, params },
  }),
  success: (result: { id: number; statusId: number }) => ({
    type: TaskActions.DELETE_TASK_SUCCESS as typeof TaskActions.DELETE_TASK_SUCCESS,
    payload: result,
  }),
};

export const putTask = {
  request: (currentUser: User, params: Task) => ({
    type: TaskActions.PUT_TASK_REQUEST as typeof TaskActions.PUT_TASK_REQUEST,
    payload: { currentUser, params },
  }),
  success: (result: Task) => ({
    type: TaskActions.PUT_TASK_SUCCESS as typeof TaskActions.PUT_TASK_SUCCESS,
    payload: result,
  }),
};

export const dragTask = (dragIds: DragIds) => ({
  type: TaskActions.DRAG_TASK as typeof TaskActions.DRAG_TASK,
  payload: dragIds,
});

export type TaskActionTypes =
  | ReturnType<typeof readAll.request>
  | ReturnType<typeof readAll.success>
  | ReturnType<typeof createTask.request>
  | ReturnType<typeof createTask.success>
  | ReturnType<typeof deleteTask.request>
  | ReturnType<typeof deleteTask.success>
  | ReturnType<typeof putTask.request>
  | ReturnType<typeof putTask.success>
  | ReturnType<typeof dragTask>;

//reducers
export const taskReducer = (
  state = initTaskList,
  action: TaskActionTypes,
): TaskListState => {
  switch (action.type) {
    case TaskActions.READ_ALL_SUCCESS:
      return {
        ...state,
        taskLists: action.payload.taskLists,
        taskId: action.payload.taskId,
      };
    case TaskActions.CREATE_TASK_SUCCESS:
      return {
        taskLists: state.taskLists.map(taskList => {
          if (taskList.id === action.payload.statusId) {
            return {
              ...taskList,
              tasks: [...taskList.tasks, action.payload],
            };
          } else {
            return taskList;
          }
        }),
        taskId: action.payload.id + 1,
      };
    case TaskActions.DELETE_TASK_SUCCESS:
      return {
        taskLists: state.taskLists.map(taskList => {
          if (taskList.id === action.payload.statusId) {
            return {
              ...taskList,
              tasks: taskList.tasks.filter(
                task => task.id !== action.payload.id,
              ),
            };
          } else {
            return taskList;
          }
        }),
        taskId: state.taskId,
      };
    case TaskActions.PUT_TASK_SUCCESS:
      return {
        taskLists: state.taskLists.map(taskList => {
          if (taskList.id === action.payload.statusId) {
            const target = _.mapKeys(taskList.tasks, 'id')[action.payload.id];
            target.content = action.payload.content;
            target.priority = action.payload.priority;
            target.staff = action.payload.staff;
            return {
              ...taskList,
              tasks: [...taskList.tasks],
            };
          } else {
            return taskList;
          }
        }),
        taskId: state.taskId,
      };
    // case TaskActions.DRAG_TASK:
    //   const {
    //     droppableIdStart,
    //     droppableIdEnd,
    //     droppableIndexEnd,
    //     droppableIndexStart,
    //   } = action.payload;

    //   if (droppableIdStart === droppableIdEnd) {
    //     //same list
    //     const tasks = state.tasks.filter(
    //       task => task.statusId === parseInt(droppableIdStart),
    //     );
    //     const [removed] = tasks.splice(droppableIndexStart, 1);
    //     tasks.splice(droppableIndexEnd, 0, removed);
    //     console.log(state);
    //     return {
    //       ...state,
    //       tasks: state.tasks,
    //       taskId: state.taskId,
    //     };
    //   } else {
    //     //other list
    //     const listStart = state.tasks.filter(
    //       task => task.statusId === parseInt(droppableIdStart),
    //     );
    //     const [removed] = listStart.splice(droppableIndexStart, 1);
    //     const tasks = state.tasks.filter(
    //       task => parseInt(droppableIdEnd) === task.statusId,
    //     );
    //     tasks.splice(droppableIndexEnd, 0, removed);
    //     return { tasks, taskId: state.taskId };
    //   }
    default:
      return state;
  }
};
