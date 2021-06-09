declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
}
declare class UserLoginDto {
    email: string;
    password: string;
}
declare class UserMailDto {
    name: string;
    email: string;
}
export { CreateUserDto, UserLoginDto, UserMailDto };
