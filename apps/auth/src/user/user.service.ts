import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(protected readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const hashPassword = await bcrypt.hash(password, 10);
    return this.userRepository.create({
      email,
      password: hashPassword,
    });
  }

  async validateUser(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const passwordValidation = await bcrypt.compare(password, hashedPassword);
    if (!passwordValidation)
      throw new UnauthorizedException('Credentials are not valid!');
    return true;
  }

  async getAllUsers() {
    return this.userRepository.findAll({});
  }
}
