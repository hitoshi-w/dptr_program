import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import TaskEdit from 'components/tasks/TaskEdit';
import { RootState } from 'reducers/rootReducer';
import { User } from 'reducers/userReducer';
import { putTask, Task } from 'reducers/taskReducer';
import { closeModal } from 'reducers/modalReducer';

const mapStateToProps = (state: RootState) => ({
  currentUser: state.userReducer.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  putTask: (currentUser: User, params: Task) =>
    dispatch(putTask.request(currentUser, params)),
  closeModal: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskEdit);
