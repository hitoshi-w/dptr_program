import React from 'react';
import TaskEdit from 'containers/tasks/taskEdit';

import Modal from '@material-ui/core/Modal';
import styled from 'styled-components';

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const ModalForm: React.SFC<ModalProps> = ({ isOpen, closeModal }) => {
  return (
    <div>
      <Modal disableAutoFocus={true} open={isOpen} onClose={closeModal}>
        <ModalContainer>
          <TaskEdit />
        </ModalContainer>
      </Modal>
    </div>
  );
};

const ModalContainer = styled.div`
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  width: 360px;
  background-color: #fff;
  border-radius: 3px;
`;

export default ModalForm;
