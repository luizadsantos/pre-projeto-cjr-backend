import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService, taskResponses } from './task.service';
import { CreateTaskDTO, UpdateTaskDTO } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { categoryResponses } from '../category/category.service';

@ApiTags('Tasks routes')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: taskResponses[201] })
  @ApiResponse({ status: 400, description: taskResponses[400] })
  @ApiResponse({ status: 409, description: taskResponses[409] })
  @Post()
  async create(@Body() data: CreateTaskDTO) {
    return this.taskService.create(data);
  }

  @ApiOperation({ summary: 'Show all tasks' })
  @ApiResponse({ status: 200, description: taskResponses[200] })
  @Get()
  async showAll() {
    return await this.taskService.showAll();
  }

  @ApiOperation({ summary: 'Show a task specified by id' })
  @ApiResponse({ status: 200, description: taskResponses[200] })
  @ApiResponse({ status: 400, description: taskResponses[400] })
  @ApiResponse({ status: 404, description: taskResponses[404] })
  @Get(':id')
  async showById(@Param('id') id: string) {
    return await this.taskService.showById(parseInt(id));
  }

  @ApiOperation({ summary: 'Update a task specified by id' })
  @ApiResponse({ status: 200, description: taskResponses[200] })
  @ApiResponse({ status: 400, description: taskResponses[400] })
  @ApiResponse({
    status: 404,
    description: taskResponses[404] + ' or ' + categoryResponses[404],
  })
  @Patch(':id')
  async update(@Body() data: UpdateTaskDTO, @Param('id') id: string) {
    data.id = parseInt(id);
    return await this.taskService.update(data);
  }

  @ApiOperation({ summary: 'Delete a task specified by id' })
  @ApiResponse({ status: 200, description: taskResponses[200] })
  @ApiResponse({ status: 400, description: taskResponses[400] })
  @ApiResponse({ status: 404, description: taskResponses[404] })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.taskService.delete(parseInt(id));
  }
}
