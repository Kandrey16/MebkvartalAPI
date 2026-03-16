import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { CreateUserType, UpdateUserType } from '../schema/user.schema';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(data: CreateUserType) {
    return this.userRepository.create(data);
  }

  async findAll() {
    return this.userRepository.findAll();
  }

  async findOne(id: string) {
    return this.userRepository.findOne(id);
  }

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async findByActivationLink(activationLink: string) {
    return this.userRepository.findByActivationLink(activationLink);
  }

  async activateByLink(activationLink: string) {
    return this.userRepository.activateByLink(activationLink);
  }

  async update(id: string, data: UpdateUserType) {
    return this.userRepository.update(id, data);
  }

  async remove(id: string) {
    return this.userRepository.remove(id);
  }
}
