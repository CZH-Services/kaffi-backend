import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FileStorageService } from 'src/services/FileStorageService';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { REPORTS_MEDIA_PATH } from 'src/constants';
import { IsAdminGuard } from 'src/guards/isAdmin.guard';
import { ReportResponse } from './dto/reportResponse';
import { ReportsServices } from './reports.service';
import { UpdateReport } from './dto/updateReport';
import { CreateReport } from './dto/createReport';

@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsServices: ReportsServices) {}

  @Get()
  @ApiOperation({ summary: 'Get blogs' })
  @ApiResponse({
    status: 200,
    description: 'blogs records',
    type: [ReportResponse],
  })
  async findAll(): Promise<ReportResponse[]> {
    return await this.reportsServices.findAll();
  }

  @Get('admin')
  @UseGuards(IsAdminGuard)
  @ApiOperation({ summary: 'Get admin reports' })
  @ApiResponse({
    status: 200,
    description: 'Reports records for admin',
  })
  async findAllAdmin(): Promise<ReportResponse[]> {
    return await this.reportsServices.findAllAdmin();
  }

  @UseGuards(IsAdminGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create a report' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'image', maxCount: 1 }],
      FileStorageService.getSaveImageToStorage(REPORTS_MEDIA_PATH),
    ),
  )
  @ApiOkResponse({
    status: 200,
    description: 'Report added successfully',
    type: Boolean,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async create(
    @Body() body: CreateReport,
    @UploadedFiles()
    image: {
      image?: Express.Multer.File[];
    },
  ): Promise<Boolean> {
    return await this.reportsServices.create(body, image);
  }

  @UseGuards(IsAdminGuard)
  @ApiBearerAuth()
  @Put()
  @ApiOperation({ summary: 'Update a report' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'image', maxCount: 1 }],
      FileStorageService.getSaveImageToStorage(REPORTS_MEDIA_PATH),
    ),
  )
  @ApiOkResponse({
    status: 200,
    description: 'Report updated successfully',
    type: Boolean,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async update(
    @Body() body: UpdateReport,
    @UploadedFiles()
    image: {
      image?: Express.Multer.File[];
    },
  ): Promise<Boolean> {
    return await this.reportsServices.update(body, image);
  }

  @Delete(':id')
  @UseGuards(IsAdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete report' })
  @ApiResponse({
    status: 200,
    description: 'Report deleted',
  })
  async delete(@Param('id') id: number): Promise<boolean> {
    return await this.reportsServices.delete(id);
  }

  @Get('reportImage/:image')
  @ApiOperation({ summary: 'Returns report image' })
  @ApiResponse({
    status: 200,
    description: 'The report image has been successfully returned.',
  })
  @ApiResponse({
    status: 404,
    description: 'Report image not found.',
  })
  async getBlogImage(@Param('image') image: string, @Res() res): Promise<any> {
    res.sendFile(image, { root: REPORTS_MEDIA_PATH });
  }
}
