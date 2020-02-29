import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import TaskEdit from 'components/tasks/TaskEdit';
import { RootState } from 'reducers/rootReducer';

const mapStateToPropss = (state: RootState) => {
  const task = state.taskReducer.tasks.find(
    task => task.id === state.modalReducer.modal.taskId,
  );
  return {
    content: task?.content,
    priority: task?.priority,
    staff: task?.staff,
  };
};

// const mapDispatchToProps = (dispatch: Dispatch) => ({
//   createTask: (params: TaskForm) => dispatch(createTask.request(params)),
// });

export default connect(mapStateToPropss)(TaskEdit);
