'use client'

import { useTaskStore } from "@/store/taskStore";
import Task from "./Task";

const TasksList: React.FC = () => {
  const tasks = useTaskStore((state) => state.tasks);

  const tasksToDo = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="flex flex-col w-full px-12">
      {tasksToDo.length > 0 && <TaskSection title="Tasks to do" tasks={tasksToDo} />}
      {completedTasks.length > 0 && <TaskSection title="Completed Tasks" tasks={completedTasks} />}
    </div>
  );
};

const TaskSection: React.FC<{ title: string; tasks: Array<{ id: string; description: string; completed: boolean }> }> = ({ title, tasks }) => (
  <>
    <h2 className="text-xl font-thin mt-5">{title}</h2>
    {tasks.map((task) => (
      <Task key={task.id} {...task} />
    ))}
  </>
);

export default TasksList;
