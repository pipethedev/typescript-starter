"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const supertest_1 = tslib_1.__importDefault(require("supertest"));
const app_1 = tslib_1.__importDefault(require("../app"));
const index_route_1 = tslib_1.__importDefault(require("../routes/index.route"));
afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500));
});
describe('Testing Index', () => {
    describe('[GET] /', () => {
        it('response statusCode 200', () => {
            const indexRoute = new index_route_1.default();
            const app = new app_1.default([indexRoute]);
            return supertest_1.default(app.getServer()).get(`${indexRoute.path}`).expect(200);
        });
    });
});
//# sourceMappingURL=index.test.js.map