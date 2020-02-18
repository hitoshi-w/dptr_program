import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { loggedOut, loggedIn, User } from 'reducers/userReducer';
import { readProject } from 'reducers/taskReducer';
import { RootState } from 'reducers/rootReducer';
import App from 'App';

const mapStateToProps = (state: RootState) => ({
  currentUser: state.userReducer.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loggedOut: () => dispatch(loggedOut()),
  loggedIn: (data: User) => dispatch(loggedIn(data)),
  readProject: (currentUser: User) =>
    dispatch(readProject.request(currentUser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
