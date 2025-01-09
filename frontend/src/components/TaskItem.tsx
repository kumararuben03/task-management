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
  const formattedDate = new Date(task.createdAt).toLocaleString();

  // console.log(dateOnlyString);
  // console.log(parsedDate);
  // console.log(isValidDate);
  // console.log(formattedDate);
  return (
    <tr>
      <td className="text-center">{task.title}</td>
      <td className="text-center">{task.description}</td>
      <td className="text-center">
        {task.isCompleted ? "Completed" : "Not Completed"}
      </td>
      <td className="text-center">{formattedDate}</td>
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
