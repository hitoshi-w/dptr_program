import React from 'react';
import ModalForm from 'components/layouts/ModalForm';
import TaskLists from 'components/tasks/TaskLists';
import { TaskList } from 'reducers/taskReducer';
import styled from 'styled-components';

interface TaskIndexProps {
  taskLists: TaskList[];
}

const TaskIndex: React.FC<TaskIndexProps> = ({ taskLists }) => {
  return (
    <>
      <ModalForm />
      <ListsContainer>
        {taskLists.map((taskList, listId) => (
          <TaskLists key={listId} taskList={taskList} />
        ))}
      </ListsContainer>
    </>
  );
};

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  flex-shrink: 0;
`;

export default TaskIndex;
