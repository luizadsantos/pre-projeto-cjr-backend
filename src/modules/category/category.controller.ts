import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDTO, UpdateCategoryDTO } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { responses } from 'src/lib/helpers';

@ApiTags('Categories routes')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Creates a new category' })
  @ApiResponse({ status: 201, description: responses.category[201].message })
  @ApiResponse({ status: 400, description: responses.category[400].error })
  @ApiResponse({ status: 409, description: responses.category[409].error })
  @Post()
  async create(@Body() data: CreateCategoryDTO) {
    return await this.categoryService.create(data);
  }

  @ApiOperation({ summary: 'Shows all categories' })
  @ApiResponse({ status: 200, description: responses.category[200].message })
  @Get()
  async showAll() {
    return await this.categoryService.showAll();
  }

  @ApiOperation({ summary: 'Shows a category specified by id' })
  @ApiResponse({ status: 200, description: responses.category[200].message })
  @ApiResponse({ status: 400, description: responses.category[400].error })
  @ApiResponse({ status: 404, description: responses.category[404].error })
  @Get(':id')
  async showById(@Param('id') id: string) {
    return await this.categoryService.showById(parseInt(id));
  }

  @ApiOperation({ summary: 'Updates a category specified by id' })
  @ApiResponse({ status: 200, description: responses.category[200].message })
  @ApiResponse({ status: 400, description: responses.category[400].error })
  @ApiResponse({ status: 404, description: responses.category[404].error })
  @Patch(':id')
  async update(@Body() data: UpdateCategoryDTO, @Param('id') id: string) {
    data.id = parseInt(id);
    return await this.categoryService.update(data);
  }

  @ApiOperation({ summary: 'Deletes a category specified by id' })
  @ApiResponse({ status: 200, description: responses.category[200].message })
  @ApiResponse({ status: 400, description: responses.category[400].error })
  @ApiResponse({ status: 404, description: responses.category[404].error })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.categoryService.delete(parseInt(id));
  }
}
