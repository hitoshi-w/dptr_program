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
import { TaskList, DragIds, Task } from 'reducers/taskReducer';
import { User } from 'reducers/userReducer';

import { Card, Typography } from '@material-ui/core';
import styled from 'styled-components';

interface TaskIndexProps {
  taskLists: TaskList[];
  taskSearch: TaskList[];
  isDragged: boolean;
  tasks: Task[];
  currentUser: User;
  readAll: (
    currentUser: User,
    taskState: { tasks: Task[]; isDragged: boolean }
  ) => void;
  searchTask: (searchValue: string) => void;
  dragTask: (dragIds: DragIds) => void;
}

const TaskIndex: React.FC<TaskIndexProps> = ({
  taskLists,
  taskSearch,
  isDragged,
  tasks,
  currentUser,
  readAll,
  searchTask,
  dragTask,
}) => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    history.listen(location => {
      const searchValue = location.search.match(/[^?query=]+/);
      if (searchValue) {
        searchTask(searchValue[0]);
      }
    });

    readAll(currentUser, { tasks, isDragged });
  }, [tasks, isDragged, currentUser, readAll, history, searchTask]);
  console.log('a');
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
            <StyledTaskList
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <TaskNew taskList={taskList} statusId={statusId} />

              <StyledTasks>
                {taskList.tasks.map((task, index) => (
                  <Draggable draggableId={task.id} index={index} key={task.id}>
                    {provided => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <StyledCard data-priority={task.priority}>
                          <StyledCardBody>
                            <Typography>{task.content}</Typography>
                            <StyledTypography>
                              担当者：{task.staff}
                            </StyledTypography>
                          </StyledCardBody>
                          <EditDeleteMenu task={task} />
                        </StyledCard>
                      </div>
                    )}
                  </Draggable>
                ))}
              </StyledTasks>

              {provided.placeholder}
            </StyledTaskList>
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
        <StyledTaskLists>
          {location.search
            ? listsComponent(taskLists)
            : listsComponent(taskSearch)}
        </StyledTaskLists>
      </DragDropContext>
    </>
  );
};

const StyledTaskLists = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  margin: 10px 0;
  overflow: hidden;
  width: 100%;
`;

const StyledTaskList = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #dfe3e6;
  border-radius: 3px;
  border: 1px solid var(--color-light-dark-3);
  padding: 8px;
  min-width: 360px;
  width: 100%;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const StyledTasks = styled.div`
  flex: 1;
  overflow: auto;
`;

const StyledCard = styled(Card)`
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

const StyledCardBody = styled.div`
  flex: 1 0 300px;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  overflow: hidden;
  box-sizing: border-box;
`;

const StyledTypography = styled(Typography)`
  margin-top: 8px;
  color: var(--color-grey-dark-2);
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default TaskIndex;
