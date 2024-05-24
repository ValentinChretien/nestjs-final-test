import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async addUser(email: string): Promise<User> {
      const createdUser = new this.userModel({ email });
      return await createdUser.save();
  }

  async getUser(email: string): Promise<User|Boolean> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      return false;
    }
    return user;
  }

  async resetData(): Promise<void> {
    await this.userModel.deleteMany({}).exec();
  }
}
