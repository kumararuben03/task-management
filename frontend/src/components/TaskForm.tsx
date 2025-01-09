import React, { useState } from "react";
import Swal from "sweetalert2";
import "../styles/TaskForm.css";
import { Task } from "../types/Task";
import { createTask } from "../services/TaskService"; // Import the createTask service

interface TaskFormProps {
  onTaskCreated: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated }) => {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});

  const validateForm = (): boolean => {
    const newErrors: { title?: string; description?: string } = {};
    const { title, description } = formData;

    if (!title.trim()) newErrors.title = "Title is required";
    else if (!/^[a-zA-Z0-9\s-_]+$/.test(title))
      newErrors.title =
        "Title can only contain letters, numbers, spaces, hyphens, and underscores";

    if (!description.trim()) newErrors.description = "Description is required";
    else if (!/^[a-zA-Z0-9\s-_]+$/.test(description))
      newErrors.description =
        "Description can only contain letters, numbers, spaces, hyphens, and underscores";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (validateForm()) {
      const newTask: Task = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
        isCompleted: false,
        createdAt: new Date().toISOString(),
      };

      try {
        const createdTask = await createTask(newTask);
        Swal.fire({
          title: "Task Created!",
          text: "Your task has been created successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });

        setFormData({ title: "", description: "" });

        // Call the parent handler to add the new task
        onTaskCreated(createdTask);
      } catch (error) {
        console.error("Error creating task:", error);
        Swal.fire({
          title: "Error!",
          text: "There was an error creating your task.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <div className="card mt-5">
      <div className="card-body">
        <h2 className="card-title">Create New Task</h2>
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
        <div className="dialogButtons">
          <button className="btn btn-success" onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
