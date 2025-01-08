import { useState } from "react";
import { Task } from "../types/Task";

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleCreateTask = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      isCompleted: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleEditTask = (editedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === editedTask.id ? editedTask : task))
    );
  };

  const handleDeleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleToggleComplete = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  return {
    tasks,
    handleCreateTask,
    handleEditTask,
    handleDeleteTask,
    handleToggleComplete,
  };
};

export default useTasks; 