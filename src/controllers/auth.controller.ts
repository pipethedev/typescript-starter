import { NextFunction, Request, Response } from 'express';
import { User } from '@prisma/client';
import { CreateUserDto, ResetPasswordDto, UserLoginDto, VerifyToken } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import AuthService from '@services/auth.service';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.authService.signup(userData);

      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: UserLoginDto = req.body;
      const { cookie, findUser, tokenData } = await this.authService.login(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ token: tokenData, data: findUser, message: 'login successful' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };

  public verify = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tokenData: VerifyToken = req.body;
      const result = await this.authService.VerifyEmail(tokenData);
      res.status(200).json({ data: result, message: 'Email verified successfully' });
    } catch (error) {
      next(error);
    }
  };

  public requestEmailVerification = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const email = req.query.email;
      const result = await this.authService.RequestEmailVerification(email.toString());
      res.status(200).json({ data: result, message: 'Email verfication link sent' });
    } catch (error) {
      next(error);
    }
  };

  public requestPasswordReset = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const email = req.query.email;
      const result = await this.authService.RequestPasswordReset(email.toString());
      res.status(200).json({ data: result, message: 'Password reset link sent' });
    } catch (error) {
      next(error);
    }
  };

  public resetPassword = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data: ResetPasswordDto = req.body;
      const result = await this.authService.ResetPassword(data);
      res.status(200).json({ data: result, message: 'Password updated' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
