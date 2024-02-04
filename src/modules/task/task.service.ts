import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { TaskCreateDTO } from './task.dto';
import { CategoryDTO } from '../category/category.dto';
import { categoryResponses } from '../category/category.service';

export const taskResponses = {
  409: 'This task already exists',
  404: "This task doesn't exist",
  400: "There isn't a categoryId or a categoryName",
  200: 'Task successfully created!',
};

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(data: TaskCreateDTO) {
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
    } else {
      throw new Error(taskResponses[400] + ' - Error code: ' + 400);
    }

    const currentDate = new Date();

    const task = await this.prisma.task.create({
      data: {
        name: data.name,
        isActive: data.isActive,
        categoryId: data.categoryId,
        createdAt: currentDate.toISOString(),
        updatedAt: currentDate.toISOString(),
      },
    });

    console.log(taskResponses[200], data);

    return task;
  }

  async showAll() {
    return await this.prisma.task.findMany();
  }

  async showById(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) throw new Error(taskResponses[404] + ' - Error Code: ' + 404);

    return task;
  }
}
