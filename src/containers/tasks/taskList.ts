import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import _TaskList from 'components/tasks/TaskLists';
import { RootState } from 'reducers/rootReducer';
import { TaskList, createTask } from 'reducers/taskReducer';
import { User } from 'reducers/userReducer';

const mapStateToProps = (state: RootState) => ({
  currentUser: state.userReducer.user,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  // createTask: (currentUser: User, params: TaskList) =>
  //   dispatch(createTask.request(currentUser, params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(_TaskList);
