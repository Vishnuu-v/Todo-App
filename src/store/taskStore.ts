import {create} from 'zustand';

interface Task {
    id: string;
    description: string;
    completed: boolean;  
}

interface TaskState {
    tasks: Task[];
    addTask: (description: string) => void;
    updateTask: (id: string, description: string) =>void;
    toggleTaskCompletion: (id: string) => void;
    deleteTask: (id:string) => void;
}

const loadTasksFromLocalStorage = ():Task[] => {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  }

export const useTaskStore = create<TaskState>((set) => ({
    tasks: loadTasksFromLocalStorage(),
    addTask: (description) =>
        set((state) => {
          const newTask: Task = {
            id: Date.now().toString(),
            description,
            completed: false,
          };
          const updatedTasks = [...state.tasks, newTask];
          localStorage.setItem('tasks', JSON.stringify(updatedTasks)); 
          return { tasks: updatedTasks };
        }),
    updateTask: (id, description) =>
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, description, updatedAt: new Date() } : task
      );
      localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save to localStorage
      return { tasks: updatedTasks };
    }),
    toggleTaskCompletion: (id) =>
        set((state) => {
            const updatedTasks = state.tasks.map((task) => 
            task.id === id ? {...task, completed: !task.completed} : task
        );
        localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save to localStorage
      return { tasks: updatedTasks };

    }),
    deleteTask: (id) => 
        set((state) => {
            const updatedTasks = state.tasks.filter((task) => task.id !== id);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            return {tasks: updatedTasks};
        }),
  }));