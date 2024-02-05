import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService, categoryResponses } from './category.service';
import { CategoryDTO, CategoryUpdateDTO } from './category.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories routes')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, description: categoryResponses[201] })
  @ApiResponse({ status: 400, description: categoryResponses[400] })
  @ApiResponse({ status: 409, description: categoryResponses[409] })
  @Post()
  async create(@Body() data: CategoryDTO) {
    return await this.categoryService.create(data);
  }

  @ApiOperation({ summary: 'Show all categories' })
  @ApiResponse({ status: 200, description: categoryResponses[200] })
  @Get()
  async showAll() {
    return await this.categoryService.showAll();
  }

  @ApiOperation({ summary: 'Show a category specified by id' })
  @ApiResponse({ status: 200, description: categoryResponses[200] })
  @ApiResponse({ status: 400, description: categoryResponses[400] })
  @ApiResponse({ status: 404, description: categoryResponses[404] })
  @Get(':id')
  async showById(@Param('id') id: string) {
    return await this.categoryService.showById(parseInt(id));
  }

  @ApiOperation({ summary: 'Update a category specified by id' })
  @ApiResponse({ status: 200, description: categoryResponses[200] })
  @ApiResponse({ status: 400, description: categoryResponses[400] })
  @ApiResponse({ status: 404, description: categoryResponses[404] })
  @Patch(':id')
  async update(@Body() data: CategoryUpdateDTO, @Param('id') id: string) {
    data.id = parseInt(id);
    return await this.categoryService.update(data);
  }

  @ApiOperation({ summary: 'Delete a category specified by id' })
  @ApiResponse({ status: 200, description: categoryResponses[200] })
  @ApiResponse({ status: 400, description: categoryResponses[400] })
  @ApiResponse({ status: 404, description: categoryResponses[404] })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.categoryService.delete(parseInt(id));
  }
}
