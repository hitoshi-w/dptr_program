import React, { useEffect } from 'react';
import { TaskEntity } from 'reducers/taskReducer';
import { Link } from 'react-router-dom';

interface TaskIndexProps {
  tasks: TaskEntity;
  readTasks: () => void;
}

const TaskIndex: React.FC<TaskIndexProps> = ({ tasks, readTasks }) => {
  useEffect(() => {
    readTasks();
  }, [readTasks]);

  return (
    <div>
      {tasks &&
        Object.keys(tasks).map(key => {
          return <div key={key}>{`${tasks[key].title}`}</div>;
        })}
    </div>
  );
};

export default TaskIndex;
