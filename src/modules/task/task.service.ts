import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateTaskDTO, UpdateTaskDTO } from './dto';
import { CategoryDTO } from '../category/dto';
import { generateError } from 'src/lib/helpers';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTaskDTO) {
    if (!data.name) generateError('task', 400);

    const taskExists = await this.prisma.task.findFirst({
      where: {
        name: data.name,
      },
    });

    if (taskExists) generateError('task', 409);

    if (data?.categoryId) {
      const categoryExists: CategoryDTO = await this.prisma.category.findUnique(
        {
          where: {
            id: data.categoryId,
          },
        },
      );

      if (!categoryExists) generateError('category', 404);
    }

    const task = await this.prisma.task.create({
      data: {
        name: data.name,
        isActive: data.isActive,
        categoryId: data?.categoryId,
      },
    });

    return {
      data: task,
      statusCode: 201,
    };
  }

  async showAll() {
    return {
      data: await this.prisma.task.findMany(),
      statusCode: 200,
    };
  }

  async showById(id: number) {
    if (isNaN(id)) generateError('task', 400);

    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) generateError('task', 404);

    return {
      data: task,
      statusCode: 200,
    };
  }

  async update(data: UpdateTaskDTO) {
    if (isNaN(data.id)) generateError('task', 400);

    const taskExists = await this.prisma.task.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!taskExists) generateError('task', 404);

    if (data?.categoryId) {
      const categoryExists = await this.prisma.category.findUnique({
        where: {
          id: data.categoryId,
        },
      });

      if (!categoryExists) generateError('category', 404);
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

    return {
      data: task,
      statusCode: 200,
    };
  }

  async delete(id: number) {
    if (isNaN(id)) generateError('task', 400);

    const taskExists = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!taskExists) generateError('task', 404);

    return {
      data: await this.prisma.task.delete({ where: { id } }),
      statusCode: 200,
    };
  }

  async deleteNonActive() {
    const nonActiveTasks = await this.prisma.task.findMany({
      where: {
        isActive: false,
      },
    });

    if (nonActiveTasks.length == 0) return [];

    await this.prisma.task.deleteMany({
      where: {
        isActive: false,
      },
    });

    return {
      data: nonActiveTasks,
      statusCode: 200,
    };
  }
}
