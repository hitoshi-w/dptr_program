import { User } from 'reducers/userReducer';
import _ from 'lodash';

export interface Task {
  content: string;
  priority: string;
  staff: string;
}

export interface TaskList {
  listId: number;
  taskStatus: string;
  tasks: Task[];
}

interface TaskState {
  taskLists: TaskList[];
}

const initTasks: TaskState = {
  taskLists: [
    {
      listId: 0,
      taskStatus: '着手',
      tasks: [],
    },
    {
      listId: 1,
      taskStatus: '途中',
      tasks: [],
    },
    {
      listId: 2,
      taskStatus: '完了',
      tasks: [],
    },
  ],
};

//actions
export const TaskActions = {
  READ_ALL_REQUEST: 'READ_ALL_REQUEST',
  READ_ALL_SUCCESS: 'READ_ALL_SUCCESS',
  CREATE_TASK_REQUEST: 'CREATE_TASK_REQUEST',
  CREATE_TASK_SUCCESS: 'CREATE_TASK_SUCCESS',
} as const;

//action creators
export const readAll = {
  request: (currentUser: User) => ({
    type: TaskActions.READ_ALL_REQUEST as typeof TaskActions.READ_ALL_REQUEST,
    payload: currentUser,
  }),
  success: (result: TaskList[]) => ({
    type: TaskActions.READ_ALL_SUCCESS as typeof TaskActions.READ_ALL_SUCCESS,
    payload: result,
  }),
};

const sortIndex = 0;
export const createTask = (currentUser: User, params: TaskList) => ({
  type: TaskActions.CREATE_TASK_REQUEST as typeof TaskActions.CREATE_TASK_SUCCESS,
  payload: params,
});
// export const createTask = {
//   request: (currentUser: User, params: TaskList) => ({
//     type: TaskActions.CREATE_TASK_REQUEST as typeof TaskActions.CREATE_TASK_REQUEST,
//     payload: { currentUser, params },
//   }),
//   success: (result: Tasks) => ({
//     type: TaskActions.CREATE_TASK_SUCCESS as typeof TaskActions.CREATE_TASK_SUCCESS,
//     payload: result,
//   }),
// };

export type TaskActionTypes =
  | ReturnType<typeof readAll.request>
  | ReturnType<typeof readAll.success>
  | ReturnType<typeof createTask>;
// | ReturnType<typeof createTask.request>
// | ReturnType<typeof createTask.success>;

//reducers
export const taskReducer = (
  state = initTasks,
  action: TaskActionTypes,
): TaskState => {
  switch (action.type) {
    case TaskActions.READ_ALL_SUCCESS:
      return { ...state, taskLists: action.payload };

    // const newTask = { sortIndex: action.payload };
    // sortIndex += 1;
    // const newState = Object.keys(state.taskLists).map(i => {
    //   if (action.payload.listId === state.taskLists[parseInt(i)].listId) {
    //     return {
    //       state.taskLists[parseInt(i)]
    //       // tasks: { ...state.taskLists[parseInt(i)].tasks, newTask },
    //     };
    //   } else {
    //     return state.taskLists[parseInt(i)];
    //   }
    // });

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
