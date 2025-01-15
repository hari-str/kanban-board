import { Task } from "../types";
import axios from "./axios";

const API_BASE_URL = "http://localhost:3500";

//get task
export async function getTasks() {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

//create task
export async function createTasks(payload: Omit<Task, "id">) {
  try {
    const response = await axios.post(`${API_BASE_URL}/tasks`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}

//update task
export async function updateTask(payload: Task) {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/tasks/${payload.id}`,
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

//delete task
export async function deleteTask(id: string) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/tasks/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
