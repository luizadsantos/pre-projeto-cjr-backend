import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CategoryCreateDTO, CategoryUpdateDTO } from './category.dto';

export const categoryResponses = {
  400: 'Invalid request format',
  404: 'Category not found',
  409: 'This category already exists',
  201: 'Category successfully created!',
  200: 'Successful operation',
};

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: CategoryCreateDTO) {
    if (!data.name)
      throw new Error(categoryResponses[400] + ' - Error code: ' + 400);

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

    console.log(categoryResponses[201], data);

    return category;
  }

  async showAll() {
    return await this.prisma.category.findMany();
  }

  async showById(id: number) {
    if (isNaN(id))
      throw new Error(categoryResponses[400] + ' - Error Code: ' + 400);

    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category)
      throw new Error(categoryResponses[404] + ' - Error Code: ' + 404);

    return category;
  }

  async update(data: CategoryUpdateDTO) {
    if (isNaN(data.id))
      throw new Error(categoryResponses[400] + ' - Error Code: ' + 400);

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
    if (isNaN(id))
      throw new Error(categoryResponses[400] + ' - Error Code: ' + 400);

    const categoryExists = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!categoryExists)
      throw new Error(categoryResponses[404] + ' - Error Code: ' + 404);

    return await this.prisma.category.delete({ where: { id } });
  }
}
