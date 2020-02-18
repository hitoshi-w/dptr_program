import React from 'react';

import TaskCard from 'components/tasks/TaskCard';
import { Project } from 'reducers/taskReducer';
import Icon from '@material-ui/core/Icon';
import styled from 'styled-components';

const TaskList: React.SFC<Project> = ({ taskStatus, tasks }) => {
  return (
    <ListContainer>
      <h4>{taskStatus}</h4>
      <Icon>add</Icon>
      {tasks.map((task, index) => (
        <TaskCard key={index} {...task} />
      ))}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  background-color: #dfe3e6;
  border-radius: 3px;
  width: 300px;
  height: 100%;
  padding: 8px;
  margin-right: 8px;
`;

export default TaskList;
