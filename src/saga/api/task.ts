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
  const docRef = db.collection('taskLists').doc(`${currentUser?.id}`);
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

export const createTask = async (currentUser: User, task: Task) => {
  const docRef = db
    .collection('taskLists')
    .doc(`${currentUser?.id}`)
    .collection('tasks');
  await docRef.doc(`${task.id}`).set(task);
  const response = await docRef.doc(`${task.id}`).get();
  return response.data();
};

export const deleteTask = async (currentUser: User, task: Task) => {
  const docRef = db
    .collection('taskLists')
    .doc(`${currentUser?.id}`)
    .collection('tasks');
  await docRef.doc(`${task.id}`).delete();
  return { id: task.id, statusId: task.statusId };
};

export const putTask = async (currentUser: User, task: Task) => {
  const docRef = db
    .collection('taskLists')
    .doc(`${currentUser?.id}`)
    .collection('tasks');
  await docRef.doc(`${task.id}`).update({
    content: task.content,
    priority: task.priority,
    staff: task.staff,
  });
  const response = await docRef.doc(`${task.id}`).get();
  return response.data();
};

export const putTasks = async (currentUser: User, taskLists: TaskList[]) => {
  const docRef = db
    .collection('taskLists')
    .doc(`${currentUser?.id}`)
    .collection('tasks');
  const tasks = [
    ...taskLists[0].tasks,
    ...taskLists[1].tasks,
    ...taskLists[2].tasks,
  ];
  const updateTasks = tasks.map(task =>
    docRef.doc(`${task.id}`).update({
      sortIndex: task.sortIndex,
      statusId: task.statusId,
    }),
  );
  await Promise.all(updateTasks);
};
