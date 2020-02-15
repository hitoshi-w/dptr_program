import { db } from 'index';
import { TaskEntity } from 'reducers/taskReducer';
import { TaskForm } from 'components/tasks/TaskNew';

const resData: TaskEntity = {};

export const readTasks = async () => {
  const res = await db.collection('tasks').get();
  res.forEach(doc => {
    const docData = doc.data();
    resData[doc.id] = { title: docData.title };
  });
  return resData;
};

export const createTask = async (params: TaskForm) => {
  const res = await db.collection('tasks').add(params);
  const doc = await res.get();
  const docData = doc.data();
  resData[doc.id] = { title: docData?.title };
  return resData;
};
