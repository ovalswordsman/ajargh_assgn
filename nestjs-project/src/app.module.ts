// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/users.module';
import { User } from './user/user.entity';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    /*Integrating with mysql*/
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: 'user',
      database: process.env.DB_DATABASE,
      entities: [User],
      synchronize: true, //automatically update the database schema when the application is started
    }),

    AuthModule,
    UserModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
