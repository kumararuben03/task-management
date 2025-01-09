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
  const dateOnlyString = task.createdAt; // Example: "2023-10-25"
  const parsedDate = new Date(dateOnlyString); // Convert to JavaScript Date object

  // Check if the date is valid
  const isValidDate = !isNaN(parsedDate.getTime());

  // Format the date for display
  const formattedDate = isValidDate
    ? parsedDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Invalid Date";

  // console.log(dateOnlyString);
  // console.log(parsedDate);
  // console.log(isValidDate);
  // console.log(formattedDate);
  return (
    <tr>
      <td className="text-center">{task.title}</td>
      <td className="text-center">{task.description}</td>
      <td className="text-center">{task.isCompleted ? "True" : "False"}</td>
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
