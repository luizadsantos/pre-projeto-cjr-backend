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

    return {
      data: category,
      statusCode: 201,
    };
  }

  async showAll() {
    return {
      data: await this.prisma.category.findMany(),
      statusCode: 200,
    };
  }

  async showById(id: number) {
    if (isNaN(id)) generateError('category', 400);

    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) generateError('category', 404);

    return {
      data: category,
      statusCode: 200,
    };
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

    return {
      data: category,
      statusCode: 200,
    };
  }

  async delete(id: number) {
    if (isNaN(id)) generateError('category', 400);

    const categoryExists = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!categoryExists) generateError('category', 404);

    return {
      data: await this.prisma.category.delete({ where: { id } }),
      statusCode: 200,
    };
  }
}
