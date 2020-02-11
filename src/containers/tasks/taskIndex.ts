import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import TaskIndex from 'components/tasks/TaskIndex';
import { RootState } from 'reducers/rootReducer';
import { readTasks } from 'reducers/taskReducer';

const mapStateToProps = (state: RootState) => ({
  tasks: state.taskReducer.tasks,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  readTasks: () => dispatch(readTasks.request()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskIndex);
