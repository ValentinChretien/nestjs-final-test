import { Controller, Get, Param, Post, Body, BadRequestException, HttpCode, NotFoundException } from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiResponse, ApiParam, ApiOperation, ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { UserService } from '../user/user.service';

@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly userService: UserService
  ) {}

  @Get('user/:userId')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get Tasks for a user'})
  @ApiResponse({ status: 200, description: 'Retrieved user tasks successfully' })
  @ApiBadRequestResponse({ status: 400, description: 'Invalid userId' })
  @ApiParam({ name: 'userId', description: 'ID of the user', type: String })
  async getUserTasks(@Param('userId') userId: string) {

    if (!/^[a-fA-F0-9]{24}$/.test(userId)) {
      throw new BadRequestException('Invalid userId');
    }

    const userTasks = await this.taskService.getUserTasks(userId);

    const userTasksJSON = userTasks.map(task => {
      const { _id, __v, ...taskJSON } = task.toObject(); // Exclude _id and __v from the serialized object
      return { id: _id, ...taskJSON }; // Rename _id to id
    });

    return userTasksJSON;
  }

  @Post()
  @HttpCode(201)
  @ApiResponse({ status: 201, description: 'Task created successfully' })
  @ApiBadRequestResponse({ status: 400, description: 'Invalid task' })
  @ApiNotFoundResponse({ status: 404, description: 'User not found' })
  async createTask(@Body() body: any) {
    const { name, userId, priority } = body;

    if (!name || !userId || isNaN(priority) || priority <= 0) {
      throw new BadRequestException('Invalid task');
    }

    await this.taskService.addTask(name, userId, parseInt(priority));
    return { 
      statusCode: 201, 
      message: 'Task created successfully',
     };
  }
}