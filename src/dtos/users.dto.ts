import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  public name: string;

  @IsNotEmpty({ message: 'Email address is required' })
  @IsEmail()
  public email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(7)
  @IsString()
  public password: string;
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
export { CreateUserDto, UserLoginDto, UserMailDto, VerifyToken };
