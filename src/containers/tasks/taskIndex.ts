import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import TaskIndex from 'components/tasks/TaskIndex';
import { RootState } from 'reducers/rootReducer';
// import { readProject } from 'reducers/taskReducer';
import { User } from 'reducers/userReducer';

const mapStateToProps = (state: RootState) => ({
  project: state.taskReducer.project,
  currentUser: state.userReducer.user,
});

// const mapDispatchToProps = (dispatch: Dispatch) => ({
//   readProject: (currentUser: User) =>
//     dispatch(readProject.request(currentUser)),
// });

export default connect(mapStateToProps)(TaskIndex);
