import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import TaskCard from 'components/tasks/TaskCard';
import { User } from 'reducers/userReducer';
import { deleteTask } from 'reducers/taskReducer';
import { openModal } from 'reducers/modalReducer';
import { RootState } from 'reducers/rootReducer';

const mapStateToProps = (state: RootState) => ({
  currentUser: state.userReducer.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  deleteTask: (
    currentUser: User,
    params: {
      id: number;
      statusId: number;
    },
  ) => dispatch(deleteTask.request(currentUser, params)),
  openModal: (id: number) => dispatch(openModal(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskCard);
