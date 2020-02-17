import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { loggedOut, loggedIn, User } from 'reducers/userReducer';
import { RootState } from 'reducers/rootReducer';
import App from 'App';

const mapStateToProps = (state: RootState) => ({
  currentUser: state.userReducer.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loggedOut: () => dispatch(loggedOut()),
  loggedIn: (data: User) => dispatch(loggedIn(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
