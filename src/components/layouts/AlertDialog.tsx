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
  deleteTask: (currentUser: User, task: Task) => void;
  isDialog: boolean;
  task: Task | null;
  currentUser: User;
}
const AlertDialog: React.SFC<AlertDialogProps> = ({
  closeDialog,
  deleteTask,
  isDialog,
  task,
  currentUser,
}) => {
  return (
    <div>
      <Dialog
        open={isDialog}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'確認画面'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {task
              ? `タスク内容：「${task.content}」を本当に削除しますか？`
              : '該当するデータがありません'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closeDialog()} color="primary">
            キャンセル
          </Button>
          {task ? (
            <Button
              onClick={() => {
                deleteTask(currentUser, task);
                closeDialog();
              }}
              color="primary"
              autoFocus
            >
              削除する
            </Button>
          ) : (
            <></>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
