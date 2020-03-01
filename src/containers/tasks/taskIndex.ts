import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import TaskIndex from 'components/tasks/TaskIndex';
import { RootState } from 'reducers/rootReducer';
import { dragTask, DragIds } from 'reducers/taskReducer';

const mapStateToProps = (state: RootState) => ({
  taskLists: state.taskReducer.taskLists,
  currentUser: state.userReducer.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dragTask: (dragIds: DragIds) => dispatch(dragTask(dragIds)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskIndex);
