import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import fb from 'config/fbConfig';

import Home from 'components/Home';
import { RootState } from 'reducers/rootReducer';

const mapStateToProps = (state: RootState) => ({
  currentUser: state.userReducer.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  googleLogin: async () => {
    const provider = new fb.auth.GoogleAuthProvider();
    await fb.auth().signInWithRedirect(provider);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
