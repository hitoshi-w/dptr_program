import { db } from 'index';
import { Tasks } from 'reducers/taskReducer';
import { User } from 'reducers/userReducer';

const resData: Tasks[] = [];

export const readAll = async (currentUser: User) => {
  const docRef = db.collection('taskLists').doc('hello worl');
  const userData = await docRef.get();

  if (userData.exists === false) {
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

  const taskData = await docRef.get();
  return taskData.data();
};

export const createTask = async (currentUser: User, params: Tasks) => {
  // const docRef = db
  //   .collection('users')
  //   .doc(currentUser?.id)
  //   .collection('taskList')
  //   .doc(params.taskStatus)
  //   .set(params.tasks);
  // const userData = await docRef.get();
};
