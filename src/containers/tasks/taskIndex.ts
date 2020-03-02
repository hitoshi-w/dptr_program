import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import TaskIndex from 'components/tasks/TaskIndex';
import { RootState } from 'reducers/rootReducer';
import { dragTask, DragIds, TaskList, putTasks } from 'reducers/taskReducer';
import { User } from 'reducers/userReducer';

const mapStateToProps = (state: RootState) => ({
  taskLists: state.taskReducer.taskLists,
  currentUser: state.userReducer.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dragTask: (dragIds: DragIds) => dispatch(dragTask(dragIds)),
  putTasks: (currentUser: User, taskLists: TaskList[]) =>
    dispatch(putTasks.request(currentUser, taskLists)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskIndex);
