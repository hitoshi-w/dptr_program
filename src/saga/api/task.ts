import { db } from 'index';
import { Task } from 'reducers/taskReducer';
import { User } from 'reducers/userReducer';

export const readAll = async (currentUser: User) => {
  const docRef = db.collection('taskLists').doc('hello worl');
  const getNewTask = docRef.collection('0').get();
  const getWip = docRef.collection('1').get();
  const getDone = docRef.collection('2').get();
  const response = await Promise.all([getNewTask, getWip, getDone]);
  const newTask: Task[] = [];
  const wip: Task[] = [];
  const done: Task[] = [];

  const data = (
    doc: firebase.firestore.QueryDocumentSnapshot<
      firebase.firestore.DocumentData
    >,
  ) => {
    const data = doc.data();
    return {
      id: data.id,
      content: data.content,
      priority: data.priority,
      staff: data.staff,
      statusId: data.statusId,
    };
  };

  response[0].forEach(doc => {
    newTask.push(data(doc));
  });

  response[1].forEach(doc => {
    wip.push(data(doc));
  });

  response[2].forEach(doc => {
    done.push(data(doc));
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
  };
};

export const createTask = async (currentUser: User, params: Task) => {
  const docRef = db
    .collection('taskLists')
    .doc('hello worl')
    .collection(`${params.statusId}`);
  await docRef.doc(`${params.id}`).set(params);
  const response = await docRef.doc(`${params.id}`).get();
  return response.data();
};

export const deleteTask = async (
  currentUser: User,
  params: {
    id: string;
    statusId: number;
  },
) => {
  const docRef = db
    .collection('taskLists')
    .doc('hello worl')
    .collection(`${params.statusId}`);
  await docRef.doc(`${params.id}`).delete();
  return { id: params.id, statusId: params.statusId };
};

export const putTask = async (currentUser: User, params: Task) => {
  const docRef = db
    .collection('taskLists')
    .doc('hello worl')
    .collection(`${params.statusId}`);
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
