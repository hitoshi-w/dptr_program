import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Navbar from 'components/layouts/Navbar';
import { loggedOut } from 'reducers/userReducer';
import { RootState } from 'reducers/rootReducer';

const mapStateToProps = (state: RootState) => ({
  currentUser: state.userReducer.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loggedOut: () => dispatch(loggedOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
