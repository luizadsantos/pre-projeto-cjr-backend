import { Module } from '@nestjs/common';
import { PrismaService } from './database/PrismaService';
import { TaskService } from './modules/task/task.service';
import { TaskController } from './modules/task/task.controller';
import { CategoryController } from './modules/category/category.controller';
import { CategoryService } from './modules/category/category.service';

@Module({
  controllers: [TaskController, CategoryController],
  providers: [PrismaService, TaskService, CategoryService],
})
export class AppModule {}
