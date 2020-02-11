import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { loggedOut } from 'reducers/userReducer';
import Navbar from 'components/layouts/Navbar';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loggedOut: () => dispatch(loggedOut()),
});

export default connect(null, mapDispatchToProps)(Navbar);
