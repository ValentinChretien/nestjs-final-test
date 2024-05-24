import { Controller, Post, Body, BadRequestException, ConflictException, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse, ApiOperation, ApiBadRequestResponse, ApiConflictResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a new user'})
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiBadRequestResponse({ status: 400, description: 'Invalid user data'})
  @ApiConflictResponse({ status: 409, description: 'User already exists'})
  async createUser(@Body() body: any) {
    const { email } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new BadRequestException('Invalid email');
    }

    const existingUser = await this.userService.getUser(email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    try{
      await this.userService.addUser(email)
      return {
        status: 201,
        description: "User created successfully",
      }
    } catch(e) {
      console.log(e);
    }
  }
}
