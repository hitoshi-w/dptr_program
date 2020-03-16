import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import App from 'App';
import { loggedIn, loggedOut, CurrentUser } from 'reducers/userReducer';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loggedIn: (currentUser: CurrentUser) => dispatch(loggedIn(currentUser)),
  loggedOut: () => dispatch(loggedOut()),
});

export default connect(null, mapDispatchToProps)(App);
