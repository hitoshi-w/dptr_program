import { connect } from 'react-redux';

import TaskIndex from 'components/tasks/TaskIndex';
import { RootState } from 'reducers/rootReducer';

const mapStateToProps = (state: RootState) => ({
  tasks: state.taskReducer.tasks,
  currentUser: state.userReducer.user,
});

export default connect(mapStateToProps)(TaskIndex);
