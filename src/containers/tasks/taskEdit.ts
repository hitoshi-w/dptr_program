import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import TaskEdit, { TaskForm } from 'components/tasks/TaskEdit';
// import { createTask } from 'reducers/taskReducer';

// const mapDispatchToProps = (dispatch: Dispatch) => ({
//   createTask: (params: TaskForm) => dispatch(createTask.request(params)),
// });

export default connect()(TaskEdit);
