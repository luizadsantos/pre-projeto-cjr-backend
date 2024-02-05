import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateCategoryDTO, UpdateCategoryDTO } from './dto';
import { generateError, responses } from 'src/lib/helpers';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCategoryDTO) {
    if (!data.name) generateError('category', 400);

    const categoryExists = await this.prisma.category.findUnique({
      where: {
        name: data.name,
      },
    });

    if (categoryExists) generateError('category', 409);

    const category = await this.prisma.category.create({
      data: {
        name: data.name,
      },
    });

    console.log(responses.category[201].message, data);

    return category;
  }

  async showAll() {
    return await this.prisma.category.findMany();
  }

  async showById(id: number) {
    if (isNaN(id)) generateError('category', 400);

    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) generateError('category', 404);

    return category;
  }

  async update(data: UpdateCategoryDTO) {
    if (isNaN(data.id)) generateError('category', 400);

    const categoryExists = await this.prisma.category.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!categoryExists) generateError('category', 404);

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
    if (isNaN(id)) generateError('category', 400);

    const categoryExists = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!categoryExists) generateError('category', 404);

    return await this.prisma.category.delete({ where: { id } });
  }
}
