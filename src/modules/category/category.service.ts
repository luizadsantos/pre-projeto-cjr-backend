import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CategoryDTO } from './category.dto';

export const categoryResponses = {
  404: 'Category not found',
  409: 'This category already exists',
  200: 'Category successfully created!',
};

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: CategoryDTO) {
    const categoryExists = await this.prisma.category.findUnique({
      where: {
        name: data.name,
      },
    });

    if (categoryExists)
      throw new Error(categoryResponses[409] + ' - Error Code: ' + 409);

    const category = await this.prisma.category.create({ data });

    console.log(categoryResponses[200], data);

    return category;
  }

  async showAll() {
    return await this.prisma.category.findMany();
  }

  async showById(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category)
      throw new Error(categoryResponses[404] + ' - Error Code: ' + 404);

    return category;
  }

  async showByName(name: string) {
    const category = await this.prisma.category.findUnique({
      where: { name },
    });

    if (!category)
      throw new Error(categoryResponses[404] + ' - Error Code: ' + 404);

    return category;
  }
}
