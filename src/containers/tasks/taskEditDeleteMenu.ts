import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import TaskEditDeleteMenu from 'components/tasks/TaskEditDeleteMenu';
import { openTaskEdit } from 'reducers/taskEditReducer';
import { openTaskDelete } from 'reducers/taskDeleteReducer';
import { Task } from 'reducers/taskReducer';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openTaskEdit: (task: Task) => dispatch(openTaskEdit(task)),
  openTaskDelete: (task: Task) => dispatch(openTaskDelete(task)),
});

export default connect(null, mapDispatchToProps)(TaskEditDeleteMenu);
