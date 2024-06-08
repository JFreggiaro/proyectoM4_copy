// import { Test, TestingModule } from '@nestjs/testing';
// import { UsersService } from '../services/users.service';
// import { AuthController } from '../controllers/auth.controller';
// import { AuthService } from '../services/auth.service';
// import { UsersRepository } from '../repositories/users.repository';
// import { UsersController } from '../controllers/users.controller';
// import { Users } from 'src/entities/users.entity';
// import { CreateUsersDto } from 'src/dto/user.dto';
// import { JwtService } from '@nestjs/jwt';

// const mockUserRepository: Partial<UsersRepository> = {
//   getAllUsers: () => Promise.resolve(undefined),
//   createUser: (user: CreateUsersDto): Promise<Partial<Users>> =>
//     Promise.resolve({
//       ...user,
//       isAdmin: false,
//       id: `1234fs-234sdc-24csfd-34sdfg`,
//     }),
// };

// describe('userService', () => {
//   let usersRepository: UsersRepository;
//   let mockUserRepository: Partial<UsersRepository>;

//   beforeEach(async () => {

//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         UsersService,
//         AuthService,
//         AuthController,
//         JwtService,
//         {
//           provide: UsersRepository,
//           useValue: mockUserRepository,
//         },
//       ],
//       controllers: [UsersController],
//     }).compile();

//     usersRepository = module.get<UsersRepository>(UsersRepository);
//   });

//   it('userService should be defined', () => {
//     expect(usersRepository).toBeDefined();
//   });

//   it('should return all users', async () => {
//     const users = await usersRepository.getAllUsers();
//     expect(users).toEqual(mockUserRepository);
//   });
  

// });
