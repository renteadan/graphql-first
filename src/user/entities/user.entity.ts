import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Role } from 'src/public/enums/role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum AuthProvider {
  GOOGLE = 'google.com',
  LOCAL = 'password',
  FACEBOOk = 'facebook.com',
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
  @Field(() => String, { description: "User's name" })
  name: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @Column({ default: AuthProvider.LOCAL, enum: AuthProvider, type: 'enum' })
  authProvider: AuthProvider;

  @Column({ nullable: true })
  firebaseId: string;

  @Column({ type: 'json', nullable: true })
  firebaseObject: object;
}
