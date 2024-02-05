export class UpdateTaskDTO {
  id?: number;
  name: string;
  isActive: boolean;
  categoryId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
