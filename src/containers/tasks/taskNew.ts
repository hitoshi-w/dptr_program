import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import TaskNew, { TaskForm } from 'components/tasks/TaskNew';
import { createTask } from 'reducers/taskReducer';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createTask: (params: TaskForm) => dispatch(createTask.request(params)),
});

export default connect(null, mapDispatchToProps)(TaskNew);
