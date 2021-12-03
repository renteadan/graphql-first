import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum AuthProvider {
  GOOGLE = 'google',
  LOCAL = 'local',
}

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

  @Column({ nullable: true })
  scopes: string;

  @Column({ nullable: true })
  auth_token: string;

  @Column({ nullable: true })
  expires_at: Date;

  @Column({ nullable: true })
  refresh_token: string;

  @Column({ default: AuthProvider.LOCAL, enum: AuthProvider, type: 'enum' })
  authProvider: AuthProvider;

  @Column({ nullable: true })
  googleId: string;
}
