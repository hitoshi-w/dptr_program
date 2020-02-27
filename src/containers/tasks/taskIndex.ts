import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import TaskIndex from 'components/tasks/TaskIndex';
import { RootState } from 'reducers/rootReducer';
import { User } from 'reducers/userReducer';

const mapStateToProps = (state: RootState) => ({
  tasks: state.taskReducer.tasks,
  currentUser: state.userReducer.user,
});

// const mapDispatchToProps = (dispatch: Dispatch) => ({
//   readProject: (currentUser: User) =>
//     dispatch(readProject.request(currentUser)),
// });

export default connect(mapStateToProps)(TaskIndex);
