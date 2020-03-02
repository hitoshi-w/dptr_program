import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import TaskCard from 'components/tasks/TaskCard';
import { openModal } from 'reducers/modalReducer';
import { openDialog } from 'reducers/dialogReducer';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openModal: (id: string) => dispatch(openModal(id)),
  openDialog: (id: string) => dispatch(openDialog(id)),
});

export default connect(null, mapDispatchToProps)(TaskCard);
