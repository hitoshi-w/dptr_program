import { TaskActionTypes } from 'reducers/taskReducer';
import { RootState } from 'reducers/rootReducer';
import _ from 'lodash';

type actionsType = TaskActionTypes;

interface LoadingState {
  [key: string]: boolean;
}

export const loadingReducer = (
  state = {},
  action: actionsType,
): LoadingState => {
  const { type } = action;
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

  if (!matches) return state;

  const [, requestName, requestState] = matches;

  return {
    ...state,
    [requestName]: requestState === 'REQUEST',
  };
};

export const createLoadingSelector = (actions: string[]) => (
  state: RootState,
) => {
  return _(actions).some(action => _.get(state.loadingReducer, `${action}`));
};
