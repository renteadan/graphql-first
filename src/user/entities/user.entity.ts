import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'Auto generated id' })
  id: number;

  @Column()
  @Field(() => String, { description: "User's email" })
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;
}
