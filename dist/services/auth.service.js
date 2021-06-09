"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const config_1 = tslib_1.__importDefault(require("config"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const HttpException_1 = tslib_1.__importDefault(require("../exceptions/HttpException"));
const util_1 = require("../utils/util");
const configs_1 = tslib_1.__importDefault(require("./../configs"));
const configs_2 = tslib_1.__importDefault(require("./../configs"));
const mail_service_1 = tslib_1.__importDefault(require("./mail.service"));
const crypto_1 = tslib_1.__importDefault(require("crypto"));
class AuthService {
    constructor() {
        this.users = new client_1.PrismaClient().user;
        this.token = new client_1.PrismaClient().token;
    }
    async signup(userData) {
        if (util_1.isEmpty(userData))
            throw new HttpException_1.default(400, "You're not userData");
        const findUser = await this.users.findUnique({ where: { email: userData.email } });
        if (findUser)
            throw new HttpException_1.default(409, `You're email ${userData.email} already exists`);
        const hashedPassword = await bcrypt_1.default.hash(userData.password, 10);
        const createUserData = this.users.create({ data: Object.assign(Object.assign({}, userData), { password: hashedPassword }) });
        // Request email verification
        await this.RequestEmailVerification(userData.email);
        return createUserData;
    }
    async login(userData) {
        if (util_1.isEmpty(userData))
            throw new HttpException_1.default(400, "You're not userData");
        const findUser = await this.users.findUnique({ where: { email: userData.email } });
        if (!findUser)
            throw new HttpException_1.default(409, `You're email ${userData.email} not found`);
        const isPasswordMatching = await bcrypt_1.default.compare(userData.password, findUser.password);
        if (!isPasswordMatching)
            throw new HttpException_1.default(409, "You're password not matching");
        const tokenData = this.createToken(findUser);
        const cookie = this.createCookie(tokenData);
        return { cookie, findUser };
    }
    async logout(userData) {
        if (util_1.isEmpty(userData))
            throw new HttpException_1.default(400, "You're not userData");
        const findUser = await this.users.findFirst({ where: { email: userData.email, password: userData.password } });
        if (!findUser)
            throw new HttpException_1.default(409, "You're not user");
        return findUser;
    }
    createToken(user) {
        const dataStoredInToken = { id: user.id };
        const secretKey = config_1.default.get('secretKey');
        const expiresIn = 60 * 60;
        return { expiresIn, token: jsonwebtoken_1.default.sign(dataStoredInToken, secretKey, { expiresIn }) };
    }
    createCookie(tokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
    }
    //Send Verification to user
    async RequestEmailVerification(email) {
        const user = await this.users.findFirst({
            where: {
                email,
            },
        });
        if (!user)
            throw new HttpException_1.default(404, 'Email does not exist');
        if (user.isVerified)
            throw new HttpException_1.default(409, 'Email is already verified');
        const token = await this.token.findFirst({
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
        const verifyToken = crypto_1.default.randomBytes(32).toString('hex');
        const hash = await bcrypt_1.default.hash(verifyToken, configs_1.default);
        await this.token.create({
            data: {
                userId: user.id,
                token: hash,
            },
        });
        const link = `${configs_2.default.CLIENT_URL}/email-verification?uid=${user.id}&verifyToken=${verifyToken}`;
        // Send Mail
        await new mail_service_1.default(user).sendEmailVerificationMail(link);
        return;
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map