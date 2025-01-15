import { useMemo } from "react";

import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Task } from "../types";
import TaskItem from "./TaskItem";

interface ColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  onEditTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const Column = ({
  id,
  title,
  tasks,
  onEditTask,
  onDeleteTask,
}: ColumnProps) => {
  const { setNodeRef } = useSortable({
    id: id,
    data: {
      type: "Column",
      status: id,
    },
  });
  const tasksIds = useMemo(() => tasks.map((t) => t.id), [tasks]);

  return (
    <div
      ref={setNodeRef}
      className={`border  bg-[#1b1b1f] border-[#3c3f44] p-4 shadow-md  h-[700px] max-h-[700px] rounded-md flex flex-col `}
    >
      <div className="flex justify-between items-center text-slate-50">
        <h2 className="text-lg font-semibold mb-4 text-inherit">{title}</h2>
        <p className="font-medium text-inherit">{tasks.length}</p>
      </div>
      <div className="flex flex-col gap-4 overflow-y-scroll overflow-x-hidden pr-2">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEditTask={onEditTask}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </SortableContext>
      </div>

      {tasks.length === 0 && (
        <div className="text-slate-50 text-center mt-4">
          No tasks in this column
        </div>
      )}
    </div>
  );
};

export default Column;
