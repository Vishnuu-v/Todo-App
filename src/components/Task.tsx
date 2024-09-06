'use client'

import { useTaskStore } from "@/store/taskStore";
import { MdDelete } from "react-icons/md";
import { AiOutlineCheck, AiOutlineEdit } from "react-icons/ai";
import TaskForm from "./TaskForm";
import { useState } from "react";

interface TaskProps {
  id: string;
  description: string;
  completed: boolean;
}

const Task: React.FC<TaskProps> = ({ id, description, completed }) => {
  const toggleCompletion = useTaskStore((state) => state.toggleTaskCompletion);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  const [isEditing, setIsEditing] = useState(false);

  const handleToggle = () => toggleCompletion(id);
  const handleDelete = () => deleteTask(id);
  const handleEdit = () => setIsEditing(true);
  const handleFormSubmit = () => setIsEditing(false);

  return (
    <div className="flex justify-between items-center p-4 font-semibold text-lg text-custom-background3 bg-custom-background4 my-2 w-full rounded-lg">
      {isEditing ? (
        <TaskForm taskId={id} onFormSubmit={handleFormSubmit} />
      ) : (
        <>
          <div className="flex items-center">
            <button className="mr-2 text-2xl" onClick={handleToggle}>
              {!completed && <AiOutlineCheck />}
            </button>
            <span className={completed ? "line-through" : ""}>{description}</span>
          </div>
          <div className="flex space-x-2">
            <IconButton onClick={handleEdit} icon={<AiOutlineEdit />} />
            <IconButton onClick={handleDelete} icon={<MdDelete />} />
          </div>
        </>
      )}
    </div>
  );
};

const IconButton: React.FC<{ onClick: () => void; icon: JSX.Element }> = ({ onClick, icon }) => (
  <button onClick={onClick} className="text-custom-background3 px-2 py-1 rounded">
    {icon}
  </button>
);

export default Task;