"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const supertest_1 = tslib_1.__importDefault(require("supertest"));
const app_1 = tslib_1.__importDefault(require("@/app"));
const auth_route_1 = tslib_1.__importDefault(require("@routes/auth.route"));
afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500));
});
describe('Testing Auth', () => {
    describe('[POST] /signup', () => {
        it('response should have the Create userData', async () => {
            const userData = {
                name: 'Random Dev',
                email: 'test@email.com',
                password: 'q1w2e3r4',
            };
            const authRoute = new auth_route_1.default();
            const users = authRoute.authController.authService.users;
            users.findUnique = jest.fn().mockReturnValue(null);
            users.create = jest.fn().mockReturnValue({
                id: 1,
                email: userData.email,
                password: await bcrypt_1.default.hash(userData.password, 10),
            });
            const app = new app_1.default([authRoute]);
            return supertest_1.default(app.getServer()).post(`${authRoute.path}signup`).send(userData).expect(201);
        });
    });
    describe('[POST] /login', () => {
        it('response should have the Set-Cookie header with the Authorization token', async () => {
            const userData = {
                email: 'test@email.com',
                password: 'q1w2e3r4',
            };
            const authRoute = new auth_route_1.default();
            const users = authRoute.authController.authService.users;
            users.findUnique = jest.fn().mockReturnValue({
                id: 1,
                email: userData.email,
                password: await bcrypt_1.default.hash(userData.password, 10),
            });
            const app = new app_1.default([authRoute]);
            return supertest_1.default(app.getServer())
                .post(`${authRoute.path}login`)
                .send(userData)
                .expect('Set-Cookie', /^Authorization=.+/);
        });
    });
    describe('[POST] /logout', () => {
        it('logout Set-Cookie Authorization=; Max-age=0', async () => {
            const user = {
                id: 1,
                name: 'Random Dev',
                img: '',
                email: 'test@email.com',
                isVerified: true,
                password: 'q1w2e3r4',
            };
            const authRoute = new auth_route_1.default();
            const users = authRoute.authController.authService.users;
            users.findFirst = jest.fn().mockReturnValue(Object.assign(Object.assign({}, user), { password: await bcrypt_1.default.hash(user.password, 10) }));
            const app = new app_1.default([authRoute]);
            return supertest_1.default(app.getServer())
                .post(`${authRoute.path}logout`)
                .expect('Set-Cookie', /^Authorization=;/);
        });
    });
});
//# sourceMappingURL=auth.test.js.map