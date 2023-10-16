// Import necessary modules and components for the UserModule.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  // Declare the modules that this UserModule imports.
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  // Provide the UsersService as a provider for dependency injection.
  providers: [UsersService],
  // Declare the UsersController as a controller for handling HTTP requests.
  controllers: [UsersController],
  // Export the UsersService to make it available for other modules.
  exports: [UsersService],
})
export class UserModule {}
