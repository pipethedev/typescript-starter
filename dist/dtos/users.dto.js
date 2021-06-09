"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMailDto = exports.UserLoginDto = exports.CreateUserDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreateUserDto {
}
tslib_1.__decorate([
    class_validator_1.IsNotEmpty({ message: 'Name is required' }),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty({ message: 'Email address is required' }),
    class_validator_1.IsEmail(),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty({ message: 'Password is required' }),
    class_validator_1.MinLength(7),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
exports.CreateUserDto = CreateUserDto;
class UserLoginDto {
}
tslib_1.__decorate([
    class_validator_1.IsEmail(),
    tslib_1.__metadata("design:type", String)
], UserLoginDto.prototype, "email", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UserLoginDto.prototype, "password", void 0);
exports.UserLoginDto = UserLoginDto;
class UserMailDto {
}
exports.UserMailDto = UserMailDto;
//# sourceMappingURL=users.dto.js.map