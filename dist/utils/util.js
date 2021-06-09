"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmpty = void 0;
/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
const isEmpty = (value) => {
    if (value === null) {
        return true;
    }
    else if (typeof value !== 'number' && value === '') {
        return true;
    }
    else if (value === 'undefined' || value === undefined) {
        return true;
    }
    else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
        return true;
    }
    else {
        return false;
    }
};
exports.isEmpty = isEmpty;
//# sourceMappingURL=util.js.map