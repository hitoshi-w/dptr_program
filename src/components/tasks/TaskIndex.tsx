import React, { useEffect, useState } from 'react';
import ModalForm from 'components/layouts/ModalForm';
import TaskList from 'containers/tasks/taskList';
import { TaskLists } from 'reducers/taskReducer';
import { User } from 'reducers/userReducer';
import styled from 'styled-components';

interface TaskIndexProps {
  taskLists: TaskLists;
}

const TaskIndex: React.FC<TaskIndexProps> = ({ taskLists }) => {
  return (
    <>
      <ModalForm />
      <ListsContainer>
        {Object.keys(taskLists).map(id => (
          <TaskList key={id} {...taskLists[parseInt(id)]} />
        ))}
      </ListsContainer>
    </>
  );
};

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export default TaskIndex;
