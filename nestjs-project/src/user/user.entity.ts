// src/users/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

// Define a User entity that will be used with TypeORM.

@Entity()
export class User {
  // This annotation ensures that the 'id' field is not empty when validating the object.
  @IsNotEmpty()
  @PrimaryGeneratedColumn() // Primary key auto-generated by the database.
  id: number;

  @Column()
  name: string; // The name of the user.

  // The 'email' column is defined with a uniqueness constraint to ensure no two users have the same email.
  @Column({ unique: true })
  email: string;

  @Column()
  phoneNumber: string; // The user's phone number.
}
