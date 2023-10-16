// src/Users/Users.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) //injecting the repository of the User entity
    private userRepository: Repository<User>,
  ) {}
  
  

  //for finding every record
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  //for finding particular record
  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }
  //for creating new record
  async create(user: Partial<User>): Promise<User> {
    const newuser = this.userRepository.create(user);
    return this.userRepository.save(newuser);
  }
  //for updating a record
  async update(id: number, user: Partial<User>): Promise<User> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne({ where: { id } });
  }
  //for deleting a record
  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
