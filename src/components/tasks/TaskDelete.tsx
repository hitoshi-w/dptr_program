import React from 'react';
import { Task } from 'reducers/taskReducer';
import { TaskDelete } from 'reducers/taskDeleteReducer';
import { User } from 'reducers/userReducer';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

interface TaskDeleteProps {
  taskDelete: TaskDelete;
  currentUser: User;
  closeTaskDelete: () => void;
  deleteTask: (currentUser: User, task: Task) => void;
}

const _TaskDelete: React.SFC<TaskDeleteProps> = ({
  taskDelete,
  currentUser,
  closeTaskDelete,
  deleteTask,
}) => {
  const task = taskDelete.task;

  return (
    <div>
      <Dialog
        open={taskDelete.isOpen}
        onClose={closeTaskDelete}
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
          <Button onClick={() => closeTaskDelete()} color="primary">
            キャンセル
          </Button>
          {task ? (
            <Button
              onClick={() => {
                deleteTask(currentUser, task);
                closeTaskDelete();
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

export default _TaskDelete;
