import React, { useEffect, useState } from 'react';
import ModalForm from 'components/layouts/ModalForm';
import TaskList from 'components/tasks/TaskList';
import { Project } from 'reducers/taskReducer';
import { User } from 'reducers/userReducer';
import styled from 'styled-components';

interface TaskIndexProps {
  project: Project[];
  currentUser: User;
}

const TaskIndex: React.FC<TaskIndexProps> = ({ project, currentUser }) => {
  console.log(project);

  return (
    <>
      <ModalForm />
      <ListsContainer>
        {project.map((ele, i) => (
          <TaskList key={i} {...ele} />
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
