import { User } from 'reducers/userReducer';

export interface TaskForm {
  content: string;
  priority: string;
  staff: string;
}

export interface Task {
  id: string;
  statusId: number;
  content: string;
  priority: number;
  staff: string;
  sortIndex: number;
}

export interface TaskList {
  id: number;
  status: string;
  tasks: Task[];
}

export interface TaskListState {
  taskLists: TaskList[];
  taskSearch: TaskList[];
  isDragged: boolean;
}

const initTaskLists = [
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
];

export const initTaskListState: TaskListState = {
  taskLists: initTaskLists,
  taskSearch: initTaskLists,
  isDragged: false,
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
  PUT_TASK_REQUEST: 'PUT_TASK_REQUEST',
  PUT_TASK_SUCCESS: 'PUT_TASK_SUCCESS',
  DELETE_TASK_REQUEST: 'DELETE_TASK_REQUEST',
  DELETE_TASK_SUCCESS: 'DELETE_TASK_SUCCESS',
  DRAG_TASK: 'DRAG_TASK',
  SEARCH_TASK: 'SEARCH_TASK',
} as const;

//action creators
export const readAll = {
  request: (
    currentUser: User,
    taskState: { tasks: Task[]; isDragged: boolean },
  ) => ({
    type: TaskActions.READ_ALL_REQUEST as typeof TaskActions.READ_ALL_REQUEST,
    payload: { currentUser, taskState },
  }),
  success: (taskLists: TaskList[]) => ({
    type: TaskActions.READ_ALL_SUCCESS as typeof TaskActions.READ_ALL_SUCCESS,
    payload: taskLists,
  }),
};

export const createTask = {
  request: (currentUser: User, task: Task) => ({
    type: TaskActions.CREATE_TASK_REQUEST as typeof TaskActions.CREATE_TASK_REQUEST,
    payload: { currentUser, task },
  }),
  success: (task: Task) => ({
    type: TaskActions.CREATE_TASK_SUCCESS as typeof TaskActions.CREATE_TASK_SUCCESS,
    payload: task,
  }),
};

export const putTask = {
  request: (currentUser: User, task: Task) => ({
    type: TaskActions.PUT_TASK_REQUEST as typeof TaskActions.PUT_TASK_REQUEST,
    payload: { currentUser, task },
  }),
  success: (task: Task) => ({
    type: TaskActions.PUT_TASK_SUCCESS as typeof TaskActions.PUT_TASK_SUCCESS,
    payload: task,
  }),
};

export const deleteTask = {
  request: (currentUser: User, task: Task) => ({
    type: TaskActions.DELETE_TASK_REQUEST as typeof TaskActions.DELETE_TASK_REQUEST,
    payload: { currentUser, task },
  }),
  success: (task: Task) => ({
    type: TaskActions.DELETE_TASK_SUCCESS as typeof TaskActions.DELETE_TASK_SUCCESS,
    payload: task,
  }),
};

export const dragTask = (dragIds: DragIds) => ({
  type: TaskActions.DRAG_TASK as typeof TaskActions.DRAG_TASK,
  payload: dragIds,
});

export const searchTask = (searchValue: string) => ({
  type: TaskActions.SEARCH_TASK as typeof TaskActions.SEARCH_TASK,
  payload: searchValue,
});

export type TaskActionTypes =
  | ReturnType<typeof readAll.request>
  | ReturnType<typeof readAll.success>
  | ReturnType<typeof createTask.request>
  | ReturnType<typeof createTask.success>
  | ReturnType<typeof putTask.request>
  | ReturnType<typeof putTask.success>
  | ReturnType<typeof deleteTask.request>
  | ReturnType<typeof deleteTask.success>
  | ReturnType<typeof dragTask>
  | ReturnType<typeof searchTask>;

//reducers
export const taskReducer = (
  state = initTaskListState,
  action: TaskActionTypes,
): TaskListState => {
  switch (action.type) {
    case TaskActions.READ_ALL_SUCCESS:
      return {
        ...state,
        taskLists: action.payload,
        isDragged: false,
      };
    case TaskActions.CREATE_TASK_SUCCESS:
      return {
        ...state,
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
    case TaskActions.PUT_TASK_SUCCESS:
      return {
        ...state,
        taskLists: state.taskLists.map(taskList => {
          if (taskList.id === action.payload.statusId) {
            return {
              ...taskList,
              tasks: taskList.tasks.map(task => {
                if (task.id === action.payload.id) {
                  return { ...action.payload };
                } else {
                  return { ...task };
                }
              }),
            };
          } else {
            return taskList;
          }
        }),
      };
    case TaskActions.DELETE_TASK_SUCCESS:
      return {
        ...state,
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
    case TaskActions.DRAG_TASK:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
      } = action.payload;

      if (droppableIdStart === droppableIdEnd) {
        //same list
        const tasks = state.taskLists[parseInt(droppableIdStart)].tasks.slice();
        const removed = tasks.splice(droppableIndexStart, 1);
        tasks.splice(droppableIndexEnd, 0, ...removed);

        return {
          ...state,
          taskLists: state.taskLists.map(taskList => {
            if (parseInt(droppableIdStart) === taskList.id) {
              return {
                ...taskList,
                tasks: tasks.map((task, index) => ({
                  ...task,
                  sortIndex: index,
                })),
              };
            } else {
              return taskList;
            }
          }),
          isDragged: true,
        };
      } else {
        //other list
        const draggedTasks = state.taskLists[
          parseInt(droppableIdStart)
        ].tasks.slice();
        const droppedTasks = state.taskLists[
          parseInt(droppableIdEnd)
        ].tasks.slice();
        const removed = draggedTasks.splice(droppableIndexStart, 1)[0];
        droppedTasks.splice(droppableIndexEnd, 0, {
          ...removed,
          statusId: parseInt(droppableIdEnd),
        });
        return {
          ...state,
          taskLists: state.taskLists.map(taskList => {
            if (parseInt(droppableIdStart) === taskList.id) {
              return {
                ...taskList,
                tasks: draggedTasks.map((task, index) => ({
                  ...task,
                  sortIndex: index,
                })),
              };
            } else if (parseInt(droppableIdEnd) === taskList.id) {
              return {
                ...taskList,
                tasks: droppedTasks.map((task, index) => ({
                  ...task,
                  sortIndex: index,
                })),
              };
            } else {
              return taskList;
            }
          }),
          isDragged: true,
        };
      }
    case TaskActions.SEARCH_TASK:
      return {
        ...state,
        taskSearch: state.taskLists.map(taskList => {
          return {
            ...taskList,
            tasks: taskList.tasks.filter(
              task =>
                task.staff.includes(action.payload) ||
                task.content.includes(action.payload),
            ),
          };
        }),
      };
    default:
      return state;
  }
};
