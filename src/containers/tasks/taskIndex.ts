import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import TaskIndex from 'components/tasks/TaskIndex';
import { User } from 'reducers/userReducer';
import {
  TaskListState,
  readAll,
  DragIds,
  dragTask,
  searchTask,
} from 'reducers/taskReducer';
import { RootState } from 'reducers/rootReducer';

const mapStateToProps = (state: RootState) => ({
  currentUser: state.userReducer.user,
  taskListState: state.taskReducer,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  readAll: (currentUser: User, taskListState: TaskListState) =>
    dispatch(readAll.request(currentUser, taskListState)),
  dragTask: (dragIds: DragIds) => dispatch(dragTask(dragIds)),
  searchTask: (searchValue: string) => dispatch(searchTask(searchValue)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskIndex);
