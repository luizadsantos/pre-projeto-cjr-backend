import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDTO, UpdateTaskDTO } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { responses } from 'src/lib/helpers';

@ApiTags('Tasks routes')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ summary: 'Creates a new task' })
  @ApiResponse({ status: 201, description: responses.task[201].message })
  @ApiResponse({ status: 400, description: responses.task[400].error })
  @ApiResponse({ status: 409, description: responses.task[409].error })
  @Post()
  async create(@Body() data: CreateTaskDTO) {
    return this.taskService.create(data);
  }

  @ApiOperation({ summary: 'Shows all tasks' })
  @ApiResponse({ status: 200, description: responses.task[200].message })
  @Get()
  async showAll() {
    return await this.taskService.showAll();
  }

  @ApiOperation({ summary: 'Shows a task specified by id' })
  @ApiResponse({ status: 200, description: responses.task[200].message })
  @ApiResponse({ status: 400, description: responses.task[400].error })
  @ApiResponse({ status: 404, description: responses.task[404].error })
  @Get(':id')
  async showById(@Param('id') id: string) {
    return await this.taskService.showById(parseInt(id));
  }

  @ApiOperation({ summary: 'Updates a task specified by id' })
  @ApiResponse({ status: 200, description: responses.task[200].message })
  @ApiResponse({ status: 400, description: responses.task[400].error })
  @ApiResponse({
    status: 404,
    description:
      responses.task[404].error + ' or ' + responses.category[404].error,
  })
  @Patch(':id')
  async update(@Body() data: UpdateTaskDTO, @Param('id') id: string) {
    data.id = parseInt(id);
    return await this.taskService.update(data);
  }

  @ApiOperation({ summary: 'Deletes a task specified by id' })
  @ApiResponse({ status: 200, description: responses.task[200].message })
  @ApiResponse({ status: 400, description: responses.task[400].error })
  @ApiResponse({ status: 404, description: responses.task[404].error })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.taskService.delete(parseInt(id));
  }
}
