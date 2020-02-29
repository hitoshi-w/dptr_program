import React from 'react';
import { useForm } from 'react-hook-form';
import Textarea from 'react-textarea-autosize';
import { User } from 'reducers/userReducer';
import { Task } from 'reducers/taskReducer';

import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@material-ui/core';
import styled from 'styled-components';

export interface TaskForm {
  content: string;
  staff: string;
  priority: string;
}

interface TaskEditProps {
  task: Task;
  currentUser: User;
  putTask: (currentUser: User, params: Task) => void;
}

const TaskEdit: React.SFC<TaskEditProps> = ({ task, currentUser, putTask }) => {
  const { register, handleSubmit } = useForm<TaskForm>();
  const initialValues = {
    content: task.content,
    staff: task.staff,
    priority: task.priority,
  };
  const onSubmit = handleSubmit(({ content, staff, priority }) => {
    const params = {
      id: task.id,
      statusId: task.statusId,
      content,
      staff,
      priority,
    };
    putTask(currentUser, params);
  });

  return (
    <Form onSubmit={onSubmit}>
      <h2>タスク編集</h2>
      <_Textarea
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
          defaultValue={initialValues.priority}
          row
        >
          <FormControlLabel
            value="highPriority"
            control={
              <Radio color="primary" inputRef={register} name="priority" />
            }
            label="高"
            labelPlacement="start"
          />
          <FormControlLabel
            value="lowPriority"
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
    </Form>
  );
};

const Form = styled.form`
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

const _Textarea = styled(Textarea)`
  resize: none;
  width: 100%;
  border: 1px solid var(--color-light-dark-3);
  border-radius: 3px;
  padding: 10px;
  line-height: 1.5;
  font-size: 16px;
`;

export default TaskEdit;
