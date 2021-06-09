import IndexController from '../controllers/index.controller';
import Route from '../interfaces/routes.interface';
declare class IndexRoute implements Route {
    path: string;
    router: import("express-serve-static-core").Router;
    indexController: IndexController;
    constructor();
    private initializeRoutes;
}
export default IndexRoute;
