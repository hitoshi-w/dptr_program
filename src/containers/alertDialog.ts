import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import AlertDialog from 'components/layouts/AlertDialog';
import { RootState } from 'reducers/rootReducer';
import { User } from 'reducers/userReducer';
import { deleteTask, Task } from 'reducers/taskReducer';
import { closeDialog } from 'reducers/dialogReducer';

function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    return;
  }
}

const mapStateToProps = (state: RootState) => {
  const tasks: Task[] = [];
  state.taskReducer.taskLists.forEach(taskList => {
    taskList.tasks.forEach(task => {
      tasks.push(task);
    });
  });

  const task = tasks.find(
    task => task.id === state.dialogReducer.alertDialog.taskId,
  );
  assertIsDefined(task);
  return {
    currentUser: state.userReducer.user,
    isDialog: state.dialogReducer.alertDialog.isDialog,
    task,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeDialog: () => dispatch(closeDialog()),
  deleteTask: (
    currentUser: User,
    params: {
      id: string;
      statusId: number;
    },
  ) => dispatch(deleteTask.request(currentUser, params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertDialog);
