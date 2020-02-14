import React from 'react';
import { useForm } from 'react-hook-form';

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

export type TaskForm = {
  title: string;
  staff: string;
  priority: string;
};

const TaskNew: React.FC = () => {
  const { register, handleSubmit } = useForm<TaskForm>();
  const onSubmit = handleSubmit(({ title, staff, priority }) => {
    console.log(title, staff, priority);
  });

  return (
    <Forma onSubmit={onSubmit}>
      <h2>タスク作成</h2>
      <TextField inputRef={register} label="タスク" name="title" />
      <TextField inputRef={register} label="担当者" name="staff" />
      <FormControl component="fieldset">
        <FormLabel component="legend">優先度</FormLabel>
        <RadioGroup
          aria-label="priority"
          name="priority-radio"
          defaultValue="lowPriority"
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
        作成
      </Button>
    </Forma>
  );
};

const Forma = styled.form`
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

export default TaskNew;
