import React, { useEffect, useState } from "react";
import { Task } from "../types";
import { TaskStatus } from "../enum";

interface TaskFormModalProps {
  initialData: Task | null;
  onAddTask: (task: Omit<Task, "id">) => void;
  onUpdateTask: (task: Task) => void;
  onCancel: () => void;
}

const TaskFormModal = ({
  initialData,
  onAddTask,
  onUpdateTask,
  onCancel,
}: TaskFormModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.TODO);

  const header = initialData ? "Update Task " : " Add New Task";
  const action = initialData ? "Update" : "Add";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (initialData) {
      onUpdateTask({ id: initialData.id, title, description, status });
    } else {
      onAddTask({ title, description, status });
      setTitle("");
      setDescription("");
      setStatus(TaskStatus.TODO);
    }
  };

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setStatus(initialData.status);
    }
  }, [initialData]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-[#202127] p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-xl font-normal mb-4 text-slate-100">{header}</h2>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-normal text-slate-100 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 text-slate-100 py-2 bg-[#202127] border border-[#3c3f44] rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-normal text-slate-100 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 text-slate-100 bg-[#202127] border border-[#3c3f44] rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            rows={3}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-sm font-normal text-slate-100 mb-1"
          >
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as Task["status"])}
            className="w-full px-3 py-2 bg-[#202127] border border-[#3c3f44] rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 text-slate-100"
          >
            <option value={TaskStatus.TODO}>To Do</option>
            <option value={TaskStatus.INPROGRESS}>In Progress</option>
            <option value={TaskStatus.DONE}>Done</option>
          </select>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-slate-100   rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            {action}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskFormModal;
