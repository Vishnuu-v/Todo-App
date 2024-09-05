'use client'
import { useState, useEffect } from "react";
import { useTaskStore } from "@/store/taskStore";
import { AiOutlinePlus } from "react-icons/ai";

interface TaskFormProps {
  taskId?: string;
  onFormSubmit?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ taskId, onFormSubmit }) => {
  const addTask = useTaskStore((state) => state.addTask);
  const updateTask = useTaskStore((state) => state.updateTask);
  const taskToEdit = useTaskStore((state) => state.tasks.find((task) => task.id === taskId));

  const [description, setDescription] = useState(taskToEdit?.description || "");

  useEffect(() => {
    if (taskToEdit) {
      setDescription(taskToEdit.description);
    }
  }, [taskToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (description.trim() === "") return;

    if (taskId) {
      updateTask(taskId, description);
    } else {
      addTask(description);
    }

    setDescription("");

    onFormSubmit?.();
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center items-center mt-4 lg:mt-6 p-4 gap-2 lg:gap-4">
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Add a new task"
        className="border p-2 border-custom-background3 rounded bg-transparent"
      />
      <button type="submit" className="bg-custom-background3 text-white px-4 py-2 rounded">
        {taskId ? "Update" : <AiOutlinePlus className="text-4xl" />}
      </button>
    </form>
  );
};

export default TaskForm;
