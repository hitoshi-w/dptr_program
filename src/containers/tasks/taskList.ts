import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import TaskList from 'components/tasks/TaskList';
import { User } from 'reducers/userReducer';
import { Task, createTask } from 'reducers/taskReducer';
import { RootState } from 'reducers/rootReducer';

const mapStateToProps = (state: RootState) => ({
  tasks: state.taskReducer.tasks,
  taskId: state.taskReducer.taskId,
  currentUser: state.userReducer.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createTask: (currentUser: User, params: Task) =>
    dispatch(createTask.request(currentUser, params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
