export class UpdateColumnTasksDto {
  id: string;
  tasks: TasksToUpdate[];
}

export type TasksToUpdate = {
  id: string;
  columnId: string;
  order: number;
};
