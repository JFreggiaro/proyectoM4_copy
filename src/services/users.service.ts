import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { CreateUsersDto } from '../dto/user.dto';
import { Users } from '../entities/users.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  
  createUsers(user: CreateUsersDto) {
    return this.usersRepository.createUser(user);
  }
  
  // getAllUsers() {
  //   return this.usersRepository.getAllUsers()
  // }
  
  async loginUserByEmail(email: string): Promise<Users> {
    const user = await this.usersRepository.loginUserByEmail(email);
    return user;
  }
  
  getUsers(page: number, limit: number) {
    const users = this.usersRepository.getUsers(page, limit);
    return users;
  }
  
  getUsersById(id: string) {
    return this.usersRepository.getUserById(id);
  }
  
  updateUsers(id: string, updateUser: Partial<CreateUsersDto>) {
    return this.usersRepository.updateUser(id, updateUser);
  }
  
  deleteUsers(id: string) {
    return this.usersRepository.deleteUser(id);
  }

  //! IMPLEMENTACION DE CARGA AUTOMATICA
  //* Implementacion de carga automatica
  seedUsers() {
    return this.usersRepository.seedUsers();
  }
}
