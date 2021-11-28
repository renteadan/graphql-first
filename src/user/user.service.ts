import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes, pbkdf2Sync, timingSafeEqual } from 'crypto';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(createUserInput: CreateUserInput) {
    const { email } = createUserInput;
    const userExists = await this.userRepository.findOne({ email });
    if (userExists) {
      throw new UnprocessableEntityException('Email already in use!');
    }
    const dbUser = new User();
    const { salt, hashedPassowrd } = this.hashPassword(
      createUserInput.password,
    );
    dbUser.email = email;
    dbUser.password = hashedPassowrd;
    dbUser.salt = salt;
    return this.userRepository.save(dbUser);
  }

  hashPassword(password: string) {
    const salt = randomBytes(32).toString('hex');
    const hashedPassowrd = pbkdf2Sync(
      password,
      salt,
      1345,
      64,
      'sha512',
    ).toString('hex');
    return {
      salt,
      hashedPassowrd,
    };
  }

  verifyPassword(password: string, dbPassword: string, dbSalt: string) {
    const hashedPassowrd = pbkdf2Sync(
      password,
      dbSalt,
      1345,
      64,
      'sha512',
    ).toString('hex');
    return timingSafeEqual(
      Buffer.from(dbPassword),
      Buffer.from(hashedPassowrd),
    );
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new UnprocessableEntityException('Wrong email or password!');
    }
    if (this.verifyPassword(password, user.password, user.salt)) {
      return {
        token: this.jwtService.sign({
          id: user.id,
          email: user.email,
        }),
        id: user.id,
      };
    }
    throw new UnprocessableEntityException('Wrong email or password!');
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne(id);
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return this.userRepository.update(id, updateUserInput);
  }

  async remove(id: number) {
    const res = await this.userRepository.findOne({ id });
    await this.userRepository.delete({ id });
    return res;
  }
}
