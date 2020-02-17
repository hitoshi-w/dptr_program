import { RootState } from 'reducers/rootReducer';

export type User = { id: string; name: string | null } | null;

interface UserState {
  user: User;
}

const initUser: UserState = {
  user: null,
};

//actions
export const UserActions = {
  GET_USER_REQUEST: 'GET_USER_REQUEST',
  GET_USER_SUCCESS: 'GET_USER_SUCCESS',
  LOGGEDIN: 'LOGGEDIN',
  LOGGEDOUT: 'LOGGEDOUT',
} as const;

//action creators
export const getUser = {
  request: () => ({
    type: UserActions.GET_USER_REQUEST as typeof UserActions.GET_USER_REQUEST,
  }),
  success: (result: User) => ({
    type: UserActions.GET_USER_SUCCESS as typeof UserActions.GET_USER_SUCCESS,
    payload: result,
  }),
};

export const loggedIn = (currentUser: User) => ({
  type: UserActions.LOGGEDIN as typeof UserActions.LOGGEDIN,
  payload: currentUser,
});

export const loggedOut = () => {
  return {
    type: UserActions.LOGGEDOUT as typeof UserActions.LOGGEDOUT,
    payload: null,
  };
};

//action types
export type UserActionTypes =
  | ReturnType<typeof getUser.request>
  | ReturnType<typeof getUser.success>
  | ReturnType<typeof loggedIn>
  | ReturnType<typeof loggedOut>;

//reducer
export const userReducer = (
  state = initUser,
  action: UserActionTypes,
): UserState => {
  switch (action.type) {
    case UserActions.LOGGEDIN:
    case UserActions.GET_USER_SUCCESS:
      return { ...state, user: action.payload };
    case UserActions.LOGGEDOUT:
      return { ...state, user: null };
    default:
      return state;
  }
};
