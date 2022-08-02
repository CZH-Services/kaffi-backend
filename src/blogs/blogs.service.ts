import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { BlogsRespository } from './blogs.repository';
import { AddBlogRequest } from './dto/addBlogRequest';
import { GetBlogResponse } from './dto/blogResponse';
import { GetBlogResponseForAdmin } from './dto/blogResponseForAdmin';
import { UpdateBlogRequest } from './dto/updateBlog';

@Injectable()
export class BlogService {
  constructor(private readonly blogsRespository: BlogsRespository) {}

  async findAllBlogs(): Promise<GetBlogResponse[]> {
    return await this.blogsRespository.findAllBlogs();
  }

  async findAllBlogsForAdmin(): Promise<GetBlogResponseForAdmin[]> {
    return await this.blogsRespository.findAllBlogsForAdmin();
  }

  async createBlogs(data: AddBlogRequest, image: Object): Promise<boolean> {
    return await this.blogsRespository.createBlog({
      ...data,
      image: image['image'][0].filename,
    });
  }

  async deleteBlog(id: number): Promise<boolean> {
    const deleteResponse = await this.blogsRespository.deleteBlog(id);
    if (!deleteResponse) {
      throw new HttpException('Blog not Found', HttpStatus.NOT_FOUND);
    }
    return deleteResponse;
  }

  async updateBlog(data: UpdateBlogRequest, image: Object): Promise<boolean> {
    const updateResponse = await this.blogsRespository.updateBlog({
      ...data,
      image: image['image'][0].filename,
    });
    if (!updateResponse) {
      throw new HttpException('Blog not Found', HttpStatus.NOT_FOUND);
    }
    return updateResponse;
  }

  async getBlogHtmlString(id: number): Promise<{ HTMLString: string }> {
    const blog = await this.blogsRespository.getBlogHtmlString(id);
    if (!blog) {
      throw new HttpException('Blog not Found', HttpStatus.NOT_FOUND);
    }
    return blog;
  }
}
