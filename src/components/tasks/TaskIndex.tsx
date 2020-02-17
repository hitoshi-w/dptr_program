import React, { useEffect, useState } from 'react';
import ModalForm from 'components/layouts/ModalForm';
import { TaskEntity } from 'reducers/taskReducer';

interface TaskIndexProps {
  tasks: TaskEntity;
  readTasks: () => void;
}

const TaskIndex: React.FC<TaskIndexProps> = ({ tasks, readTasks }) => {
  useEffect(() => {
    readTasks();
  }, [readTasks]);

  return (
    <>
      <ModalForm />
      <div>
        {tasks &&
          Object.keys(tasks).map(key => {
            return <div key={key}>{`${tasks[key].title}`}</div>;
          })}
      </div>
    </>
  );
};

export default TaskIndex;
