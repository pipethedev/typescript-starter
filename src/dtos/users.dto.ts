import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MinLength } from 'class-validator';
import { Match } from '@utils/match.decorator';

class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  public name: string;

  @IsNotEmpty({ message: 'Email address is required' })
  @IsEmail()
  public email: string;

  //@IsNotEmpty({ message: 'Image is required' })
  @IsOptional()
  public img: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(7)
  //@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
  @IsString()
  public password: string;

  // @IsString()
  // @MinLength(7)
  // @Match('password', { message: 'Password does not match'})
  // passwordConfirm: string;
}

class UpdateUserDto {
  @IsOptional()
  @IsString()
  public name?: string;

  @IsOptional()
  @IsEmail()
  public email?: string;

  //@IsNotEmpty({ message: 'Image is required' })
  @IsOptional()
  public img?: string;

  @IsOptional()
  @IsString()
  public password?: string;
}

class UserLoginDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

class UserMailDto {
  name: string;
  email: string;
}

class VerifyToken {
  @IsNotEmpty({ message: 'Verification token is required' })
  @IsString()
  token: string;

  @IsNotEmpty({ message: 'User id is required' })
  @IsNumber()
  id: number;
}

class MailDto {
  @IsNotEmpty({ message: 'Email address is required' })
  @IsString()
  @IsEmail()
  email: string;
}

class ResetPasswordDto {
  @IsNotEmpty({ message: 'User id is required' })
  @IsNumber()
  userId: number;

  @IsNotEmpty({ message: 'Reset token is required' })
  @IsString()
  resetToken: string;

  @IsNotEmpty({ message: 'Password is required' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
  @MinLength(7)
  @IsString()
  public password: string;

  @IsString()
  @MinLength(7)
  @Match('password', { message: 'Password does not match' })
  passwordConfirm: string;
}

export { CreateUserDto, UserLoginDto, UserMailDto, VerifyToken, MailDto, ResetPasswordDto, UpdateUserDto };
