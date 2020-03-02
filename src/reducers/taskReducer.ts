import { User } from 'reducers/userReducer';
import _ from 'lodash';

function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new Error(`Expected 'val' to be defined, but received ${val}`);
  }
}

export interface Task {
  id: string;
  statusId: number;
  content: string;
  priority: string;
  staff: string;
  sortIndex: number;
}

export interface TaskState {
  tasks: Task[];
}

const initTasks: TaskState = {
  tasks: [],
};

export interface TaskList {
  id: number;
  status: string;
  tasks: Task[];
}

export interface TaskListState {
  taskLists: TaskList[];
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
  PUT_TASKS_REQUEST: 'PUT_TASKS_REQUEST',
  PUT_TASKS_SUCCESS: 'PUT_TASKS_SUCCESS',
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
      id: string;
      statusId: number;
    },
  ) => ({
    type: TaskActions.DELETE_TASK_REQUEST as typeof TaskActions.DELETE_TASK_REQUEST,
    payload: { currentUser, params },
  }),
  success: (result: { id: string; statusId: number }) => ({
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

export const putTasks = {
  request: (currentUser: User, params: TaskList[]) => ({
    type: TaskActions.PUT_TASKS_REQUEST as typeof TaskActions.PUT_TASKS_REQUEST,
    payload: { currentUser, params },
  }),
  success: () => ({
    type: TaskActions.PUT_TASKS_SUCCESS as typeof TaskActions.PUT_TASKS_SUCCESS,
  }),
};

export const dragTask = (params: DragIds) => ({
  type: TaskActions.DRAG_TASK as typeof TaskActions.DRAG_TASK,
  payload: params,
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
  | ReturnType<typeof putTasks.request>
  | ReturnType<typeof putTasks.success>
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
      };
    case TaskActions.DRAG_TASK:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
      } = action.payload;

      if (droppableIdStart === droppableIdEnd) {
        //same list
        const taskList = state.taskLists.find(
          taskList => parseInt(droppableIdStart) === taskList.id,
        );
        assertIsDefined(taskList);
        const removed = taskList.tasks.splice(droppableIndexStart, 1);
        taskList.tasks.splice(droppableIndexEnd, 0, ...removed);
        taskList.tasks.map((task, index) => {
          task.sortIndex = index;
        });
      } else {
        //other list
        const taskListStart = state.taskLists.find(
          taskList => parseInt(droppableIdStart) === taskList.id,
        );
        assertIsDefined(taskListStart);
        const removed = taskListStart.tasks.splice(droppableIndexStart, 1);
        removed[0].statusId = parseInt(droppableIdEnd);

        const taskListEnd = state.taskLists.find(
          taskList => parseInt(droppableIdEnd) === taskList.id,
        );
        assertIsDefined(taskListEnd);

        taskListEnd.tasks.splice(droppableIndexEnd, 0, ...removed);
        taskListStart.tasks.map((task, index) => {
          task.sortIndex = index;
        });
        taskListEnd.tasks.map((task, index) => {
          task.sortIndex = index;
        });
      }
      return { ...state };
    default:
      return state;
  }
};
