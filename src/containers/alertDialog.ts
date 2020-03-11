import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import AlertDialog from 'components/layouts/AlertDialog';
import { RootState } from 'reducers/rootReducer';
import { User } from 'reducers/userReducer';
import { deleteTask, Task } from 'reducers/taskReducer';
import { closeDialog } from 'reducers/dialogReducer';

const mapStateToProps = (state: RootState) => ({
  currentUser: state.userReducer.user,
  isDialog: state.dialogReducer.alertDialog.isDialog,
  task: state.dialogReducer.alertDialog.task,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeDialog: () => dispatch(closeDialog()),
  deleteTask: (currentUser: User, task: Task) =>
    dispatch(deleteTask.request(currentUser, task)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertDialog);
