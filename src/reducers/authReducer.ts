import { RootState } from 'reducers/rootReducer';

interface AuthState {
  auth: any;
  isLoggedIn: boolean | null;
}
const initAuth: AuthState = {
  auth: null,
  isLoggedIn: null,
};

//actions
export const AuthActions = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGOUT: 'LOGOUT',
} as const;

//action creators
export const login = {
  start: () => ({
    type: AuthActions.LOGIN_START as typeof AuthActions.LOGIN_START,
  }),
  success: (auth: AuthState) => ({
    type: AuthActions.LOGIN_SUCCESS as typeof AuthActions.LOGIN_SUCCESS,
    payload: auth,
  }),
  error: () => ({
    type: AuthActions.LOGIN_ERROR as typeof AuthActions.LOGIN_ERROR,
  }),
};

export const logout = () => {
  return {
    type: AuthActions.LOGOUT as typeof AuthActions.LOGOUT,
    payload: null,
  };
};

export type AuthActionTypes =
  | ReturnType<typeof login.start>
  | ReturnType<typeof login.success>
  | ReturnType<typeof login.error>
  | ReturnType<typeof logout>;

export const authReducer = (
  state = initAuth,
  action: AuthActionTypes,
): AuthState => {
  switch (action.type) {
    case AuthActions.LOGIN_SUCCESS:
      return { ...state, auth: action.payload };
    default:
      return state;
  }
};
