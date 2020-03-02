import React from 'react';
import Modal from 'containers/modal';
import _TaskList from 'containers/tasks/taskList';
import { TaskList } from 'reducers/taskReducer';
import { DragIds } from 'reducers/taskReducer';
import { User } from 'reducers/userReducer';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import styled from 'styled-components';
import { PhoneBluetoothSpeakerSharp } from '@material-ui/icons';

interface TaskIndex {
  currentUser: User;
  taskLists: TaskList[];
  dragTask: (dragIds: DragIds) => void;
  putTasks: (curretUser: User, taskLists: TaskList[]) => void;
}

const TaskIndex: React.FC<TaskIndex> = ({
  dragTask,
  taskLists,
  currentUser,
  putTasks,
}) => {
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    const dragIds = {
      droppableIdStart: source.droppableId,
      droppableIdEnd: destination.droppableId,
      droppableIndexStart: source.index,
      droppableIndexEnd: destination.index,
      draggableId: draggableId,
    };
    dragTask({ ...dragIds });
    putTasks(currentUser, taskLists);
  };

  return (
    <>
      <Modal />
      <DragDropContext onDragEnd={onDragEnd}>
        <ListsContainer>
          {taskLists.map((taskList, statusId) => (
            <_TaskList
              key={taskList.id}
              taskList={taskList}
              statusId={statusId}
            />
          ))}
        </ListsContainer>
      </DragDropContext>
    </>
  );
};

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  flex-shrink: 0;
  margin: 10px 0;
`;

export default TaskIndex;
