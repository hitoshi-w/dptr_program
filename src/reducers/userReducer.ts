export type User = { id: string; name: string | null } | null;

interface UserState {
  user: User;
}

const initUser: UserState = {
  user: null,
};

//actions
export const UserActions = {
  LOGGEDIN: 'LOGGEDIN',
  LOGGEDOUT: 'LOGGEDOUT',
} as const;

//action creators
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
  | ReturnType<typeof loggedIn>
  | ReturnType<typeof loggedOut>;

//reducer
export const userReducer = (
  state = initUser,
  action: UserActionTypes,
): UserState => {
  switch (action.type) {
    case UserActions.LOGGEDIN:
      return { ...state, user: action.payload };
    case UserActions.LOGGEDOUT:
      return { ...state, user: null };
    default:
      return state;
  }
};
