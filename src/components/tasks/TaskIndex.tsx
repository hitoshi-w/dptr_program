import React, { useEffect } from 'react';
import {
  Droppable,
  DropResult,
  DragDropContext,
  Draggable,
} from 'react-beautiful-dnd';
import { useLocation, useHistory } from 'react-router-dom';

import TaskEdit from 'containers/tasks/taskEdit';
import TaskDelete from 'containers/tasks/taskDelete';
import TaskNew from 'containers/tasks/taskNew';
import EditDeleteMenu from 'containers/tasks/taskEditDeleteMenu';
import { TaskListState, TaskList, DragIds } from 'reducers/taskReducer';
import { User } from 'reducers/userReducer';

import { Card, Typography } from '@material-ui/core';
import styled from 'styled-components';

interface TaskIndexProps {
  taskListState: TaskListState;
  currentUser: User;
  readAll: (currentUser: User, taskListState: TaskListState) => void;
  searchTask: (searchValue: string) => void;
  dragTask: (dragIds: DragIds) => void;
}

const TaskIndex: React.FC<TaskIndexProps> = ({
  taskListState,
  currentUser,
  readAll,
  searchTask,
  dragTask,
}) => {
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    readAll(currentUser, taskListState);
    history.listen(location => {
      const searchValue = location.search.match(/[^?query=]+/);
      if (searchValue) {
        searchTask(searchValue[0]);
      }
    });
  }, [readAll, taskListState.isDragged, searchTask]);

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
  };

  const listsComponent = (taskLists: TaskList[]) => {
    return taskLists.map((taskList: TaskList, statusId) => {
      return (
        <Droppable droppableId={statusId.toString()} key={statusId}>
          {provided => (
            <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
              <TaskNew taskList={taskList} statusId={statusId} />

              {taskList.tasks.map((task, index) => (
                <Draggable draggableId={task.id} index={index} key={task.id}>
                  {provided => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <_Card data-priority={task.priority}>
                        <CardBody>
                          <Typography>{task.content}</Typography>
                          <_Typography>
                            担当者：
                            {task.staff}
                          </_Typography>
                        </CardBody>
                        <EditDeleteMenu task={task} />
                      </_Card>
                    </div>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </ListContainer>
          )}
        </Droppable>
      );
    });
  };

  return (
    <>
      <TaskEdit />
      <TaskDelete />
      <DragDropContext onDragEnd={onDragEnd}>
        <ListsContainer>
          {location.search
            ? listsComponent(taskListState.taskSearch)
            : listsComponent(taskListState.taskLists)}
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

const ListContainer = styled.div`
  flex: 1;
  background-color: #dfe3e6;
  border-radius: 3px;
  border: 1px solid var(--color-light-dark-3);
  padding: 8px;
  overflow: scroll;
  min-height: 400px;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const _Card = styled(Card)`
  display: flex;
  margin-bottom: 8px;
  padding: 12px 4px 12px 12px;
  &[data-priority='1'] {
    border: 1px solid var(--color-orange);
    box-shadow: 0px 2px 1px -1px rgba(255, 153, 0, 0.2),
      0px 1px 1px 0px rgba(255, 153, 0, 0.14),
      0px 1px 3px 0px rgba(255, 153, 0, 0.12);
  }
`;

const CardBody = styled.div`
  flex: 1 0 300px;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  overflow: hidden;
  box-sizing: border-box;
`;

const _Typography = styled(Typography)`
  margin-top: 8px;
  color: var(--color-grey-dark-2);
  font-size: 12px;
`;

export default TaskIndex;
