export type TaskDTO = {
  id: number;
  name: string;
  isActive: boolean;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TaskCreateDTO = {
  id?: number;
  name: string;
  isActive?: boolean;
  categoryId: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TaskUpdateDTO = {
  id?: number;
  name: string;
  isActive: boolean;
  categoryId?: number;
  createdAt?: Date;
  updatedAt?: Date;
};
