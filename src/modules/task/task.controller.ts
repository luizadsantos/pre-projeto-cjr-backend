import { Body, Controller, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDTO } from './task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly categoryService: TaskService) {}

  @Post()
  async create(@Body() data: TaskDTO) {
    return this.categoryService.create(data);
  }
}
