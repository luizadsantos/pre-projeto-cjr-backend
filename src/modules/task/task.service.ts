import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { TaskDTO } from './task.dto';
import { CategoryDTO } from '../category/category.dto';

export const taskResponses = {
  409: 'This task already exists',
  404: "This task doesn't exist",
  400: "There isn't a categoryId or a categoryName",
  200: 'Task successfully created!',
};

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(data: TaskDTO) {
    const taskExists = await this.prisma.task.findFirst({
      where: {
        name: data.name,
      },
    });

    if (taskExists)
      throw new Error(taskResponses[409] + ' - Error code: ' + 409);

    if (!data?.categoryId && data?.categoryName) {
      const categoryExists: CategoryDTO = await this.prisma.category.findFirst({
        where: {
          name: data.categoryName,
        },
      });

      if (!categoryExists)
        throw new Error(taskResponses[404] + ' - Error code: ' + 404);

      data.categoryId = categoryExists.id;
    } else if (data?.categoryId) {
      const categoryExists: CategoryDTO = await this.prisma.category.findFirst({
        where: {
          id: data.categoryId,
        },
      });

      if (!categoryExists)
        throw new Error(taskResponses[404] + ' - Error code: ' + 404);
    } else {
      throw new Error(taskResponses[400] + ' - Error code: ' + 400);
    }

    const task = await this.prisma.task.create({
      data: {
        name: data.name,
        description: data.description,
        categoryId: data.categoryId,
      },
    });

    console.log(taskResponses[200], data);

    return task;
  }

  async showAll() {
    return await this.prisma.task.findMany();
  }

  async showById(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) throw new Error(taskResponses[400] + ' - Error Code: ' + 400);

    return task;
  }

  async showByName(name: string) {
    const task = await this.prisma.task.findUnique({
      where: { name },
    });

    if (!task) throw new Error(taskResponses[400] + ' - Error Code: ' + 400);

    return task;
  }
}
