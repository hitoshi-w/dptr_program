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
        <StyledForm onSubmit={onSubmit}>
          <StyledCard>
            <StyledTextarea
              autoFocus
              placeholder="タスクを入力"
              minRows={4}
              inputRef={register({ required: true })}
              name="content"
            />
            <StyledFormBody>
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
            </StyledFormBody>
          </StyledCard>

          <StyledFormButton>
            <StyledButton type="submit" variant="contained" color="primary">
              タスク作成
            </StyledButton>
            <StyledButton onClick={handleClose} variant="contained">
              キャンセル
            </StyledButton>
          </StyledFormButton>
        </StyledForm>
      </>
    );
  };

  return (
    <div>
      <StyledListHead>
        <h2>{taskList.status}</h2>
        {statusId === 0 ? <Icon onClick={handleOpen}>add</Icon> : <></>}
      </StyledListHead>
      {form && statusId === 0 ? <FormComponent /> : <></>}
    </div>
  );
};

const StyledForm = styled.form`
  margin-bottom: 8px;
`;

const StyledFormBody = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 8px;
`;

const StyledListHead = styled.div`
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

const StyledFormButton = styled.div`
  display: flex;
  margin-top: 8px;
`;

const StyledButton = styled(Button)`
  flex: 1;
  &:not(:last-child) {
    margin-right: 4px;
  }
`;

const StyledCard = styled(Card)`
  min-height: 80px;
  padding: 6px 8px 2px;
`;

const StyledTextarea = styled(Textarea)`
  resize: none;
  width: 100%;
  border: 1px solid var(--color-light-dark-3);
  border-radius: 3px;
  padding: 10px;
  line-height: 1.5;
`;

export default TaskNew;
