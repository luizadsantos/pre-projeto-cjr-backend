import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
    return await this.categoryService.create(data);
  }

  @ApiOperation({ summary: 'Show all categories' })
  @ApiResponse({ status: 200, description: categoryResponses[200] })
  @Get()
  async showAll() {
    return await this.categoryService.showAll();
  }

  @ApiOperation({ summary: 'Show an specified category by id' })
  @ApiResponse({ status: 200, description: categoryResponses[200] })
  @ApiResponse({ status: 404, description: categoryResponses[404] })
  @Get(':id')
  async showById(@Param('id') id: string) {
    return await this.categoryService.showById(id);
  }

  @ApiOperation({ summary: 'Show an specified category by name' })
  @ApiResponse({ status: 200, description: categoryResponses[200] })
  @ApiResponse({ status: 404, description: categoryResponses[404] })
  @Get('name/:name')
  async showByName(@Param('name') name: string) {
    return await this.categoryService.showByName(name);
  }
}
