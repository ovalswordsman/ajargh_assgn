// src/users/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

//Creating user model to work on
@Entity()
export class User {
  @IsNotEmpty()
  @PrimaryGeneratedColumn() //primary key
  id: number;

  @Column()
  name: string;

  @Column({unique : true})
  email: string;

  @Column()
  phoneNumber: string;
}
