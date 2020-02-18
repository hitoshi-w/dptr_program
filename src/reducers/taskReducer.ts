import { TaskForm } from 'components/tasks/TaskNew';
import { User } from 'reducers/userReducer';

export interface Task {
  content: string;
  priority: string;
  staff: string;
}

export interface Project {
  id: number;
  taskStatus: string;
  tasks: Task[];
}

interface ProjectState {
  project: Project[];
}

const initProject: ProjectState = {
  project: [
    { id: 0, taskStatus: '未着手', tasks: [] },
    { id: 1, taskStatus: '途中', tasks: [] },
    { id: 2, taskStatus: '完了', tasks: [] },
  ],
};

//actions
export const ProjectActions = {
  READ_PROJECT_REQUEST: 'READ_PROJECT_REQUEST',
  READ_PROJECT_SUCCESS: 'READ_PROJECT_SUCCESS',
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
// | ReturnType<typeof createTask.request>
// | ReturnType<typeof createTask.success>;

//reducers
export const taskReducer = (
  state = initProject,
  action: TaskActionTypes,
): ProjectState => {
  switch (action.type) {
    case ProjectActions.READ_PROJECT_SUCCESS:
      const sortedProject = action.payload.slice();
      sortedProject.sort((x, y) => (x.id > y.id ? 1 : -1));
      return { ...state, project: sortedProject };
    default:
      return state;
  }
};
