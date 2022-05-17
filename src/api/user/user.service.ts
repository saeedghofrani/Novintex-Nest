import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UserNoin } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserNoin) private userRepository: Repository<UserNoin>,
  ) { }

  async findAllUsers(): Promise<UserNoin[]> {
    return await this.userRepository.find();
  }

  async findOneUser(
    id: number | null,
    name: string | undefined,
  ): Promise<UserNoin> {
    if (id) {
      return await this.userRepository.findOne({ where: { id } });
    } else if (name) {
      return await this.userRepository.findOne({ where: { name } });
    } else {
      return null;
    }
  }

  async createUser(body: CreateUserDto): Promise<void> {
    const newUser: UserNoin = await this.userRepository.create({
      name: body.name,
      password: body.password,
      email: body.email,
    });
    await this.userRepository.save(newUser);
  }

  async updateUserInfo(user: UserNoin, body: UpdateUserDto): Promise<UserNoin> {
    const { name, password, email } = body;
    if (name) user.name = name;
    if (password) user.password = password;
    if (email) user.email = email;
    await this.userRepository.save(user);
    return user;
  }

  async deleteAccount(user: UserNoin): Promise<void> {
    await this.userRepository.delete(user);
  }
}