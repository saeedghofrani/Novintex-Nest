import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneUser(
    id: number | null,
    name: string | undefined,
  ): Promise<User> {
    if (id) {
      return await this.userRepository.findOne({ where: { id } });
    } else if (name) {
      return await this.userRepository.findOne({ where: { name } });
    } else {
      return null;
    }
  }

  async createUser(body: CreateUserDto): Promise<void> {
    const newUser: User = await this.userRepository.create({
      name: body.name,
      password: body.password,
      email: body.email,
    });
    await this.userRepository.save(newUser);
  }

  async updateUserInfo(user: User, body: UpdateUserDto): Promise<User> {
    const { name, password, email } = body;
    if (name) user.name = name;
    if (password) user.password = password;
    if (email) user.email = email;
    await this.userRepository.save(user);
    return user;
  }

  async deleteAccount(user: User): Promise<void> {
    await this.userRepository.delete(user);
  }
}