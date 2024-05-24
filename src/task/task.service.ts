import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.schema';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async addTask(name: string, userId: string, priority: number): Promise<Task> {
    const createdTask = new this.taskModel({ name, userId, priority });
    return await createdTask.save();
  }

  async getUserTasks(userId: string): Promise<Task[]> {
    return this.taskModel.find({ userId }).exec();
  }

  async resetData(): Promise<void> {
    await this.taskModel.deleteMany({}).exec();
  }

  async getTaskByName(name: string): Promise<Task> {
    return this.taskModel.findOne({ name }).exec();
  }
}
