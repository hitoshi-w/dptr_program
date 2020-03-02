import React from 'react';
import { Task } from 'reducers/taskReducer';
import { User } from 'reducers/userReducer';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

interface AlertDialogProps {
  closeDialog: () => void;
  deleteTask: (
    currentUser: User,
    params: {
      id: string;
      statusId: number;
    },
  ) => void;
  isDialog: boolean;
  task: Task;
  currentUser: User;
}
const AlertDialog: React.SFC<AlertDialogProps> = ({
  closeDialog,
  deleteTask,
  isDialog,
  task,
  currentUser,
}) => {
  const handleDeleteTask = () => {
    const params = { id: task.id, statusId: task.statusId };
    deleteTask(currentUser, params);
    closeDialog();
  };

  const handleCloseDialog = () => {
    closeDialog();
  };

  return (
    <div>
      <Dialog
        open={isDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'確認画面'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`タスク内容：「${
              task ? task.content : '...'
            }」を本当に削除しますか？`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            キャンセル
          </Button>
          <Button onClick={handleDeleteTask} color="primary" autoFocus>
            削除する
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
