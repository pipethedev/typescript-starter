import bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken';
import { PrismaClient, User, Token } from '@prisma/client';
import { CreateUserDto, UserLoginDto } from '@dtos/users.dto';
import HttpException from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { isEmpty } from '@utils/util';
import BCRYPT_SALT from './../configs';
import url from './../configs';
import MailService from './mail.service';
import crypto from 'crypto';

class AuthService {
  public users = new PrismaClient().user;
  public token = new PrismaClient().token;

  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findUnique({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const createUserData: Promise<User> = this.users.create({ data: { ...userData, password: hashedPassword } });

    // Request email verification
    await this.RequestEmailVerification(userData.email);

    return createUserData;
  }

  public async login(userData: UserLoginDto): Promise<{ cookie: string; findUser: User }> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findUnique({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findFirst({ where: { email: userData.email, password: userData.password } });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = config.get('secretKey');
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: jwt.sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }

  //Send Verification to user
  async RequestEmailVerification(email: string) {
    const user = await this.users.findFirst({
      where: {
        email,
      },
    });
    if (!user) throw new HttpException(404, 'Email does not exist');
    if (user.isVerified) throw new HttpException(409, 'Email is already verified');

    const token: Token = await this.token.findFirst({
      where: {
        userId: user.id,
      },
    });
    if (token)
      await this.token.delete({
        where: {
          userId: user.id,
        },
      });

    const verifyToken = crypto.randomBytes(32).toString('hex');
    const hash = await bcrypt.hash(verifyToken, BCRYPT_SALT);

    await this.token.create({
      userId: user.id,
      token: hash,
      createdAt: Date.now(),
    });
    const link = `${url.CLIENT_URL}/email-verification?uid=${user.id}&verifyToken=${verifyToken}`;

    // Send Mail
    await new MailService(user).sendEmailVerificationMail(link);

    return;
  }
}

export default AuthService;
