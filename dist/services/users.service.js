"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const HttpException_1 = tslib_1.__importDefault(require("@exceptions/HttpException"));
const util_1 = require("@utils/util");
class UserService {
    constructor() {
        this.users = new client_1.PrismaClient().user;
    }
    async findAllUser() {
        return await this.users.findMany();
    }
    async findUserById(userId) {
        if (util_1.isEmpty(userId))
            throw new HttpException_1.default(400, "You're not userId");
        const findUser = await this.users.findUnique({ where: { id: userId } });
        if (!findUser)
            throw new HttpException_1.default(409, "You're not user");
        return findUser;
    }
    async createUser(userData) {
        if (util_1.isEmpty(userData))
            throw new HttpException_1.default(400, "You're not userData");
        const findUser = await this.users.findUnique({ where: { email: userData.email } });
        if (findUser)
            throw new HttpException_1.default(409, `You're email ${userData.email} already exists`);
        const hashedPassword = await bcrypt_1.default.hash(userData.password, 10);
        return await this.users.create({ data: Object.assign(Object.assign({}, userData), { password: hashedPassword }) });
    }
    async updateUser(userId, userData) {
        if (util_1.isEmpty(userData))
            throw new HttpException_1.default(400, "You're not userData");
        const findUser = await this.users.findUnique({ where: { id: userId } });
        if (!findUser)
            throw new HttpException_1.default(409, "You're not user");
        const hashedPassword = await bcrypt_1.default.hash(userData.password, 10);
        return await this.users.update({ where: { id: userId }, data: Object.assign(Object.assign({}, userData), { password: hashedPassword }) });
    }
    async deleteUser(userId) {
        if (util_1.isEmpty(userId))
            throw new HttpException_1.default(400, "You're not userId");
        const findUser = await this.users.findUnique({ where: { id: userId } });
        if (!findUser)
            throw new HttpException_1.default(409, "You're not user");
        return await this.users.delete({ where: { id: userId } });
    }
}
exports.default = UserService;
//# sourceMappingURL=users.service.js.map