import { User } from '@prisma/client';
import { CreateUserDto, UserLoginDto } from '../dtos/users.dto';
import { TokenData } from '../interfaces/auth.interface';
declare class AuthService {
  users: import('.prisma/client').Prisma.UserDelegate<
    import('.prisma/client').Prisma.RejectOnNotFound | import('.prisma/client').Prisma.RejectPerOperation
  >;
  token: import('.prisma/client').Prisma.TokenDelegate<
    import('.prisma/client').Prisma.RejectOnNotFound | import('.prisma/client').Prisma.RejectPerOperation
  >;
  signup(userData: CreateUserDto): Promise<User>;
  login(userData: UserLoginDto): Promise<{
    cookie: string;
    findUser: User;
  }>;
  logout(userData: User): Promise<User>;
  createToken(user: User): TokenData;
  createCookie(tokenData: TokenData): string;
  RequestEmailVerification(email: string): Promise<void>;
}
export default AuthService;
