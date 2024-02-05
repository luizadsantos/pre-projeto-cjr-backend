export class CreateTaskDTO {
  id?: number;
  name: string;
  isActive?: boolean;
  categoryId: number;
  createdAt?: Date;
  updatedAt?: Date;
}
