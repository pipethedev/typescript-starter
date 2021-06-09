import UsersController from '../controllers/users.controller';
import Route from '../interfaces/routes.interface';
declare class UsersRoute implements Route {
    path: string;
    router: import("express-serve-static-core").Router;
    usersController: UsersController;
    constructor();
    private initializeRoutes;
}
export default UsersRoute;
