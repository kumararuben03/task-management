import React, { useState } from "react";
import Swal from "sweetalert2";
import "../styles/TaskForm.css";
import { Task } from "../types/Task";

interface TaskFormProps {
  onCreateTask: (title: string, description: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onCreateTask }) => {
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
        "Title can only contain letters, numbers, spaces, hyphens and underscores";

    if (!description.trim()) newErrors.description = "Description is required";
    else if (!/^[a-zA-Z0-9\s-_]+$/.test(title))
      newErrors.title =
        "Title can only contain letters, numbers, spaces, hyphens and underscores";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateForm()) {
      const newTask: Task = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
        isCompleted: false,
        createdAt: new Date().toISOString(),
      };
      onCreateTask(newTask.title, newTask.description);
      Swal.fire({
        title: "Task Created!",
        text: "Your task has been created successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      setFormData({ title: "", description: "" });
      console.log(typeof newTask.id, newTask.id);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
