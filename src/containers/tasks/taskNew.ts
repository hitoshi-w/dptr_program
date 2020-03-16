import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import TaskNew from 'components/tasks/TaskNew';
import { User } from 'reducers/userReducer';
import { Task, createTask } from 'reducers/taskReducer';
import { RootState } from 'reducers/rootReducer';

const mapStateToProps = (state: RootState) => ({
  currentUser: state.userReducer.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createTask: (currentUser: User, task: Task) =>
    dispatch(createTask.request(currentUser, task)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskNew);
