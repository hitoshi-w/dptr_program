import { db } from 'index';
import { TaskEntity } from 'reducers/taskReducer';

export const readTasks = async () => {
  const res = await db.collection('tasks').get();
  const resData: TaskEntity = {};
  res.forEach(doc => {
    const docData = doc.data();
    resData[doc.id] = { title: docData.title };
  });
  return resData;
};
