import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Textarea from 'react-textarea-autosize';

import TaskCard from 'components/tasks/TaskCard';
import { Tasks } from 'reducers/taskReducer';
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

interface OwnProps {
  currentUser: User;
  // createTask: (currentUser: User, params: Tasks) => void;
}

type TaskListProps = OwnProps & Tasks;

export interface TaskForm {
  content: string;
  priority: string;
  staff: string;
}

const TaskList: React.SFC<TaskListProps> = ({
  listId,
  taskStatus,
  tasks,
  // createTask,
  currentUser,
}) => {
  const [form, setForm] = useState(false);
  const { register, handleSubmit } = useForm<TaskForm>();
  const onSubmit = handleSubmit(({ content, priority, staff }) => {
    // const params = {
    //   id: taskList.id,
    //   taskStatus: taskList.taskStatus,
    //   tasks: [{ content, priority, staff }],
    // };
    // createTask(currentUser, params);
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
        <_Card>
          <form onSubmit={onSubmit}>
            <_Textarea inputRef={register} name="content" />
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
          </form>
        </_Card>

        <FormButton>
          <Button type="submit" variant="contained">
            タスク作成
          </Button>
          <Button onClick={handleClose} variant="contained">
            キャンセル
          </Button>
        </FormButton>
      </>
    );
  };

  return (
    <ListContainer>
      <h4>{taskStatus}</h4>
      <Icon onClick={handleOpen}>add</Icon>
      {form ? <FormComponent /> : <></>}
      {Object.keys(tasks).map(index => (
        <TaskCard key={index} {...tasks[parseInt(index)]} />
      ))}
    </ListContainer>
  );
};

const FormButton = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
`;

const _Card = styled(Card)`
  min-height: 8rem;
  padding: 6px 8px 2px;
`;

const _Textarea = styled(Textarea)`
  resize: none;
  width: 100%;
  outline: none;
  border: none;
  overflow: hidden;
`;

const ListContainer = styled.div`
  background-color: #dfe3e6;
  border-radius: 3px;
  width: 300px;
  height: 100%;
  padding: 8px;
  margin-right: 8px;
`;

export default TaskList;
