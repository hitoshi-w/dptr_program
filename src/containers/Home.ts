import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import fb from 'config/fbConfig';

import Home from 'components/Home';
import { getUser } from 'reducers/userReducer';
import { RootState } from 'reducers/rootReducer';
// import { createLoadingSelector } from 'reducers/loadingReducer';

// const loadingSelector = createLoadingSelector(['GET_USER']);

const mapStateToProps = (state: RootState) => ({
  currentUser: state.userReducer.user,
  // isFetching: loadingSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getUser: () => dispatch(getUser.request()),
  googleLogin: async () => {
    const provider = new fb.auth.GoogleAuthProvider();
    await fb.auth().signInWithRedirect(provider);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
