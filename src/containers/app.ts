import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import fb from 'config/fbConfig';

import { loggedIn, loggedOut } from 'reducers/authReducer';
import { RootState } from 'reducers/rootReducer';
import App from 'App';

const mapStateToProps = (state: RootState) => ({
  currentUser: state.authReducer.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loggedIn: (user: fb.User | null) => dispatch(loggedIn(user)),
  loggedOut: () => dispatch(loggedOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
