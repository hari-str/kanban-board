import { TaskStatus } from "./enum";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus.TODO | TaskStatus.INPROGRESS | TaskStatus.DONE;
};
