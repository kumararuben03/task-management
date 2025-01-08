import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5283/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getTasks = () => apiClient.get("/tasks");
export const createTask = (task: any) => apiClient.post("/tasks", task);
export const updateTask = (id: number, task: any) =>
  apiClient.put(`/tasks/${id}`, task);
export const deleteTask = (id: number) => apiClient.delete(`/tasks/${id}`);
