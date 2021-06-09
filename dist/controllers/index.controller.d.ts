import { NextFunction, Request, Response } from 'express';
declare class IndexController {
    index: (req: Request, res: Response, next: NextFunction) => Response;
}
export default IndexController;
