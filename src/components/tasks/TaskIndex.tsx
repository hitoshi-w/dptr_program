import React, { useEffect, useState } from 'react';
import ModalForm from 'components/layouts/ModalForm';
import { Project } from 'reducers/taskReducer';
import { User } from 'reducers/userReducer';

interface TaskIndexProps {
  project: Project[];
  currentUser: User;
  readProject: (currentUser: User) => void;
}

const TaskIndex: React.FC<TaskIndexProps> = ({
  project,
  readProject,
  currentUser,
}) => {
  useEffect(() => {
    readProject(currentUser);
  }, [readProject, currentUser]);
  console.log(project);

  return (
    <>
      <ModalForm />
      <div></div>
    </>
  );
};

export default TaskIndex;
