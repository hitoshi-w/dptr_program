import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import TaskEdit from 'components/tasks/TaskEdit';
import { RootState } from 'reducers/rootReducer';
import { User } from 'reducers/userReducer';
import { putTask, Task } from 'reducers/taskReducer';

function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    return;
  }
}

const mapStateToProps = (state: RootState) => {
  const task = state.taskReducer.tasks.find(
    task => task.id === state.modalReducer.modal.taskId,
  );
  assertIsDefined(task);
  return {
    currentUser: state.userReducer.user,
    task,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  putTask: (currentUser: User, params: Task) =>
    dispatch(putTask.request(currentUser, params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskEdit);
