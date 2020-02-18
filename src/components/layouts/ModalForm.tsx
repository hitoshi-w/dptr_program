import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import styled from 'styled-components';

import TaskNew from 'containers/tasks/taskEdit';

const ModalForm: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        新規作成
      </button>
      <Modal disableAutoFocus={true} open={open} onClose={handleClose}>
        <ModalStyle>
          <TaskNew />
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

// const modalContent = makeStyles((theme: Theme) =>
//   createStyles({
//     paper: {
//       position: 'absolute',
//       width: 400,
//       backgroundColor: theme.palette.background.paper,
//       border: '2px solid #000',
//       boxShadow: theme.shadows[5],
//       padding: theme.spacing(2, 4, 3),
//     },
//   }),
// );
