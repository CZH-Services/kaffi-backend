import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { STORY_MEDIA_PATH } from 'src/constants';
import { IsAdminGuard } from 'src/guards/isAdmin.guard';
import { FileStorageService } from 'src/services/FileStorageService';

import { CreateStory } from 'src/stories/dto/createStory';
import { DeleteStory } from 'src/stories/dto/deleteStory';
import { UpdateStory } from 'src/stories/dto/updateStory';
import { StoryService } from 'src/stories/stories.service';
import { StoryResponse } from './storiesResponse';

@Controller('stories')
@ApiTags('Stories')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @ApiBearerAuth()
  @UseGuards(IsAdminGuard)
  @Post()
  @ApiOperation({ summary: 'Creates a story' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor(
      'iconFile',
      FileStorageService.getSaveImageToStorage(STORY_MEDIA_PATH),
    ),
  )
  @ApiResponse({
    status: 200,
    description: 'The story has been successfully created.',
    type: Boolean,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input.',
  })
  async createStory(
    @Body() story: CreateStory,
    @UploadedFile() iconFile: Express.Multer.File,
  ): Promise<boolean> {
    return this.storyService.createStory(story, iconFile);
  }

  @ApiBearerAuth()
  @UseGuards(IsAdminGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Updates a story' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor(
      'iconFile',
      FileStorageService.getSaveImageToStorage(STORY_MEDIA_PATH),
    ),
  )
  @ApiResponse({
    status: 200,
    description: 'The story has been successfully updated.',
    type: Boolean,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input.',
  })
  @ApiResponse({
    status: 404,
    description: 'The story has not been found.',
  })
  async updateStory(
    @Body() story: UpdateStory,
    @UploadedFile() iconFile: Express.Multer.File,
  ): Promise<boolean> {
    return this.storyService.updateStory(story, iconFile);
  }

  @ApiBearerAuth()
  @UseGuards(IsAdminGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a story' })
  @ApiResponse({
    status: 200,
    description: 'The story has been successfully deleted.',
    type: Boolean,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input.',
  })
  @ApiResponse({
    status: 404,
    description: 'The story has not been found.',
  })
  async deleteStory(@Param() storyId: DeleteStory): Promise<boolean> {
    return this.storyService.deleteStory(storyId.id);
  }

  @Get()
  @ApiOperation({ summary: 'Gets all stories' })
  @ApiResponse({
    status: 200,
    description: 'The stories have been successfully returned.',
    type: [StoryResponse],
  })
  async getStories(): Promise<StoryResponse[]> {
    return this.storyService.getSucessStories();
  }

  @Get('/primary')
  @ApiOperation({ summary: 'Gets all primary stories' })
  @ApiResponse({
    status: 200,
    description: 'The stories have been successfully returned.',
    type: [StoryResponse],
  })
  async getPrimaryStories(): Promise<StoryResponse[]> {
    return this.storyService.getPrimarySucessStories();
  }

  @Get('StoryIcon/:icon')
  @ApiOperation({ summary: 'Returns story icon' })
  @ApiResponse({
    status: 200,
    description: 'The story icon has been successfully returned.',
  })
  @ApiResponse({
    status: 404,
    description: 'Icon not found.',
  })
  async getStoryIcon(@Param('icon') icon: string, @Res() res): Promise<any> {
    res.sendFile(icon, { root: STORY_MEDIA_PATH });
  }
}
