import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BLOGS_MEDIA_PATH } from 'src/constants';
import { IsAdminGuard } from 'src/guards/isAdmin.guard';
import { FileStorageService } from 'src/services/FileStorageService';
import { BlogService } from './blogs.service';
import { AddBlogRequest } from './dto/addBlogRequest';
import { GetBlogResponse } from './dto/blogResponse';
import { GetBlogResponseForAdmin } from './dto/blogResponseForAdmin';
import { UpdateBlogRequest } from './dto/updateBlog';

@ApiTags('Blogs')
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  @ApiOperation({ summary: 'Get blogs' })
  @ApiResponse({
    status: 200,
    description: 'blogs records',
    type: [GetBlogResponse],
  })
  async findAll(): Promise<GetBlogResponse[]> {
    return await this.blogService.findAllBlogs();
  }

  @Get('admin')
  @ApiOperation({ summary: 'Get blogs' })
  @ApiResponse({
    status: 200,
    description: 'blogs records for admin',
    type: [GetBlogResponse],
  })
  async findAllBlogsForAdmin(): Promise<GetBlogResponseForAdmin[]> {
    return await this.blogService.findAllBlogsForAdmin();
  }

  @UseGuards(IsAdminGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create a Blog' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'image', maxCount: 1 }],
      FileStorageService.getSaveImageToStorage(BLOGS_MEDIA_PATH),
    ),
  )
  @ApiOkResponse({
    status: 200,
    description: 'blog added successfully',
    type: Boolean,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async updateProfileImage(
    @Req() req: any,
    @Body() body: AddBlogRequest,
    @UploadedFiles()
    image: {
      image?: Express.Multer.File[];
    },
  ): Promise<Boolean> {
    return await this.blogService.createBlogs(body, image);
  }

  @Get('blog-image/:image')
  @ApiOperation({ summary: 'Returns blog image' })
  @ApiResponse({
    status: 200,
    description: 'The blog image has been successfully returned.',
  })
  @ApiResponse({
    status: 404,
    description: 'blog image not found.',
  })
  async getBlogImage(@Param('image') image: string, @Res() res): Promise<any> {
    res.sendFile(image, { root: BLOGS_MEDIA_PATH });
  }

  @UseGuards(IsAdminGuard)
  @ApiBearerAuth()
  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a Blog' })
  @ApiResponse({
    status: 200,
    description: 'Blog deleted successfully',
    type: Boolean,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async deleteBlog(@Param('id') id: number): Promise<Boolean> {
    return await this.blogService.deleteBlog(id);
  }

  @UseGuards(IsAdminGuard)
  @ApiBearerAuth()
  @Put()
  @ApiOperation({ summary: 'Update a Blog' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'image', maxCount: 1 }],
      FileStorageService.getSaveImageToStorage(BLOGS_MEDIA_PATH),
    ),
  )
  @ApiOkResponse({
    status: 200,
    description: 'blog updated successfully',
    type: Boolean,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async updateBlog(
    @Req() req: any,
    @Body() body: UpdateBlogRequest,
    @UploadedFiles()
    image: {
      image?: Express.Multer.File[];
    },
  ): Promise<Boolean> {
    return await this.blogService.updateBlog(body, image);
  }

  @Get('/html-string/:id')
  @ApiOperation({ summary: 'Get blog html string' })
  @ApiResponse({
    status: 200,
    description: 'blog html string',
    type: String,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getBlogHtmlString(
    @Param('id') id: number,
  ): Promise<{ HTMLString: string }> {
    return await this.blogService.getBlogHtmlString(id);
  }
}
