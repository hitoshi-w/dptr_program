import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { loggedOut, getUser } from 'reducers/userReducer';
import { RootState } from 'reducers/rootReducer';
import { createLoadingSelector } from 'reducers/loadingReducer';
import App from 'App';

const loadingSelector = createLoadingSelector(['GET_USER']);

const mapStateToProps = (state: RootState) => {
  return {
    currentUser: state.userReducer.user,
    isFetching: loadingSelector(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getUser: () => dispatch(getUser.request()),
  loggedOut: () => dispatch(loggedOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
