import bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken';
import { PrismaClient, User, Token } from '@prisma/client';
import { CreateUserDto, ResetPasswordDto, UserLoginDto, VerifyToken } from '@dtos/users.dto';
import HttpException from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { isEmpty } from '@utils/util';
import MailService from './mail.service';
import crypto from 'crypto';

class AuthService {
  public users = new PrismaClient().user;
  public token = new PrismaClient().token;

  public async signup(userData: CreateUserDto, buffed): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findUnique({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const createUserData = await this.users.create({ data: { ...userData, img: buffed, password: hashedPassword } });

    // Request email verification
    await this.RequestEmailVerification(userData.email);

    return createUserData;
  }

  public async login(userData: UserLoginDto): Promise<{ cookie: string; findUser: User; tokenData: TokenData }> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findUnique({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(401, 'Email or password may be incorrect');

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser, tokenData };
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
          id: token.id,
        },
      });

    const verifyToken = crypto.randomBytes(32).toString('hex');
    const hash = await bcrypt.hash(verifyToken, 10);

    await this.token.create({
      data: {
        userId: user.id,
        token: hash,
      },
    });
    const link = `${process.env.CLIENT_URL}/email-verification?uid=${user.id}&verifyToken=${verifyToken}`;
    console.log(link);

    // Send Mail
    await new MailService(user).sendEmailVerificationMail(link);

    return;
  }

  async VerifyEmail(tokenData: VerifyToken) {
    const user = await this.users.findFirst({
      where: {
        id: tokenData.id,
      },
    });
    if (!user) throw new HttpException(404, 'User does not exist');
    if (user.isVerified) throw new HttpException(409, 'Email is already verified');

    const VToken = await this.token.findFirst({
      where: {
        userId: user.id,
      },
    });
    if (!VToken) throw new HttpException(401, 'Invalid or expired password reset token');

    const isValid = await bcrypt.compare(tokenData.token, VToken.token);
    if (!isValid) throw new HttpException(401, 'Invalid or expired password reset token');

    await this.users.update({
      where: {
        id: user.id,
      },
      data: {
        isVerified: true,
      },
    });

    await this.token.delete({
      where: {
        id: VToken.id,
      },
    });

    return;
  }

  async RequestPasswordReset(email: string) {
    const user = await this.users.findFirst({
      where: {
        email,
      },
    });
    if (!user) throw new HttpException(404, 'Email does not exist');

    const token: Token = await this.token.findFirst({
      where: {
        userId: user.id,
      },
    });
    if (token)
      await this.token.delete({
        where: {
          id: token.id,
        },
      });

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hash = await bcrypt.hash(resetToken, 10);

    await this.token.create({
      data: {
        userId: user.id,
        token: hash,
      },
    });

    const link = `${process.env.CLIENT_URL}/reset-password?uid=${user.id}&resetToken=${resetToken}`;

    // Send Mail
    await new MailService(user).sendPasswordResetMail(link);

    return;
  }

  async ResetPassword(data: ResetPasswordDto) {
    const { userId, resetToken, password } = data;

    const token: Token = await this.token.findFirst({
      where: {
        userId,
      },
    });
    if (!token) throw new HttpException(401, 'Invalid or expired password reset token');

    const isValid = await bcrypt.compare(resetToken, token.token);
    if (!isValid) throw new HttpException(401, 'Invalid or expired password reset token');

    const hash = await bcrypt.hash(password, 10);

    await this.users.update({
      where: {
        id: userId,
      },
      data: {
        password: hash,
      },
    });

    await this.token.delete({
      where: {
        id: token.id,
      },
    });

    return;
  }
}

export default AuthService;
