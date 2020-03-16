import { connect } from 'react-redux';
import fb from 'config/fbConfig';

import Navbar from 'components/layouts/Navbar';
import { RootState } from 'reducers/rootReducer';

const mapStateToProps = (state: RootState) => ({
  currentUser: state.userReducer.user,
});

const mapDispatchToProps = () => ({
  googleLogOut: async () => {
    await fb.auth().signOut();
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
