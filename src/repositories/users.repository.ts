import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUsersDto } from '../dto/user.dto';
import { Users } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { Role } from '../role.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}
  async seedUsers() {
    try {
      const userExists = await this.userRepository.findOneBy({
        email: 'josefre@mail.com',
      });
      if (!userExists) {
        const passwordHashed = await bcrypt.hash('Hola12345@', 10);
        return await this.userRepository.save({
          name: 'Jose',
          email: 'josefre@mail.com',
          password: passwordHashed,
          phone: 123456789,
          country: 'Colombia',
          address: 'Calle 1',
          city: 'Bogota',
          role: Role.Admin,
        });
      }
      return;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAllUsers() {
    return await this.userRepository.find({
      relations: ['orders'],
      select: [
        'id',
        'name',
        'email',
        'phone',
        'country',
        'address',
        'city',
        'orders',
      ],
    });
  }

  async createUser(user: CreateUsersDto): Promise<Partial<Users>> {
    const userExists = await this.userRepository.findOneBy({
      email: user.email,
    });
    if (userExists) {
      throw new NotFoundException('El usuario ya existe');
    }
    const newUser = await this.userRepository.save(user);
    const dbUser = await this.userRepository.findOneBy({ id: newUser.id });
    const { password, ...userWithOutPassword } = dbUser;
    return userWithOutPassword;
  }

  async getUsers(page: number, limit: number) {
    try {
      const skip = (page - 1) * limit;
      const userPage = this.userRepository.find({
        take: limit,
        skip: skip,
      });

      const userFind = (await userPage).map(({ password, ...user }) => user);
      // return { message: 'Usuarios encontrados', userFind };
      return (await userPage).map(({ password, ...user }) => user);
    } catch (error) {
      throw new BadRequestException('No se encontraron usuarios');
    }
  }

  async getUserById(id: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        orders: true,
      }
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const { password, ...userWithOutPassword } = user;

    return {message:"Usuario encontrado" ,userWithOutPassword};
  }

  async updateUser(
    id: string,
    userChange: Partial<CreateUsersDto>,
  ): Promise<Partial<Users>> {
    await this.userRepository.update(id, userChange);
    const updatedUser = await this.userRepository.findOneBy({ id });
    if (!updatedUser) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const { password, ...userWithOutPassword } = updatedUser;

    return userWithOutPassword;
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    await this.userRepository.delete(id);
    const { password, ...userWithOutPassword } = user;
    return {message:"Usuario eliminado" ,userWithOutPassword};
  }

  async loginUserByEmail(email: string): Promise<Users> {
    const user = await this.userRepository.findOneBy({ email });

    return user;
  }
}
