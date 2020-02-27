import { db } from 'index';
import { Task } from 'reducers/taskReducer';
import { User } from 'reducers/userReducer';
import _ from 'lodash';

export const readAll = async (currentUser: User) => {
  const docRef = db.collection('taskLists').doc('hello worl');
  const response = await docRef.collection('0').get();
  const tasks: Task[] = [];

  response.forEach(doc => {
    const data = doc.data();
    const task = {
      id: data.id,
      sortIndex: data.sortIndex,
      content: data.content,
      priority: data.priority,
      staff: data.staff,
      statusId: data.statusId,
    };
    tasks.push(task);
  });
  console.log(tasks);
  return { tasks, totalTask: tasks.length };
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
