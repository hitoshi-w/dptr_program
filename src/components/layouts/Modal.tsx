import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import TaskEdit from 'containers/tasks/taskEdit';
import { Task } from 'reducers/taskReducer';

import styled from 'styled-components';

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const ModalForm: React.SFC<ModalProps> = ({ isOpen, closeModal }) => {
  return (
    <div>
      <Modal disableAutoFocus={true} open={isOpen} onClose={closeModal}>
        <ModalStyle>
          <TaskEdit />
        </ModalStyle>
      </Modal>
    </div>
  );
};

const ModalStyle = styled.div`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  width: 40rem;
  background-color: #fff;
`;

export default ModalForm;
