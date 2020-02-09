import { RootState } from 'reducers/rootReducer';
import fb from 'config/fbConfig';

interface AuthState {
  user: fb.User | null;
}
const initAuth: AuthState = {
  user: null,
};

//actions
export const AuthActions = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
} as const;

//action creators
export const loggedIn = (user: fb.User | null) => ({
  type: AuthActions.LOGIN_SUCCESS as typeof AuthActions.LOGIN_SUCCESS,
  payload: user,
});

export const loggedOut = () => {
  return {
    type: AuthActions.LOGOUT as typeof AuthActions.LOGOUT,
    payload: null,
  };
};

//action types
export type AuthActionTypes =
  | ReturnType<typeof loggedIn>
  | ReturnType<typeof loggedOut>;

//reducer
export const authReducer = (
  state = initAuth,
  action: AuthActionTypes,
): AuthState => {
  switch (action.type) {
    case AuthActions.LOGIN_SUCCESS:
      return { ...state, user: action.payload };
    case AuthActions.LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
};
