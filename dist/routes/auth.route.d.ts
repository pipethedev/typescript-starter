import AuthController from '../controllers/auth.controller';
import Route from '../interfaces/routes.interface';
declare class AuthRoute implements Route {
    path: string;
    router: import("express-serve-static-core").Router;
    authController: AuthController;
    constructor();
    private initializeRoutes;
}
export default AuthRoute;
