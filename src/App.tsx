import { useState, useEffect } from "react";

// dnd kit
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  DragOverEvent,
} from "@dnd-kit/core";

import KanbanBoard from "./components/KanbanBoard";
import TaskFormModal from "./components/TaskFormModal";
import { Task } from "./types";
import { createTasks, deleteTask, getTasks, updateTask } from "./utils/api";
import PlusIcon from "./icons/PlusIcon";
import TaskItem from "./components/TaskItem";
import { createPortal } from "react-dom";
import { TaskStatus } from "./enum";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAddingTask, setIsAddingTask] = useState<boolean>(false);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [newStatus, setNewStatus] = useState<TaskStatus | null>(null);
  const [editTask, setEditTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  useEffect(() => {
    const loadTasks = async () => {
      const reponseTasks = await getTasks();
      setTasks(reponseTasks);
    };
    loadTasks();
  }, []);

  //handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current?.task);
      return;
    }
  };

  // handle drag over
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverAColumn = over.data.current?.type === "Column";

    if (isActiveATask && isOverAColumn) {
      setNewStatus(over.id as TaskStatus);
    }
  };

  //handle drag end
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || !newStatus) return;
    const activeTask = tasks.find((task) => task.id === active.id);
    if (activeTask && activeTask.status !== newStatus) {
      const updatedTask = { ...activeTask, status: newStatus };
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );

      try {
        await updateTask(updatedTask);
      } catch (error) {
        console.error("Failed to update task:", error);
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === activeTask.id ? activeTask : task
          )
        );
      }
    }
    setNewStatus(null);
  };

  //handle drag cancel
  // const handleDragCancel = () => {
  //   setActiveTask(null);
  // };

  //handle add task
  const handleAddTask = async (newTask: Omit<Task, "id">) => {
    const createdTask = await createTasks(newTask);
    setTasks((prev) => [...prev, createdTask]);
    setIsAddingTask(false);
  };

  //handle edit task
  const handleEditTask = async (id: string) => {
    const eTask = tasks.find((t) => t.id === id);
    if (eTask) {
      setEditTask(eTask);
      setIsAddingTask(true);
    }
  };

  //handle delete task
  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  //handle update task
  const handleUpdateTask = async (newTask: Task) => {
    await updateTask(newTask);
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === newTask.id ? newTask : task))
    );
    setIsAddingTask(false);
  };

  return (
    <div className="container min-h-screen mx-auto p-4 overflow-x-auto overflow-y-hidden">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg  lg:text-3xl font-bold  text-slate-100">
          Kanban Board
        </h1>
        <button
          className="border text-xs lg:text-sm flex items-center border-purple-600 hover:bg-[#1b1b1f] text-white font-bold py-1 px-2 rounded-md"
          onClick={() => setIsAddingTask(true)}
        >
          <PlusIcon />
          Add New Task
        </button>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        // onDragCancel={handleDragCancel}
      >
        <KanbanBoard
          tasks={tasks}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />

        {createPortal(
          <DragOverlay>
            {activeTask && <TaskItem task={activeTask} isDragged={true} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>

      {/* Add task form */}
      {isAddingTask && (
        <TaskFormModal
          initialData={editTask}
          onAddTask={handleAddTask}
          onUpdateTask={handleUpdateTask}
          onCancel={() => {
            setIsAddingTask(false);
            setEditTask(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
