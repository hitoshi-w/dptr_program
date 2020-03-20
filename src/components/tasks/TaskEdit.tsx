import React from 'react';
import { useForm } from 'react-hook-form';
import Textarea from 'react-textarea-autosize';
import { User } from 'reducers/userReducer';
import { Task, TaskForm } from 'reducers/taskReducer';
import { TaskEdit } from 'reducers/taskEditReducer';

import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import styled from 'styled-components';

interface TaskEditProps {
  taskEdit: TaskEdit;
  currentUser: User;
  putTask: (currentUser: User, task: Task) => void;
  closeModal: () => void;
}

const TaskEditFC: React.FC<TaskEditProps> = ({
  taskEdit,
  currentUser,
  putTask,
  closeModal,
}) => {
  const { register, handleSubmit } = useForm<TaskForm>();

  const formComponent = (task: Task) => {
    const onSubmit = handleSubmit(({ content, priority, staff }) => {
      const data = {
        ...task,
        content,
        staff,
        priority: parseInt(priority),
      };
      putTask(currentUser, data);
      closeModal();
    });

    const initialValues = {
      content: task.content,
      staff: task.staff,
      priority: task.priority,
    };

    return (
      <StyledForm onSubmit={onSubmit}>
        <h2>タスク編集</h2>
        <StyledTextarea
          autoFocus
          minRows={4}
          inputRef={register}
          name="content"
          defaultValue={initialValues.content}
        />
        <TextField
          inputRef={register}
          label="担当者"
          name="staff"
          defaultValue={initialValues.staff}
        />
        <FormControl component="fieldset">
          <FormLabel component="legend">優先度</FormLabel>
          <RadioGroup
            aria-label="priority"
            name="priority-radio"
            defaultValue={`${initialValues.priority}`}
            row
          >
            <FormControlLabel
              value="1"
              control={
                <Radio color="primary" inputRef={register} name="priority" />
              }
              label="高"
              labelPlacement="start"
            />
            <FormControlLabel
              value="0"
              control={
                <Radio color="primary" inputRef={register} name="priority" />
              }
              label="低"
              labelPlacement="start"
            />
          </RadioGroup>
        </FormControl>
        <Button variant="contained" color="primary" type="submit">
          更新
        </Button>
      </StyledForm>
    );
  };

  const task = taskEdit.task;
  return (
    <Modal disableAutoFocus={true} open={taskEdit.isOpen} onClose={closeModal}>
      <StyledModal>
        {task ? formComponent(task) : <p>該当するデータがありません</p>}
      </StyledModal>
    </Modal>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 360px;
  height: 450px;
  padding: 20px;
  & > * {
    margin-bottom: 12px;
  }
  h2 {
    align-self: center;
  }
`;

const StyledTextarea = styled(Textarea)`
  resize: none;
  width: 100%;
  border: 1px solid var(--color-light-dark-3);
  border-radius: 3px;
  padding: 10px;
  line-height: 1.5;
  font-size: 16px;
`;

const StyledModal = styled.div`
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  width: 360px;
  background-color: #fff;
  border-radius: 3px;
`;

export default TaskEditFC;
