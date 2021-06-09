import { NextFunction, Request, Response } from 'express';

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction): Response => {
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

export default IndexController;
