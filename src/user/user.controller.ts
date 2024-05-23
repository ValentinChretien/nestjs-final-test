import { Controller, Post, Body, BadRequestException, ConflictException, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse, ApiBadRequestResponse, ApiConflictResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid email.' })
  @ApiConflictResponse({ status:409, description: 'User already exists.' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    if (!isValidEmail(email)) {
      throw new BadRequestException('Invalid email');
    }
    try {
      const user = await this.userService.addUser(email);
      return user; // Renvoie l'utilisateur créé
    } catch (e) {
      if (e instanceof ConflictException) {
        throw new ConflictException('User already exists');
      }
      throw new BadRequestException('User already exists');
    }
  }
}

function isValidEmail(email: string): boolean {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
  return re.test(String(email).toLowerCase());
}
