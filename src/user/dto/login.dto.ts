import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field(() => String, { description: "User's email" })
  email: string;

  @Field(() => String, { description: "User's password" })
  password: string;
}

@ObjectType()
export class LoginOutput {
  @Field(() => String, { description: 'JWT token' })
  token: string;

  @Field(() => Int, { description: "User's id" })
  id: number;
}
