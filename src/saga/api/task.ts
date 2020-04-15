import { db } from 'index';
import { Task, TaskList, initTaskListState } from 'reducers/taskReducer';
import { User } from 'reducers/userReducer';

const toTaskType = (
  doc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
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

const compareSortIndex = (x: Task, y: Task) => {
  if (x.sortIndex > y.sortIndex) {
    return 1;
  } else {
    return -1;
  }
};

const tableRef = (currentUser: User, task: Task) => {
  return db
    .collection('taskLists')
    .doc(`${currentUser?.id}`)
    .collection('tasks')
    .doc(`${task.id}`);
};

export const readAll = async (
  currentUser: User,
  taskState: { tasks: Task[]; isDragged: boolean }
) => {
  if (taskState.isDragged) {
    const updateTasks = taskState.tasks.map(task =>
      tableRef(currentUser, task).update({
        sortIndex: task.sortIndex,
        statusId: task.statusId,
      })
    );
    await Promise.all(updateTasks);
  }

  const response = await db
    .collection('taskLists')
    .doc(`${currentUser?.id}`)
    .collection('tasks')
    .get();
  const newTask: Task[] = [];
  const wip: Task[] = [];
  const done: Task[] = [];

  response.forEach(doc => {
    const taskData = toTaskType(doc);
    if (taskData.statusId === 0) {
      newTask.push(taskData);
    }
    if (taskData.statusId === 1) {
      wip.push(taskData);
    }
    if (taskData.statusId === 2) {
      done.push(taskData);
    }
  });

  const taskStatus = [
    newTask.sort(compareSortIndex),
    wip.sort(compareSortIndex),
    done.sort(compareSortIndex),
  ];

  const taskListsData = (taskLists: TaskList[]) => {
    return taskLists.map((taskList, index) => {
      return { ...taskList, tasks: taskStatus[index] };
    });
  };

  return taskListsData(initTaskListState.taskLists);
};

export const createTask = async (currentUser: User, task: Task) => {
  await tableRef(currentUser, task).set(task);
  const response = await tableRef(currentUser, task).get();
  return response.data();
};

export const putTask = async (currentUser: User, task: Task) => {
  await tableRef(currentUser, task).update({
    content: task.content,
    priority: task.priority,
    staff: task.staff,
  });
  const response = await tableRef(currentUser, task).get();
  return response.data();
};

export const deleteTask = async (currentUser: User, task: Task) => {
  await tableRef(currentUser, task).delete();
  return task;
};
