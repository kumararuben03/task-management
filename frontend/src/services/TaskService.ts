import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5229/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getTasks = () => apiClient.get("/List");
export const createTask = (task: any) => apiClient.post("/List", task);
export const updateTask = (id: number, task: any) =>
  apiClient.put(`/List/${id}`, task);
export const deleteTask = (id: number) => apiClient.delete(`/List/${id}`);
