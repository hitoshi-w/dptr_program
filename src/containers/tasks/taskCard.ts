import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import TaskCard from 'components/tasks/TaskCard';
import { openModal } from 'reducers/modalReducer';
import { openDialog } from 'reducers/dialogReducer';
import { Task } from 'reducers/taskReducer';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openModal: (task: Task) => dispatch(openModal(task)),
  openDialog: (task: Task) => dispatch(openDialog(task)),
});

export default connect(null, mapDispatchToProps)(TaskCard);
