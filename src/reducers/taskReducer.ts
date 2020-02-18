import { User } from 'reducers/userReducer';

export interface Task {
  [index: number]: { content: string; priority: string; staff: string };
}

export interface Tasks {
  listId: number;
  taskStatus: string;
  tasks: Task;
}

export interface TaskLists {
  [id: number]: Tasks;
}

interface TasksState {
  taskLists: TaskLists;
}

const initTasks: TasksState = {
  taskLists: {
    0: { listId: 0, taskStatus: '未着手', tasks: {} },
    1: { listId: 1, taskStatus: '途中', tasks: {} },
    2: { listId: 2, taskStatus: '完了', tasks: {} },
  },
};

//actions
export const TaskActions = {
  READ_ALL_REQUEST: 'READ_ALL_REQUEST',
  READ_ALL_SUCCESS: 'READ_ALL_SUCCESS',
  CREATE_TASK_REQUEST: 'READ_TASK_REQUEST',
  CREATE_TASK_SUCCESS: 'CREATE_TASK_SUCCESS',
} as const;

//action creators
export const readAll = {
  request: (currentUser: User) => ({
    type: TaskActions.READ_ALL_REQUEST as typeof TaskActions.READ_ALL_REQUEST,
    payload: currentUser,
  }),
  success: (result: TaskLists) => ({
    type: TaskActions.READ_ALL_SUCCESS as typeof TaskActions.READ_ALL_SUCCESS,
    payload: result,
  }),
};

export const createTask = {
  request: (currentUser: User, params: Tasks) => ({
    type: TaskActions.CREATE_TASK_REQUEST as typeof TaskActions.CREATE_TASK_REQUEST,
    payload: { currentUser, params },
  }),
  success: (result: Tasks) => ({
    type: TaskActions.CREATE_TASK_SUCCESS as typeof TaskActions.CREATE_TASK_SUCCESS,
    payload: result,
  }),
};
// export const createTask = {
//   request: (params: TaskForm) => ({
//     type: TaskActions.CREATE_TASK_REQUEST as typeof TaskActions.CREATE_TASK_REQUEST,
//     payload: params,
//   }),
//   success: (result: Task) => ({
//     type: TaskActions.CREATE_TASK_SUCCESS as typeof TaskActions.CREATE_TASK_SUCCESS,
//     payload: result,
//   }),
// };

export type TaskActionTypes =
  | ReturnType<typeof readAll.request>
  | ReturnType<typeof readAll.success>
  | ReturnType<typeof createTask.request>
  | ReturnType<typeof createTask.success>;

//reducers
export const taskReducer = (
  state = initTasks,
  action: TaskActionTypes,
): TasksState => {
  switch (action.type) {
    case TaskActions.READ_ALL_SUCCESS:
      return { ...state, taskLists: action.payload };
    default:
      return state;
  }
};

// const newCard = {
//   id: `card-${cardID}`,
//   text: action.payload.text,
// };
// cardID += 1;
// const newState = state.map(ele => {
//   if(ele.id === action.payload.listID) {
//     return {
//       ...ele,
//       cards: [...ele.cards, newCard]
//     }
//   }else{
//     return ele;
//   }
// })
// return newState;
