import { NextFunction, Request, Response } from 'express';
import { PrismaClient, Post } from '@prisma/client';
import { PostDTO, UpdatePostDto } from '@dtos/post.dto';
import PostService from '@services/post.service';

class PostController {
  public postService = new PostService();
  public post = new PrismaClient().post;

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const postData: PostDTO = req.body;
      const post: Post = await this.postService.createPost(postData);

      res.status(201).json({ data: post, message: 'Post draft saved successfully' });
    } catch (error) {
      next(error);
    }
  };

  public publish = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const post: Post = await this.postService.publishPost(Number(req.params.id));

      res.status(201).json({ data: post, message: 'Your post is now live' });
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const post: Post = await this.postService.getPostById(Number(req.params.id));

      res.status(201).json({ data: post, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.user;
      const post: Post[] = await this.postService.getAllPost(Number(id));

      res.status(201).json({ data: post, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data: UpdatePostDto = req.body;
      const post: Post = await this.postService.updateAPost(Number(req.params.id), data);

      res.status(201).json({ data: post, message: 'post updated succesfully' });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const post: Post = await this.postService.deleteAPost(Number(req.params.id));

      res.status(201).json({ data: post, message: 'post deleted succesfully' });
    } catch (error) {
      next(error);
    }
  };
}

export default PostController;
