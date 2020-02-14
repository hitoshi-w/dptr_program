import React from 'react';
import { useForm } from 'react-hook-form';

export type TaskForm = {
  title: string;
};

const TaskNew: React.FC = () => {
  const { register, handleSubmit } = useForm<TaskForm>();
  const onSubmit = handleSubmit(({ title }) => {
    console.log(title);
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h5>タスク作成</h5>
        <div>
          <label htmlFor="title">タスク名</label>
          <input type="text" name="title" ref={register} />
        </div>
        <div>
          <button type="submit">さくせい</button>
        </div>
      </form>
    </div>
  );
};

export default TaskNew;
