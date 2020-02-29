import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import TaskCard from 'components/tasks/TaskCard';
import { User } from 'reducers/userReducer';
import { deleteTask } from 'reducers/taskReducer';
import { openModal } from 'reducers/modalReducer';
import { RootState } from 'reducers/rootReducer';

const mapStateToProps = (state: RootState) => ({
  tasks: state.taskReducer.tasks,
  taskId: state.taskReducer.taskId,
  currentUser: state.userReducer.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  deleteTask: (currentUser: User, id: number) =>
    dispatch(deleteTask.request(currentUser, id)),
  openModal: (id: number) => dispatch(openModal(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskCard);
