'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
class IndexController {
  constructor() {
    this.index = (req, res, next) => {
      try {
        return res.status(200).send({
          message: 'Application Live ❤',
          author: 'Muritala David',
          github: 'https://github.com/Fn-studyo',
        });
      } catch (error) {
        next(error);
      }
    };
  }
}
exports.default = IndexController;
//# sourceMappingURL=index.controller.js.map
