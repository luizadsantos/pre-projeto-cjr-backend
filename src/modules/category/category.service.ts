import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CategoryDTO } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: CategoryDTO) {
    const categoryExists = await this.prisma.category.findFirst({
      where: {
        name: data.name,
      },
    });

    if (categoryExists) throw new Error('This category already exists');

    const category = await this.prisma.category.create({ data });

    console.log('Category successfully created!', data);

    return category;
  }
}
