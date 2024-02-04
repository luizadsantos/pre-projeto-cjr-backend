import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { TaskDTO } from './task.dto';
import { CategoryDTO } from '../category/category.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(data: TaskDTO) {
    const taskExists = await this.prisma.task.findFirst({
      where: {
        name: data.name,
      },
    });

    if (taskExists) throw new Error('This task already exists');

    if (!data?.categoryId && data?.categoryName) {
      const categoryExists: CategoryDTO = await this.prisma.category.findFirst({
        where: {
          name: data.categoryName,
        },
      });

      if (!categoryExists) throw new Error("This categoryName doesn't exist");

      data.categoryId = categoryExists.id;
    } else if (data?.categoryId) {
      const categoryExists: CategoryDTO = await this.prisma.category.findFirst({
        where: {
          id: data.categoryId,
        },
      });

      if (!categoryExists) throw new Error("This categoryId doesn't exist");
    } else {
      throw new Error("There isn't a categoryId or a categoryName");
    }

    const task = await this.prisma.task.create({
      data: {
        name: data.name,
        description: data.description,
        categoryId: data.categoryId,
      },
    });

    console.log('Task successfully created!', data);

    return task;
  }
}
