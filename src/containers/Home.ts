import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import fb from 'config/fbConfig';
// import { googleLogin } from 'reducers/authReducer';
import Home from 'components/Home';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  googleLogin: async () => {
    const provider = new fb.auth.GoogleAuthProvider();
    await fb.auth().signInWithRedirect(provider);
  },
});

export default connect(null, mapDispatchToProps)(Home);
