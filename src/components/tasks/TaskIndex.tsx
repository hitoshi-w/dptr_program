import React from 'react';
import ModalForm from 'components/layouts/ModalForm';
import TaskList from 'containers/tasks/taskList';

import styled from 'styled-components';

const TaskIndex: React.SFC = () => {
  return (
    <>
      <ModalForm />
      <ListsContainer>
        {['着手', '途中', '完了'].map((status, statusId) => (
          <TaskList key={statusId} status={status} statusId={statusId} />
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
