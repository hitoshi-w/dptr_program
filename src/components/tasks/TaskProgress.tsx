import React from 'react';
import { Project } from 'reducers/taskReducer';
import TaskCard from 'components/tasks/TaskProgress';

const TaskProgress: React.FC<Project> = ({ taskStatus, tasks }) => {
  return (
    <>
      <h4>{taskStatus}</h4>
      {tasks.map((task, index) => {
        console.log(task);
      })}
    </>
  );
};

export default TaskProgress;
