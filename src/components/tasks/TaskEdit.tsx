import React from 'react';
import { useForm } from 'react-hook-form';
import Textarea from 'react-textarea-autosize';

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
  content?: string;
  staff?: string;
  priority?: string;
}

const TaskEdit: React.FC<TaskEditProps> = ({ content, staff, priority }) => {
  const { register, handleSubmit } = useForm<TaskForm>();
  const initialValues = {
    staff,
    content,
    priority,
  };
  const onSubmit = handleSubmit(({ content, staff, priority }) => {
    // createTask({ title, staff, priority });
  });

  return (
    <Form onSubmit={onSubmit}>
      <h2>タスク編集</h2>
      <Textarea
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
  width: 40rem;
  height: 45rem;
  padding: 2rem;
  h2 {
    align-self: center;
    margin: 0;
  }
`;

export default TaskEdit;
