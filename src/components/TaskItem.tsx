import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "../types";
import TrashIcon from "../icons/TrashIcon";
import PencilIcon from "../icons/PencilIcon";

interface TaskItemProps {
  task: Task;
  isDragged?: boolean;
  onEditTask?: (id: string) => void;
  onDeleteTask?: (id: string) => void;
}

const TaskItem = ({
  task,
  isDragged,
  onEditTask,
  onDeleteTask,
}: TaskItemProps) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    cursor: isDragged ? "grabbing" : "auto",
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-30  border-indigo-700 p-2 h-[100px] min-h-[100px] items-center flex flex-col text-left rounded-xl border-2  cursor-grab relative"
      ></div>
    );
  }

  if (!isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-[#202127] relative h-[100px] min-h-[100px] group/item items-center  text-slate-100 border border-[#3c3f44] p-2  rounded-xl shadow  hover:shadow-md transition-shadow duration-200"
      >
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-2">{task.title}</h3>
          <p className="text-sm">{task.description}</p>
        </div>
        <div className="absolute p-2 -translate-y-1/2 rounded stroke-white right-2 top-1/2  opacity-60 ">
          <div className="flex flex-col gap-1">
            <span>
              <button
                className="group/edit invisible group-hover/item:visible bg-[#3c3f44] p-1 rounded-full hover:opacity-100  hover:bg-[#656b72]"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditTask && onEditTask(task.id);
                }}
              >
                <PencilIcon />
              </button>
            </span>

            <span>
              <button
                className="group/edit invisible group-hover/item:visible bg-[#3c3f44] p-1 rounded-full hover:bg-[#656b72]"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteTask && onDeleteTask(task.id);
                }}
              >
                <TrashIcon />
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  }
};

export default TaskItem;
