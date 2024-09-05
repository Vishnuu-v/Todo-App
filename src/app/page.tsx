import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TasksList";

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen items-center bg-custom-background text-white py-10 lg:py-20'>
      <div className="flex flex-col items-center h-auto bg-custom-background2 w-5/6 lg:w-1/3 rounded-2xl text-xl">
        <TaskForm />
        <TaskList />
      </div>
    </div>
  );
}
