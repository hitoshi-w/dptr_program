import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import TaskDelete from 'components/tasks/TaskDelete';
import { RootState } from 'reducers/rootReducer';
import { User } from 'reducers/userReducer';
import { deleteTask, Task } from 'reducers/taskReducer';
import { closeTaskDelete } from 'reducers/taskDeleteReducer';

const mapStateToProps = (state: RootState) => ({
  currentUser: state.userReducer.user,
  taskDelete: state.taskDeleteReducer.taskDelete,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeTaskDelete: () => dispatch(closeTaskDelete()),
  deleteTask: (currentUser: User, task: Task) =>
    dispatch(deleteTask.request(currentUser, task)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskDelete);
