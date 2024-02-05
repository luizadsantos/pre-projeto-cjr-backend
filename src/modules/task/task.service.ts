import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { TaskCreateDTO, TaskUpdateDTO } from './task.dto';
import { CategoryDTO } from '../category/category.dto';
import { categoryResponses } from '../category/category.service';

export const taskResponses = {
  409: 'This task already exists',
  404: 'Task not found',
  400: 'Invalid request format',
  201: 'Task successfully created!',
  200: 'Successful operation',
};

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(data: TaskCreateDTO) {
    if (!data.name)
      throw new Error(taskResponses[400] + ' - Error code: ' + 400);

    const taskExists = await this.prisma.task.findFirst({
      where: {
        name: data.name,
      },
    });

    if (taskExists)
      throw new Error(taskResponses[409] + ' - Error code: ' + 409);

    if (data?.categoryId) {
      const categoryExists: CategoryDTO = await this.prisma.category.findUnique(
        {
          where: {
            id: data.categoryId,
          },
        },
      );

      if (!categoryExists)
        throw new Error(categoryResponses[404] + ' - Error code: ' + 404);
    }

    const task = await this.prisma.task.create({
      data: {
        name: data.name,
        isActive: data.isActive,
        categoryId: data?.categoryId,
      },
    });

    return task;
  }

  async showAll() {
    return await this.prisma.task.findMany();
  }

  async showById(id: number) {
    if (isNaN(id))
      throw new Error(taskResponses[400] + ' - Error Code: ' + 400);

    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) throw new Error(taskResponses[404] + ' - Error Code: ' + 404);

    return task;
  }

  async update(data: TaskUpdateDTO) {
    if (isNaN(data.id))
      throw new Error(taskResponses[400] + ' - Error Code: ' + 400);

    const taskExists = await this.prisma.task.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!taskExists)
      throw new Error(taskResponses[404] + ' - Error Code: ' + 404);

    if (data?.categoryId) {
      const categoryExists = await this.prisma.category.findUnique({
        where: {
          id: data.categoryId,
        },
      });

      if (!categoryExists)
        throw new Error(categoryResponses[404] + ' - Error Code: ' + 404);
    }

    const task = await this.prisma.task.update({
      data: {
        id: data.id,
        name: data.name,
        isActive: data.isActive,
        categoryId: data?.categoryId,
      },
      where: {
        id: data.id,
      },
    });

    return task;
  }

  async delete(id: number) {
    if (isNaN(id))
      throw new Error(taskResponses[400] + ' - Error Code: ' + 400);

    const taskExists = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!taskExists)
      throw new Error(taskResponses[404] + ' - Error Code: ' + 404);

    return await this.prisma.task.delete({ where: { id } });
  }
}
