import React from 'react';
import { Task } from 'reducers/taskReducer';

const TodoCard: React.FC<Task> = ({ content, priority, staff }) => {
  return <div>{content}</div>;
};

export default TodoCard;
