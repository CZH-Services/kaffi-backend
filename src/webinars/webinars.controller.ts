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
import { WEBINAR_MEDIA_PATH } from 'src/constants';
import { FileStorageService } from 'src/services/FileStorageService';
import { AddWebinarRequest } from './dto/addWebinarRequest';
import { AddWebinarStepRequest } from './dto/addWebinarStepRequest';
import { DeleteWebinarRequest } from './dto/deleteWebinarRequest';
import { GetCountryWebinarRequest } from './dto/getCountryWebinarRequest';
import { GetWebinarResponse } from './dto/getWebinarResponse';
import { GetWebinarStepRequest } from './dto/getWebinarStepRequest';
import { GetWebinarStepsRequest } from './dto/getWebinarStepsRequest';
import { UpdateWebinarRequest } from './dto/updateWebinarRequest';
import { UpdateWebinarStepRequest } from './dto/updateWebinarStepRequest';
import { WebinarStep } from './entities/webinarStep';
import { WebinarService } from './webinars.service';
import { IsAdminGuard } from 'src/guards/isAdmin.guard';

@ApiTags('Webinars')
@Controller('webinars')
export class WebinarsController {
  constructor(private readonly webinarService: WebinarService) {}

  @Get()
  @ApiOperation({ summary: 'Get webinars' })
  @ApiResponse({
    status: 200,
    description: 'Webinars records',
    type: [GetWebinarResponse],
  })
  async findAll(): Promise<GetWebinarResponse[]> {
    return await this.webinarService.findAll();
  }

  @Get(':countryId')
  @ApiOperation({ summary: 'Get country webinar' })
  @ApiResponse({
    status: 200,
    description: 'Country webinar record',
    type: GetWebinarResponse,
  })
  async getCountryWebinar(
    @Param() data: GetCountryWebinarRequest,
  ): Promise<GetWebinarResponse> {
    return await this.webinarService.getCountryWebinar(<number>data.countryId);
  }

  @UseGuards(IsAdminGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'create a new webinar' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'countryIconUrl', maxCount: 1 },
        { name: 'selectedCountryIconUrl', maxCount: 1 },
      ],
      FileStorageService.getSaveImageToStorage(WEBINAR_MEDIA_PATH),
    ),
  )
  @ApiOkResponse({
    status: 200,
    description: 'Webinar added',
    type: Boolean,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async createWebinar(
    @Body() info: AddWebinarRequest,
    @UploadedFiles()
    icons: {
      countryIconUrl: Express.Multer.File[];
      selectedCountryIconUrl: Express.Multer.File[];
    },
  ): Promise<boolean> {
    return await this.webinarService.insertWebinar(info, icons);
  }

  @UseGuards(IsAdminGuard)
  @ApiBearerAuth()
  @Put()
  @ApiOperation({ summary: 'update a webinar' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'countryIconUrl', maxCount: 1 },
        { name: 'selectedCountryIconUrl', maxCount: 1 },
      ],
      FileStorageService.getSaveImageToStorage(WEBINAR_MEDIA_PATH),
    ),
  )
  @ApiOkResponse({
    status: 200,
    description: 'webinar updated',
    type: Boolean,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async updateWebinar(
    @Body() info: UpdateWebinarRequest,
    @UploadedFiles()
    icons: {
      countryIconUrl?: Express.Multer.File[];
      selectedCountryIconUrl?: Express.Multer.File[];
    },
  ): Promise<boolean> {
    return await this.webinarService.updateWebinar(info, icons);
  }

  @Get('webinarIcon/:icon')
  @ApiOperation({ summary: 'Returns program icon' })
  @ApiResponse({
    status: 200,
    description: 'The program icon has been successfully returned.',
  })
  @ApiResponse({
    status: 404,
    description: 'Icon not found.',
  })
  async getWebinarIcon(@Param('icon') icon: string, @Res() res): Promise<any> {
    res.sendFile(icon, { root: WEBINAR_MEDIA_PATH });
  }

  @UseGuards(IsAdminGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'delete a new webinar' })
  @ApiOkResponse({
    status: 200,
    description: 'webinar deleted',
    type: Boolean,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async deleteWebinar(@Param() info: DeleteWebinarRequest): Promise<boolean> {
    return await this.webinarService.deleteWebinar(<number>info.id);
  }

  @Get(':id/steps')
  @ApiOperation({ summary: 'Get webinar steps' })
  @ApiResponse({
    status: 200,
    description: 'Webinar steps records',
    type: [WebinarStep],
  })
  async getAllWebinarSteps(
    @Param() info: GetWebinarStepsRequest,
  ): Promise<WebinarStep[]> {
    return await this.webinarService.getAllWebinarSteps(<number>info.id);
  }

  @Get('steps/:id')
  @ApiOperation({ summary: 'Get webinar step' })
  @ApiResponse({
    status: 200,
    description: 'Webinar step record',
    type: WebinarStep,
  })
  async getWebinarStep(
    @Param() info: GetWebinarStepRequest,
  ): Promise<WebinarStep> {
    return await this.webinarService.getWebinarStep(<number>info.id);
  }

  @UseGuards(IsAdminGuard)
  @ApiBearerAuth()
  @Post('steps')
  @ApiOperation({ summary: 'create a new webinar step' })
  @ApiOkResponse({
    status: 200,
    description: 'webinar step added',
    type: Boolean,
  })
  async addWebinarStep(@Body() info: AddWebinarStepRequest): Promise<boolean> {
    return await this.webinarService.addWebinarStep(
      <AddWebinarStepRequest>info,
    );
  }

  @UseGuards(IsAdminGuard)
  @ApiBearerAuth()
  @Put('steps')
  @ApiOperation({ summary: 'update a webinar step' })
  @ApiOkResponse({
    status: 200,
    description: 'webinar step updated',
    type: Boolean,
  })
  async updateWebinarStep(
    @Body() info: UpdateWebinarStepRequest,
  ): Promise<boolean> {
    return await this.webinarService.updateWebinarStep(
      <UpdateWebinarStepRequest>info,
    );
  }

  @UseGuards(IsAdminGuard)
  @ApiBearerAuth()
  @Delete('steps/:id')
  @ApiOperation({ summary: 'delete a webinar step' })
  @ApiOkResponse({
    status: 200,
    description: 'webinar step deleted',
    type: Boolean,
  })
  async deleteWebinarStep(
    @Param() info: DeleteWebinarRequest,
  ): Promise<boolean> {
    return await this.webinarService.deleteWebinarStep(<number>info.id);
  }
}
