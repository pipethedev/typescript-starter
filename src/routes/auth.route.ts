import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { CreateUserDto, VerifyToken, MailDto, ResetPasswordDto, UserLoginDto } from '@dtos/users.dto';
import Route from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import upload from '@middlewares/multer.middleware';

class AuthRoute implements Route {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/signup`, upload('img'), validationMiddleware(CreateUserDto, 'body'), this.authController.signUp);
    this.router.post(`${this.path}/login`, validationMiddleware(UserLoginDto, 'body'), this.authController.logIn);
    this.router.post(`${this.path}/verify`, validationMiddleware(VerifyToken, 'body'), this.authController.verify);
    this.router.post(`${this.path}/logout`, authMiddleware, this.authController.logOut);
    this.router.post(`${this.path}/request-email-verification`, validationMiddleware(MailDto, 'query'), this.authController.requestEmailVerification);
    this.router.post(`${this.path}/request-password-reset`, validationMiddleware(MailDto, 'query'), this.authController.requestPasswordReset);
    this.router.post(
      `${this.path}/reset-password`,
      authMiddleware,
      validationMiddleware(ResetPasswordDto, 'body'),
      this.authController.resetPassword,
    );
    //
  }
}

export default AuthRoute;
