import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CategoryCreateDTO, CategoryUpdateDTO } from './category.dto';

export const categoryResponses = {
  404: 'Category not found',
  409: 'This category already exists',
  200: 'Category successfully created!',
};

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: CategoryCreateDTO) {
    const categoryExists = await this.prisma.category.findUnique({
      where: {
        name: data.name,
      },
    });

    if (categoryExists)
      throw new Error(categoryResponses[409] + ' - Error Code: ' + 409);

    const category = await this.prisma.category.create({
      data: {
        name: data.name,
      },
    });

    console.log(categoryResponses[200], data);

    return category;
  }

  async showAll() {
    return await this.prisma.category.findMany();
  }

  async showById(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category)
      throw new Error(categoryResponses[404] + ' - Error Code: ' + 404);

    return category;
  }

  async update(data: CategoryUpdateDTO) {
    const categoryExists = await this.prisma.category.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!categoryExists)
      throw new Error(categoryResponses[404] + ' - Error Code: ' + 404);

    const category = await this.prisma.category.update({
      data: {
        name: data.name,
        id: data.id,
      },
      where: {
        id: data.id,
      },
    });

    return category;
  }

  async delete(id: number) {
    const categoryExists = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!categoryExists)
      throw new Error(categoryResponses[404] + ' - Error Code: ' + 404);

    return await this.prisma.category.delete({ where: { id } });
  }
}
