import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import fetch from 'node-fetch';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async deleteAllUsers() {
    return await this.userRepository.clear();
  }

  async createUser(
    email: string,
    username: string,
    password: string,
    phone: string,
    refresh_token: string,
  ): Promise<User> {
    const user = await this.userRepository.create({
      email,
      username,
      password,
      phone,
      refresh_token,
    });
    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: {
        email: email,
      },
      select: [
        'id',
        'email',
        'phone',
        'password',
        'username',
        'created_at',
        'updated_at',
      ],
    });
  }

  async updateRefreshToken(refresh_token: string, email: string) {
    await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ refresh_token: refresh_token })
      .where('email = :email', { email: email })
      .execute();
    return {
      message: 'Data has been successfully updated!',
    };
  }

  async findUserById(id: number) {
    return this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async getUsersCount(): Promise<number> {
    return this.userRepository.count();
  }

}
