import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { loggedOut, loggedIn, UserEntity } from 'reducers/userReducer';
import { RootState } from 'reducers/rootReducer';
import App from 'App';

const mapStateToProps = (state: RootState) => ({
  currentUser: state.userReducer.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loggedOut: () => dispatch(loggedOut()),
  loggedIn: (data: UserEntity) => dispatch(loggedIn(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
