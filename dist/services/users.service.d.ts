import { User } from '@prisma/client';
import { CreateUserDto } from '@dtos/users.dto';
declare class UserService {
    users: import(".prisma/client").Prisma.UserDelegate<import(".prisma/client").Prisma.RejectOnNotFound | import(".prisma/client").Prisma.RejectPerOperation>;
    findAllUser(): Promise<User[]>;
    findUserById(userId: number): Promise<User>;
    createUser(userData: CreateUserDto): Promise<User>;
    updateUser(userId: number, userData: CreateUserDto): Promise<User>;
    deleteUser(userId: number): Promise<User>;
}
export default UserService;
