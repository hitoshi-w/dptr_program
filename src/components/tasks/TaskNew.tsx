import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Textarea from 'react-textarea-autosize';
import { v4 as uuid } from 'uuid';

import { Task, TaskForm, TaskList } from 'reducers/taskReducer';
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

interface TaskNewProps {
  taskList: TaskList;
  statusId: number;
  currentUser: User;
  createTask: (currentUser: User, task: Task) => void;
}

const TaskNew: React.FC<TaskNewProps> = ({
  taskList,
  statusId,
  currentUser,
  createTask,
}) => {
  const [form, setForm] = useState(false);
  const { register, handleSubmit } = useForm<TaskForm>();

  const handleOpen = () => {
    setForm(true);
  };
  const handleClose = () => {
    setForm(false);
  };

  const onSubmit = handleSubmit(({ content, priority, staff }) => {
    const task = {
      id: uuid(),
      statusId: 0,
      content,
      priority: parseInt(priority),
      staff,
      sortIndex: taskList.tasks.length,
    };
    createTask(currentUser, task);
    handleClose();
  });

  const FormComponent = () => {
    return (
      <>
        <Form onSubmit={onSubmit}>
          <_Card>
            <_Textarea
              autoFocus
              placeholder="タスクを入力"
              minRows={4}
              inputRef={register}
              name="content"
            />
            <FormBody>
              <TextField inputRef={register} label="担当者" name="staff" />
              <FormControl component="fieldset">
                <FormLabel component="legend">優先度</FormLabel>
                <RadioGroup
                  aria-label="priority"
                  name="priority-radio"
                  defaultValue="0"
                  row
                >
                  <FormControlLabel
                    value="1"
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
                    value="0"
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
            </FormBody>
          </_Card>

          <FormButton>
            <_Button type="submit" variant="contained" color="primary">
              タスク作成
            </_Button>
            <_Button onClick={handleClose} variant="contained">
              キャンセル
            </_Button>
          </FormButton>
        </Form>
      </>
    );
  };

  return (
    <div>
      <ListHead>
        <h2>{taskList.status}</h2>
        {statusId === 0 ? <Icon onClick={handleOpen}>add</Icon> : <></>}
      </ListHead>
      {form && statusId === 0 ? <FormComponent /> : <></>}
    </div>
  );
};

const Form = styled.form`
  margin-bottom: 8px;
`;

const FormBody = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 8px;
`;

const ListHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  h2 {
    letter-spacing: 1.6px;
  }
  span {
    font-size: 24px;
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
  min-height: 80px;
  padding: 6px 8px 2px;
`;

const _Textarea = styled(Textarea)`
  resize: none;
  width: 100%;
  border: 1px solid var(--color-light-dark-3);
  border-radius: 3px;
  padding: 10px;
  line-height: 1.5;
`;

export default TaskNew;
