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

interface TaskEditProps {
  task: Task | null;
  currentUser: User;
  putTask: (currentUser: User, params: Task) => void;
  closeModal: () => void;
}

const TaskEdit: React.FC<TaskEditProps> = ({
  task,
  currentUser,
  putTask,
  closeModal,
}) => {
  const { register, handleSubmit } = useForm<Task>();

  const onSubmit = (data: Task) => {
    putTask(currentUser, data);
    closeModal();
  };

  if (task) {
    const initialValues = {
      id: task.id,
      statusId: task.statusId,
      content: task.content,
      staff: task.staff,
      priority: task.priority,
      sortIndex: task.sortIndex,
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
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
        <input
          name="id"
          defaultValue={initialValues.id}
          ref={register}
          type="hidden"
        />
        <input
          name="statusId"
          defaultValue={initialValues.statusId}
          ref={register}
          type="hidden"
        />
        <input
          name="sortIndex"
          defaultValue={initialValues.sortIndex}
          ref={register}
          type="hidden"
        />
        <Button variant="contained" color="primary" type="submit">
          更新
        </Button>
      </Form>
    );
  } else {
    return <p>該当するデータがありません。</p>;
  }
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
