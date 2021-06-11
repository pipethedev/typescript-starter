import { PrismaClient, Post } from '@prisma/client';
import { PostDTO, UpdatePostDto } from '@dtos/post.dto';
import HttpException from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class PostService {
  public post = new PrismaClient().post;

  public async createPost(postData: PostDTO): Promise<Post> {
    if (isEmpty(postData)) throw new HttpException(400, "You're not postData");

    const post = await this.post.create({
      data: {
        ...postData,
      },
    });

    return post;
  }

  public async publishPost(id: number): Promise<Post> {
    return await this.post.update({
      where: {
        id,
      },
      data: {
        published: true,
      },
    });
  }

  public async getPostById(id: number): Promise<Post> {
    return await this.post.findFirst({
      where: {
        id,
      },
    });
  }

  public async getAllPost(id: number): Promise<Post[]> {
    return await this.post.findMany({
      where: {
        authorId: id,
      },
    });
  }

  public async deleteAPost(id: number): Promise<Post> {
    return await this.post.delete({
      where: {
        id,
      },
    });
  }

  public async updateAPost(id: number, data: UpdatePostDto): Promise<Post> {
    return await this.post.update({
      where: {
        id,
      },
      data,
    });
  }
}

export default PostService;
