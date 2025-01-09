import axios, { AxiosResponse } from "axios";
import { Task } from "../types/Task"; // Assuming you have the Task type defined

const apiClient = axios.create({
  baseURL: "http://localhost:5229/api", // Ensure this is the correct base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// GET - Fetch all tasks
export const getTasks = async (): Promise<Task[]> => {
  try {
    const response: AxiosResponse<Task[]> = await apiClient.get("/List");
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

// POST - Create a new task
export const createTask = async (task: Task): Promise<Task> => {
  try {
    const response: AxiosResponse<Task> = await apiClient.post("/List", task);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

// PUT - Update an existing task
export const updateTask = async (id: number, task: Task): Promise<Task> => {
  try {
    const response: AxiosResponse<Task> = await apiClient.put(
      `/List/${id}`,
      task
    );
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

// DELETE - Delete a task
export const deleteTask = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`/List/${id}`);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
