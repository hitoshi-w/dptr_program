import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import TaskList from 'components/tasks/TaskList';
import { RootState } from 'reducers/rootReducer';
import { Tasks, createTask } from 'reducers/taskReducer';
import { User } from 'reducers/userReducer';

const mapStateToProps = (state: RootState) => ({
  currentUser: state.userReducer.user,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  createTask: (currentUser: User, params: Tasks) =>
    dispatch(createTask.request(currentUser, params)),
});

export default connect(mapStateToProps)(TaskList);
