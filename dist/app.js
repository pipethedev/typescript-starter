'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';
const compression_1 = tslib_1.__importDefault(require('compression'));
const cookie_parser_1 = tslib_1.__importDefault(require('cookie-parser'));
const express_1 = tslib_1.__importDefault(require('express'));
const helmet_1 = tslib_1.__importDefault(require('helmet'));
const hpp_1 = tslib_1.__importDefault(require('hpp'));
const morgan_1 = tslib_1.__importDefault(require('morgan'));
const swagger_jsdoc_1 = tslib_1.__importDefault(require('swagger-jsdoc'));
const swagger_ui_express_1 = tslib_1.__importDefault(require('swagger-ui-express'));
const error_middleware_1 = tslib_1.__importDefault(require('./middlewares/error.middleware'));
const logger_1 = require('./utils/logger');
class App {
  constructor(routes) {
    this.app = express_1.default();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || 'development';
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }
  listen() {
    this.app.listen(this.port, () => {
      logger_1.logger.info(`=================================`);
      logger_1.logger.info(`======= ENV: ${this.env} =======`);
      logger_1.logger.info(`🚀 App listening on the port ${this.port}`);
      logger_1.logger.info(`=================================`);
    });
  }
  getServer() {
    return this.app;
  }
  initializeMiddlewares() {
    if (this.env === 'production') {
      this.app.use(morgan_1.default('combined', { stream: logger_1.stream }));
    } else {
      this.app.use(morgan_1.default('dev', { stream: logger_1.stream }));
    }
    this.app.use(hpp_1.default());
    this.app.use(helmet_1.default());
    this.app.use(compression_1.default());
    this.app.use(express_1.default.json());
    this.app.use(express_1.default.urlencoded({ extended: true }));
    this.app.use(cookie_parser_1.default());
  }
  initializeRoutes(routes) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }
  initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };
    const specs = swagger_jsdoc_1.default(options);
    this.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
  }
  initializeErrorHandling() {
    this.app.use(error_middleware_1.default);
  }
}
exports.default = App;
//# sourceMappingURL=app.js.map
