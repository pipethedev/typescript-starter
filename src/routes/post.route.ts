import { Router } from 'express';
import PostController from '@controllers/post.controller';
import Route from '@interfaces/routes.interface';
import { PostDTO, UpdatePostDto } from '@dtos/post.dto';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { upload } from '@middlewares/multer.middleware';

class PostRoute implements Route {
  public path = '/posts';
  public router = Router();
  public postController = new PostController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    //create a post
    this.router.post(`${this.path}/create`, authMiddleware, upload.array('img'), validationMiddleware(PostDTO, 'body'), this.postController.create);
    //publish a post
    this.router.put(`${this.path}/publish/:id(\\d+)`, authMiddleware, validationMiddleware(PostDTO, 'param', true), this.postController.publish);
    //get post by id
    this.router.get(`${this.path}/:id(\\d+)`, authMiddleware, this.postController.getById);
    //get all posts
    this.router.get(`${this.path}`, authMiddleware, this.postController.get);
    //delete a post
    this.router.delete(`${this.path}/delete/:id(\\d+)`, authMiddleware, this.postController.delete);
    //update a post
    this.router.put(`${this.path}/update/:id(\\d+)`, authMiddleware, validationMiddleware(UpdatePostDto, 'body'), this.postController.update);
  }
}

export default PostRoute;
