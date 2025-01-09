import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import "./../styles/TaskList.css";
import { Task } from "../types/Task";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/TaskService"; // Adjust the import path accordingly

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]); // Initialize tasks state
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    isCompleted: false,
  });
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});

  // Fetch tasks from the backend on initial load
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      isCompleted: task.isCompleted,
    });
    setShowModal(true);
  };

  const handleToggleComplete = (id: number) => {
    onToggleComplete(id); // Backend integration can be done here too if needed
  };

  const handleClose = () => {
    setShowModal(false);
    setFormData({ title: "", description: "", isCompleted: false });
  };

  const validateForm = (): boolean => {
    const newErrors: { title?: string; description?: string } = {};
    const { title, description } = formData;

    if (!title.trim()) newErrors.title = "Title is required";
    else if (title.length < 3 || title.length > 50)
      newErrors.title = "Title must be between 3 and 50 characters";
    else if (!/^[a-zA-Z0-9\s-_]+$/.test(title))
      newErrors.title =
        "Title can only contain letters, numbers, spaces, hyphens and underscores";

    if (!description.trim()) newErrors.description = "Description is required";
    else if (description.length < 10 || description.length > 200)
      newErrors.description =
        "Description must be between 10 and 200 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateOrEdit = async () => {
    if (validateForm()) {
      const updatedTask = {
        id: selectedTask ? selectedTask.id : Date.now(),
        title: formData.title,
        description: formData.description,
        isCompleted: !!formData.isCompleted,
        createdAt: selectedTask
          ? new Date().toISOString() // Update to current date on edit
          : new Date().toISOString(), // Current date for new tasks
      };

      try {
        if (selectedTask) {
          // Update existing task via API
          const updatedTaskResponse = await updateTask(
            selectedTask.id,
            updatedTask
          );
          setTasks(
            tasks.map((task) =>
              task.id === updatedTaskResponse.id ? updatedTaskResponse : task
            )
          );
          Swal.fire({
            title: "Task Updated!",
            text: "Your task has been updated successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });
        } else {
          // Create a new task via API
          const newTaskResponse = await createTask(updatedTask);
          setTasks([...tasks, newTaskResponse]);
          Swal.fire({
            title: "Task Created!",
            text: "Your task has been created successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });
        }
        handleClose(); // Close modal after success
      } catch (error) {
        console.error("Error creating/updating task:", error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteTask(id); // Call backend to delete the task
          setTasks(tasks.filter((task) => task.id !== id)); // Remove from local state
          Swal.fire("Deleted!", "Your task has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting task:", error);
        }
      }
    });
  };

  const handleTaskCreated = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <>
      <TaskForm onTaskCreated={handleTaskCreated} />
      <h2 className="text-center fw-bold mt-5">Task List</h2>
      <div className="table-responsive">
        <table className="table table-hover custom-table">
          <thead>
            <tr>
              <th className="text-center">Title</th>
              <th className="text-center">Description</th>
              <th className="text-center">Status</th>
              <th className="text-center">Created At</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={handleEdit}
                onDelete={() => handleDelete(task.id)}
                onToggleComplete={() => handleToggleComplete(task.id)}
              />
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedTask ? "Edit Task" : "Create New Task"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="formGroup">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
              placeholder="Enter task title"
              className={`form-control ${errors.title ? "error-input" : ""}`}
            />
            {errors.title && (
              <span className="error-message">{errors.title}</span>
            )}
          </div>

          <div className="formGroup">
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Enter task description"
              className={`form-control ${
                errors.description ? "error-input" : ""
              }`}
            />
            {errors.description && (
              <span className="error-message">{errors.description}</span>
            )}
          </div>

          <div className="formGroup">
            <label>Status</label>
            <select
              name="isCompleted"
              value={formData.isCompleted ? "true" : "false"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  isCompleted: e.target.value === "true", // Convert string to boolean
                })
              }
              className="form-control"
            >
              <option value="true">Completed</option>
              <option value="false">Not Completed</option>
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={handleCreateOrEdit}>
            {selectedTask ? "Save" : "Create"}
          </button>
          <button className="btn btn-secondary" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>

      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          {Array.from(
            { length: Math.ceil(tasks.length / tasksPerPage) },
            (_, index) => (
              <li
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                key={index + 1}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </nav>
    </>
  );
};

export default TaskList;
