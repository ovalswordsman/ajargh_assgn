// test/test.module.ts

import { Module } from '@nestjs/common';
import { UsersController } from '../src/user/users.controller'; // Adjust the path as needed
import { UsersService } from '../src/user/users.service';       // Adjust the path as needed

@Module({
  controllers: [UsersController],
  providers: [UsersService], // You might need to provide other dependencies here
})
export class TestModule {}
