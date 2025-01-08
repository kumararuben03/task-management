import React, { useState } from "react";
import TaskItem from "./TaskItem";
import "./../styles/TaskList.css";
import { Task } from "../types/Task";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setFormData({ title: task.title, description: task.description });
    setShowModal(true);
  };

  const handleToggleComplete = (id: number) => {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updatedTasks = tasks.map((task: Task) =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    onToggleComplete(id);
  };

  const handleClose = () => {
    setShowModal(false);
    setFormData({ title: "", description: "" });
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

  const handleCreateOrEdit = () => {
    if (validateForm()) {
      const updatedTask = {
        id: selectedTask ? selectedTask.id : Date.now(),
        title: formData.title,
        description: formData.description,
        isCompleted: selectedTask ? selectedTask.isCompleted : false,
        createdAt: selectedTask
          ? selectedTask.createdAt
          : new Date().toISOString(),
      };
      if (selectedTask) {
        onEdit(updatedTask);
        const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        const updatedTasks = tasks.map((task: Task) =>
          task.id === selectedTask.id ? updatedTask : task
        );
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        Swal.fire({
          title: "Task Updated!",
          text: "Your task has been updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        tasks.push(updatedTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
      handleClose();
    }
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(id);
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
      }
    });
  };

  return (
    <>
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
                setFormData({ ...formData, title: e.target.value })
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
