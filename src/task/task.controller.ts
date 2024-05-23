import { Controller, Get, Param, Post, Body, BadRequestException, HttpCode } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ApiResponse, ApiBadRequestResponse } from '@nestjs/swagger';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('user/:userId')
  @ApiResponse({ status: 200, description: 'Retrieved user tasks successfully.' })
  @ApiBadRequestResponse({ status: 400, description: 'Invalid userId.' })
  async getUserTasks(@Param('userId') userId: string) {
    if (!isValidObjectId(userId)) {
      console.log('############# invalide')
      throw new BadRequestException('Invalid userId');
    }
    return this.taskService.getUserTasks(userId);
  }

  @Post()
  @HttpCode(201)
  @ApiResponse({ status: 201, description: 'Task created successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid task.' })
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    const { name, userId, priority } = createTaskDto;
    if (!name || !userId || priority <= 0) {
      throw new BadRequestException('Invalid task');
    }
    return this.taskService.addTask(name, userId, priority);
  }
}

function isValidObjectId(id: string): boolean {
  return /^[a-fA-F0-9]{24}$/.test(id);
}
