import { Task } from "../types";
import Column from "./Column";
import { TaskStatus } from "../enum";
import { SortableContext } from "@dnd-kit/sortable";

interface KanbanBoardProps {
  tasks: Task[];
  onEditTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const KanbanBoard = ({ tasks, onEditTask, onDeleteTask }: KanbanBoardProps) => {
  const columns = [
    { id: TaskStatus.TODO, title: "To Do" },
    { id: TaskStatus.INPROGRESS, title: "In Progress" },
    { id: TaskStatus.DONE, title: "Done" },
  ];

  return (
    <div className="grid grid-cols item-center lg:grid-cols-3 gap-4">
      <SortableContext items={columns.map((c) => c.id)}>
        {columns.map((column) => (
          <Column
            key={column.id}
            id={column.id}
            title={column.title}
            tasks={tasks.filter((task) => task.status === column.id)}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </SortableContext>
    </div>
  );
};

export default KanbanBoard;
