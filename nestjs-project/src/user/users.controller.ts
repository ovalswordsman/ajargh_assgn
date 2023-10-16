import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { JwtAuthGuard } from "../auth/jwt.guard";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Get all user records.
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // Get a user record by their ID.
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    // Error handling: If the user does not exist, throw a NotFoundException.
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found!');
    } else {
      return user;
    }
  }

  // Create a new user record.
  @UseGuards(JwtAuthGuard) // Protect this route with a JWT authentication guard.
  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }

  // Update a user record by their ID.
  @UseGuards(JwtAuthGuard) // Protect this route with a JWT authentication guard.
  @Put(':id')
  async update(@Param('id') id: number, @Body() user: User): Promise<any> {
    return this.usersService.update(id, user);
  }

  // Delete a user record by their ID.
  @UseGuards(JwtAuthGuard) // Protect this route with a JWT authentication guard.
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    // Error handling: If the user does not exist, throw a NotFoundException.
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    return this.usersService.delete(id);
  }
}
