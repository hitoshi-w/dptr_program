import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Textarea from 'react-textarea-autosize';
import TaskCard from 'containers/tasks/taskCard';
import { Task } from 'reducers/taskReducer';
import { User } from 'reducers/userReducer';

import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Icon,
  Card,
} from '@material-ui/core';
import styled from 'styled-components';

interface TaskForm {
  content: string;
  priority: string;
  staff: string;
}

interface TaskIndexProps {
  status: string;
  statusId: number;
  tasks: Task[];
  taskId: number;
  currentUser: User;
  createTask: (currentUser: User, params: Task) => void;
}

const TaskIndex: React.FC<TaskIndexProps> = ({
  status,
  statusId,
  tasks,
  taskId,
  currentUser,
  createTask,
}) => {
  const [form, setForm] = useState(false);
  const { register, handleSubmit } = useForm<TaskForm>();
  const onSubmit = handleSubmit(({ content, priority, staff }) => {
    const params = {
      id: taskId,
      statusId,
      content,
      priority,
      staff,
    };
    createTask(currentUser, params);
  });
  const handleOpen = () => {
    setForm(true);
  };
  const handleClose = () => {
    setForm(false);
  };

  const FormComponent = () => {
    return (
      <>
        <form onSubmit={onSubmit}>
          <_Card>
            <_Textarea
              autoFocus
              placeholder="タスクを入力"
              minRows={4}
              inputRef={register}
              name="content"
            />
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
                    <Radio
                      color="primary"
                      inputRef={register}
                      name="priority"
                    />
                  }
                  label="高"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="lowPriority"
                  control={
                    <Radio
                      color="primary"
                      inputRef={register}
                      name="priority"
                    />
                  }
                  label="低"
                  labelPlacement="start"
                />
              </RadioGroup>
            </FormControl>
          </_Card>

          <FormButton>
            <_Button type="submit" variant="contained" color="primary">
              タスク作成
            </_Button>
            <_Button onClick={handleClose} variant="contained">
              キャンセル
            </_Button>
          </FormButton>
        </form>
      </>
    );
  };
  return (
    <>
      <ListContainer>
        <ListHead>
          <h2>{status}</h2>
          <Icon onClick={handleOpen}>add</Icon>
        </ListHead>
        {form ? <FormComponent /> : <></>}

        {tasks.map((task, index) => {
          if (task.statusId === statusId) {
            return <TaskCard key={index} {...task} />;
          }
        })}
      </ListContainer>
    </>
  );
};

const ListHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.2rem;
  h2 {
    letter-spacing: 1.6px;
  }
  span {
    font-size: 2.4rem;
  }
`;

const FormButton = styled.div`
  display: flex;
  margin-top: 8px;
`;

const _Button = styled(Button)`
  flex: 1;
  &:not(:last-child) {
    margin-right: 4px;
  }
`;

const _Card = styled(Card)`
  min-height: 8rem;
  padding: 6px 8px 2px;
`;

const _Textarea = styled(Textarea)`
  resize: none;
  width: 100%;
  border: 1px solid var(--color-light-dark-3);
  border-radius: 3px;
  overflow: hidden;
  padding: 1rem;
  line-height: 1.5;
`;

const ListContainer = styled.div`
  flex: 1;
  background-color: #dfe3e6;
  border-radius: 3px;
  height: inherit;
  padding: 8px;
  &:not(:last-child) {
    margin-right: 1rem;
  }
`;

export default TaskIndex;
