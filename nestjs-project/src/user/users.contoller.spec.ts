import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { JwtService } from '@nestjs/jwt';

describe('UsersController', () => {
  let controller: UsersController;
  let userService: UsersService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User), // Provide the User Repository
          useClass: Repository,
        },
        JwtService
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
   
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users: User[] = [
        {
          id: 1,
          name: 'User 1',
          email: 'user1@example.com',
          phoneNumber: '123-456-7890',
        },
        {
          id: 2,
          name: 'User 2',
          email: 'user2@example.com',
          phoneNumber: '987-654-3210',
        },
        {
          id: 3,
          name: 'User 3',
          email: 'user3@example.com',
          phoneNumber: '123-847-9565',
        },
        {
          id: 4,
          name: 'User 4',
          email: 'user4@example.com',
          phoneNumber: '547-965-8521',
        },
      ];
      jest.spyOn(userService, 'findAll').mockResolvedValue(users);

      const result = await controller.findAll();

      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const user: User = {
        id: 1,
        name: 'User 1',
        email: 'user1@example.com',
        phoneNumber: '123-456-7890',
      };
      jest.spyOn(userService, 'findOne').mockResolvedValue(user);

      const result = await controller.findOne(1);

      expect(result).toEqual(user);
    });

    it('should throw NotFoundException for a non-existing user', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(null);

      try {
        await controller.findOne(999); // Provide a non-existing user ID
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('User not found!');
      }
    });
  });
  describe('create', () => {
    it('should create a new user', async () => {
      const newUser: User = {
        id: 1,
        name: 'User 1',
        email: 'user1@example.com',
        phoneNumber: '123-456-7890',
      };
      jest.spyOn(userService, 'create').mockResolvedValue(newUser);

      const result = await controller.create(newUser);

      expect(result).toEqual(newUser);
    });
  });

  describe('update', () => {
    it('should update a user by ID', async () => {
      const updatedUser: User = {
        id: 1,
        name: 'User 1',
        email: 'user1@example.com',
        phoneNumber: '123-456-7890',
      };
      jest.spyOn(userService, 'update').mockResolvedValue(updatedUser);

      const result = await controller.update(1, updatedUser);

      expect(result).toEqual(updatedUser);
    });
  });

  describe('delete', () => {
    it('should delete a user by ID', async () => {
      const userToDelete: User = {
        id: 1,
        name: 'User 1',
        email: 'user1@example.com',
        phoneNumber: '123-456-7890',
      };
      jest.spyOn(userService, 'findOne').mockResolvedValue(userToDelete);
      jest.spyOn(userService, 'delete').mockResolvedValue(Promise.resolve());

      const result = await controller.delete(userToDelete.id);

      expect(result).toBeUndefined()
    });

    it('should throw NotFoundException for a non-existing user during delete', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(null);

      try {
        await controller.delete(999); // Provide a non-existing user ID
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('User does not exist!');
      }
    });
  });
});
