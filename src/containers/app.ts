import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { loggedIn, User } from 'reducers/userReducer';
import { readAll } from 'reducers/taskReducer';
import { RootState } from 'reducers/rootReducer';
import App from 'App';

const mapStateToProps = (state: RootState) => ({
  currentUser: state.userReducer.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loggedIn: (data: User) => dispatch(loggedIn(data)),
  readAll: (currentUser: User) => dispatch(readAll.request(currentUser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
