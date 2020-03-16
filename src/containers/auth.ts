import { connect } from 'react-redux';
import Auth from 'components/Auth';
import { RootState } from 'reducers/rootReducer';

const mapStateToProps = (state: RootState) => ({
  currentUser: state.userReducer.user,
});

export default connect(mapStateToProps)(Auth);
