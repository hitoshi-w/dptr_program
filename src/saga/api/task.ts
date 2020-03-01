import { db } from 'index';
import { Task } from 'reducers/taskReducer';
import { User } from 'reducers/userReducer';

export const readAll = async (currentUser: User) => {
  const docRef = db.collection('taskLists').doc('hello worl');
  const response = await docRef.collection('0').get();
  const newTask: Task[] = [];
  const wip: Task[] = [];
  const done: Task[] = [];

  response.forEach(doc => {
    const data = doc.data();
    const task = {
      id: data.id,
      content: data.content,
      priority: data.priority,
      staff: data.staff,
      statusId: data.statusId,
    };
    if (task.statusId === 0) {
      newTask.push(task);
    }
    if (task.statusId === 1) {
      wip.push(task);
    }
    if (task.statusId === 2) {
      done.push(task);
    }
  });

  return {
    taskLists: [
      {
        status: '着手',
        id: 0,
        tasks: newTask,
      },
      {
        status: '途中',
        id: 1,
        tasks: wip,
      },
      {
        status: '完了',
        id: 2,
        tasks: done,
      },
    ],
    taskId: newTask.length + wip.length + done.length,
  };
};

export const createTask = async (currentUser: User, params: Task) => {
  const docRef = db
    .collection('taskLists')
    .doc('hello worl')
    .collection('0');
  await docRef.doc(`${params.id}`).set(params);
  const response = await docRef.doc(`${params.id}`).get();
  return response.data();
};

export const deleteTask = async (currentUser: User, id: number) => {
  const docRef = db
    .collection('taskLists')
    .doc('hello worl')
    .collection('0');
  await docRef.doc(`${id}`).delete();
  return id;
};

export const putTask = async (currentUser: User, params: Task) => {
  const docRef = db
    .collection('taskLists')
    .doc('hello worl')
    .collection('0');
  await docRef.doc(`${params.id}`).update({
    content: params.content,
    priority: params.priority,
    staff: params.staff,
  });
  const response = await docRef.doc(`${params.id}`).get();
  return response.data();
};

// const docRef = db.collection('taskLists').doc('hello worl');
// const response = await docRef.get();

// if (response.exists === false) {
//   const newTask = docRef.set(
//     { 0: { listId: 0, taskStatus: '未着手', tasks: {} } },
//     { merge: true },
//   );
//   const wip = docRef.set(
//     { 1: { listId: 1, taskStatus: '途中', tasks: {} } },
//     { merge: true },
//   );
//   const done = docRef.set(
//     { 2: { listId: 2, taskStatus: '完了', tasks: {} } },
//     { merge: true },
//   );
//   await Promise.all([newTask, wip, done]);
// }

// const formattedData = _.values(response.data());
// formattedData.forEach(e => {
//   e.tasks = _.values(e.tasks);
// });

// return formattedData;
