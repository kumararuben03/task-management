import React from "react";
import { Task } from "../types/Task";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  return (
    <tr>
      <td className="text-center">{task.title}</td>
      <td className="text-center">{task.description}</td>
      <td className="text-center">
        <input
          type="checkbox"
          className="form-check-input"
          checked={task.isCompleted} // Add this prop
          onChange={() => onToggleComplete(task.id)}
        />
      </td>
      <td className="text-center">
        {new Date(task.createdAt).toLocaleDateString()}
      </td>
      <td className="text-center">
        <button
          className="btn btn-sm btn-primary me-2"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TaskItem;
