import { connect } from 'react-redux';
import fb from 'config/fbConfig';

import Home from 'components/Home';
import { RootState } from 'reducers/rootReducer';

const mapStateToProps = (state: RootState) => ({
  currentUser: state.authReducer.user,
});

const mapDispatchToProps = () => ({
  googleLogin: async () => {
    const provider = new fb.auth.GoogleAuthProvider();
    await fb.auth().signInWithRedirect(provider);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
