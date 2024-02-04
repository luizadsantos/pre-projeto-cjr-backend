import { Body, Controller, Post } from '@nestjs/common';
import { CategoryService, categoryResponses } from './category.service';
import { CategoryDTO } from './category.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories routes')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 200, description: categoryResponses[200] })
  @ApiResponse({ status: 409, description: categoryResponses[409] })
  @Post()
  async create(@Body() data: CategoryDTO) {
    return this.categoryService.create(data);
  }
}
