import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import TaskEdit from 'components/tasks/TaskEdit';
import { RootState } from 'reducers/rootReducer';
import { User } from 'reducers/userReducer';
import { putTask, Task } from 'reducers/taskReducer';
import { closeTaskEdit } from 'reducers/taskEditReducer';

const mapStateToProps = (state: RootState) => ({
  taskEdit: state.taskEditReducer.taskEdit,
  currentUser: state.userReducer.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  putTask: (currentUser: User, task: Task) =>
    dispatch(putTask.request(currentUser, task)),
  closeModal: () => dispatch(closeTaskEdit()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskEdit);
