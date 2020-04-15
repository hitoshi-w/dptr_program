import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import TaskIndex from 'components/tasks/TaskIndex';
import { User } from 'reducers/userReducer';
import {
  readAll,
  DragIds,
  dragTask,
  searchTask,
  Task,
} from 'reducers/taskReducer';
import { RootState } from 'reducers/rootReducer';

const mapStateToProps = (state: RootState) => {
  const taskLists = state.taskReducer.taskLists;
  return {
    currentUser: state.userReducer.user,
    taskSearch: state.taskReducer.taskSearch,
    isDragged: state.taskReducer.isDragged,
    taskLists,
    tasks: [
      ...taskLists[0].tasks,
      ...taskLists[1].tasks,
      ...taskLists[2].tasks,
    ],
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  readAll: (
    currentUser: User,
    taskState: { tasks: Task[]; isDragged: boolean },
  ) => dispatch(readAll.request(currentUser, taskState)),
  dragTask: (dragIds: DragIds) => dispatch(dragTask(dragIds)),
  searchTask: (searchValue: string) => dispatch(searchTask(searchValue)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskIndex);
