import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Modal from 'components/layouts/Modal';
import { RootState } from 'reducers/rootReducer';
import { closeModal } from 'reducers/modalReducer';

const mapStateToProps = (state: RootState) => ({
  isOpen: state.modalReducer.modal.isOpen,
  task: state.modalReducer.modal.task,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeModal: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
