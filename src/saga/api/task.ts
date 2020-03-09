import { db } from 'index';
import { Task, TaskList } from 'reducers/taskReducer';
import { User } from 'reducers/userReducer';
import _ from 'lodash';

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
    sortIndex: data.sortIndex,
  };
};

export const readAll = async (currentUser: User) => {
  const docRef = db.collection('taskLists').doc(`${currentUser}`);
  const response = await docRef.collection('tasks').get();
  const newTask: Task[] = [];
  const wip: Task[] = [];
  const done: Task[] = [];

  response.forEach(doc => {
    const docData = data(doc);
    if (docData.statusId === 0) {
      newTask.push(docData);
    }
    if (docData.statusId === 1) {
      wip.push(docData);
    }
    if (docData.statusId === 2) {
      done.push(docData);
    }
  });

  return {
    taskLists: [
      {
        status: '着手',
        id: 0,
        tasks: _.sortBy(newTask, 'sortIndex'),
      },
      {
        status: '途中',
        id: 1,
        tasks: _.sortBy(wip, 'sortIndex'),
      },
      {
        status: '完了',
        id: 2,
        tasks: _.sortBy(done, 'sortIndex'),
      },
    ],
  };
};

export const createTask = async (currentUser: User, params: Task) => {
  const docRef = db
    .collection('taskLists')
    .doc(`${currentUser}`)
    .collection('tasks');
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
    .doc(`${currentUser}`)
    .collection('tasks');
  await docRef.doc(`${params.id}`).delete();
  return { id: params.id, statusId: params.statusId };
};

export const putTask = async (currentUser: User, params: Task) => {
  const docRef = db
    .collection('taskLists')
    .doc(`${currentUser}`)
    .collection('tasks');
  await docRef.doc(`${params.id}`).update({
    content: params.content,
    priority: params.priority,
    staff: params.staff,
  });
  const response = await docRef.doc(`${params.id}`).get();
  return response.data();
};

export const putTasks = async (currentUser: User, params: TaskList[]) => {
  const docRef = db
    .collection('taskLists')
    .doc(`${currentUser}`)
    .collection('tasks');
  const tasks = [...params[0].tasks, ...params[1].tasks, ...params[2].tasks];
  const updateTasks = tasks.map(task =>
    docRef.doc(`${task.id}`).update({
      sortIndex: task.sortIndex,
      statusId: task.statusId,
    }),
  );
  await Promise.all(updateTasks);
};
