import { TaskForm } from 'components/tasks/TaskNew';
import { User } from 'reducers/userReducer';

// export interface Task {
//   [key: string]: { title: string };
// }

// interface TaskState {
//   tasks: Task;
// }

// const initTask: TaskState = {
//   tasks: {},
// };

export interface Task {
  content: string;
  priority: string;
  staff: string;
}

export interface Project {
  taskStatus: string;
  tasks: Task[];
}

interface ProjectState {
  project: Project[];
}

const initProject: ProjectState = {
  project: [
    { taskStatus: '未着手', tasks: [] },
    { taskStatus: '途中', tasks: [] },
    { taskStatus: '完了', tasks: [] },
  ],
};

//actions
export const ProjectActions = {
  READ_PROJECT_REQUEST: 'READ_PROJECT_REQUEST',
  READ_PROJECT_SUCCESS: 'READ_PROJECT_SUCCESS',
  // READ_TASKS_REQUEST: 'READ_TASKS_REQUEST',
  // READ_TASKS_SUCCESS: 'READ_TASKS_SUCCESS',
  // CREATE_TASK_REQUEST: 'CREATE_TASK_REQUEST',
  // CREATE_TASK_SUCCESS: 'CREATE_TASK_SUCCESS',
} as const;

//action creators
export const readProject = {
  request: (currentUser: User) => ({
    type: ProjectActions.READ_PROJECT_REQUEST as typeof ProjectActions.READ_PROJECT_REQUEST,
    payload: currentUser,
  }),
  success: (result: Project[]) => ({
    type: ProjectActions.READ_PROJECT_SUCCESS as typeof ProjectActions.READ_PROJECT_SUCCESS,
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
  | ReturnType<typeof readProject.request>
  | ReturnType<typeof readProject.success>;
// | ReturnType<typeof readTasks.request>
// | ReturnType<typeof readTasks.success>
// | ReturnType<typeof createTask.request>
// | ReturnType<typeof createTask.success>;

//reducers
export const taskReducer = (
  state = initProject,
  action: TaskActionTypes,
): ProjectState => {
  switch (action.type) {
    case ProjectActions.READ_PROJECT_SUCCESS:
      return { ...state, project: action.payload };
    default:
      return state;
  }
};
