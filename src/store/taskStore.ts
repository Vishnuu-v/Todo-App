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
    toogleTaskCompletion: (id: string) => void;
    deleteTask: (id:string) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
    tasks: [],
    addTask: (description) =>
      set((state) => ({
        tasks: [
          ...state.tasks,
          {
            id: Date.now().toString(),
            description,
            completed: false,
          },
        ],
    })),
    updateTask: (id, description) =>
        set((state) => ({
            tasks: state.tasks.map((task) => 
            task.id === id ? {...task, description} : task
         ),
    })),
    toogleTaskCompletion: (id) =>
        set((state) => ({
            tasks: state.tasks.map((task) => 
            task.id === id ? {...task, completed: !task.completed} : task
        ),
    })),
    deleteTask: (id) => 
        set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== id),
        })),
  }));