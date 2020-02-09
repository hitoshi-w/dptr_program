import { connect } from 'react-redux';

import { RootState } from 'reducers/rootReducer';
import Auth from 'components/Auth';

const mapStateToProps = (state: RootState) => ({
  currentUser: state.authReducer.user,
});

export default connect(mapStateToProps)(Auth);
