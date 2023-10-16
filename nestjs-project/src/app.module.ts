// Import necessary modules and components for the AppModule.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/users.module';
import { User } from './user/user.entity';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // Define the TypeORM module for connecting to a MySQL database.
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD, // Change this to use the actual password.
      database: process.env.DB_DATABASE,
      entities: [User],
      synchronize: true, // Automatically update the database schema when the application is started.
    }),

    // Import and configure the AuthModule, UserModule.
    AuthModule,
    UserModule,
  ],
  controllers: [AppController], // Declare the AppController for handling HTTP requests.
  providers: [AppService], // Provide the AppService as a provider for dependency injection.
})
export class AppModule {}
