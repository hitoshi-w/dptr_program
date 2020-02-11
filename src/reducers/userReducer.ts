import { RootState } from 'reducers/rootReducer';

export interface UserEntity {
  [key: string]: { name: string };
}

interface UserState {
  user: UserEntity | null;
}

const initUser: UserState = {
  user: null,
};

//actions
export const UserActions = {
  GET_USER_REQUEST: 'GET_USER_REQUEST',
  GET_USER_SUCCESS: 'GET_USER_SUCCESS',
  // LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
} as const;

//action creators
export const getUser = {
  request: () => ({
    type: UserActions.GET_USER_REQUEST as typeof UserActions.GET_USER_REQUEST,
  }),
  success: (result: UserEntity) => ({
    type: UserActions.GET_USER_SUCCESS as typeof UserActions.GET_USER_SUCCESS,
    payload: result,
  }),
};

// export const loggedIn = (user: UserEntity) => ({
//   type: UserActions.LOGIN_SUCCESS as typeof UserActions.LOGIN_SUCCESS,
//   payload: user,
// });

export const loggedOut = () => {
  return {
    type: UserActions.LOGOUT as typeof UserActions.LOGOUT,
    payload: null,
  };
};

//action types
export type AuthActionTypes =
  | ReturnType<typeof getUser.request>
  | ReturnType<typeof getUser.success>
  // | ReturnType<typeof loggedIn>
  | ReturnType<typeof loggedOut>;

//reducer
export const userReducer = (
  state = initUser,
  action: AuthActionTypes,
): UserState => {
  switch (action.type) {
    case UserActions.GET_USER_SUCCESS:
      return { ...state, user: action.payload };
    case UserActions.LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
};
