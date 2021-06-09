"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
const validateEnv = () => {
    envalid_1.cleanEnv(process.env, {
        NODE_ENV: envalid_1.str(),
        PORT: envalid_1.port(),
    });
};
exports.default = validateEnv;
//# sourceMappingURL=validateEnv.js.map