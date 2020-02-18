import { db } from 'index';
import { Project } from 'reducers/taskReducer';
import { User } from 'reducers/userReducer';
// import { TaskForm } from 'components/tasks/TaskNew';

const resData: Project[] = [];

export const readProject = async (currentUser: User) => {
  const docRef = db.collection('users').doc(currentUser?.id);
  const userData = await docRef.get();

  if (userData.exists === false) {
    await docRef.set({
      name: currentUser?.name ? currentUser?.name : 'No name',
    });
    const newTask = docRef
      .collection('project')
      .doc('未着手')
      .set({ id: 0, tasks: [] });
    const wip = await docRef
      .collection('project')
      .doc('途中')
      .set({ id: 1, tasks: [] });
    const done = docRef
      .collection('project')
      .doc('完了')
      .set({ id: 2, tasks: [] });
    await Promise.all([newTask, wip, done]);
  }

  const projectData = await docRef.collection('project').get();
  projectData.docs.forEach(doc => {
    resData.push({
      taskStatus: doc.id,
      id: doc.data().id,
      tasks: doc.data().tasks,
    });
  });

  return resData;
};
