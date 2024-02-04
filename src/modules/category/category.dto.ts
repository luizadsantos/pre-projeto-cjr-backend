export type CategoryDTO = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CategoryCreateDTO = {
  id?: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CategoryUpdateDTO = {
  id?: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};
