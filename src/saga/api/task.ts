import { db } from 'index';
import { TaskList } from 'reducers/taskReducer';
import { User } from 'reducers/userReducer';
import _ from 'lodash';

export const readAll = async (currentUser: User) => {
  const docRef = db.collection('taskLists').doc('hello worl');
  const response = await docRef.get();

  if (response.exists === false) {
    const newTask = docRef.set(
      { 0: { listId: 0, taskStatus: '未着手', tasks: {} } },
      { merge: true },
    );
    const wip = docRef.set(
      { 1: { listId: 1, taskStatus: '途中', tasks: {} } },
      { merge: true },
    );
    const done = docRef.set(
      { 2: { listId: 2, taskStatus: '完了', tasks: {} } },
      { merge: true },
    );
    await Promise.all([newTask, wip, done]);
  }

  const formattedData = _.values(response.data());
  formattedData.forEach(e => {
    e.tasks = _.values(e.tasks);
  });

  return formattedData;
};

export const createTask = async (
  currentUser: User,
  params: TaskList,
  sortIndex: number,
) => {
  const docRef = db.collection('taskLists').doc('hello worl');
  const taskData = await docRef.update({
    [`${params.listId}.tasks.${sortIndex}`]: params.tasks,
  });
};
