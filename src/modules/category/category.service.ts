import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CategoryDTO } from './category.dto';

export const categoryResponses = {
  409: 'This category already exists',
  200: 'Category successfully created!',
};

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: CategoryDTO) {
    const categoryExists = await this.prisma.category.findFirst({
      where: {
        name: data.name,
      },
    });

    if (categoryExists)
      throw new Error(categoryResponses[409] + ' Error Code: ' + 409);

    const category = await this.prisma.category.create({ data });

    console.log(categoryResponses[200], data);

    return category;
  }
}
