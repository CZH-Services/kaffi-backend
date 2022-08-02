import { Injectable, NotFoundException } from '@nestjs/common';
import { STORY_MEDIA_PATH } from 'src/constants';
import { FileStorageService } from 'src/services/FileStorageService';
import { CreateStory } from 'src/stories/dto/createStory';
import { UpdateStory } from 'src/stories/dto/updateStory';
import { Story } from './entities/story';
import { StoryRepository } from 'src/stories/stories.repository';

@Injectable()
export class StoryService {
  constructor(private readonly storyRepository: StoryRepository) {}

  async createStory(
    story: CreateStory,
    iconFile: Express.Multer.File,
  ): Promise<boolean> {
    const newStory = {
      id: 0,
      icon: iconFile.filename,
      primary: Boolean(story.primary),
      ...story,
    };
    console.log('herreeee');
    return await this.storyRepository.createStory(<Story>newStory);
  }

  async getPrimarySucessStories(): Promise<Story[]> {
    const stories = await this.storyRepository.getPrimarySuccessStories();
    return stories;
  }

  async getSucessStories(): Promise<Story[]> {
    const stories = await this.storyRepository.getSuccessStories();
    return stories;
  }

  async updateStory(
    story: UpdateStory,
    iconFile?: Express.Multer.File,
  ): Promise<boolean> {
    const updatedStory: Story = {
      ...story,
      ...(iconFile && { icon: iconFile.filename }),
    };
    const oldStory = await this.storyRepository.getSuccessStory(story.id);
    const updated = await this.storyRepository.updateStory(updatedStory);
    if (!updated) {
      FileStorageService.deleteFileFromStorage(
        STORY_MEDIA_PATH + iconFile.filename,
      );
      throw new NotFoundException('Story not found');
    }
    if (iconFile) {
      FileStorageService.deleteFileFromStorage(
        STORY_MEDIA_PATH + oldStory.icon,
      );
    }
    return updated;
  }

  async deleteStory(id: number): Promise<boolean> {
    const story = await this.storyRepository.getSuccessStory(id);
    const deleted = await this.storyRepository.deleteStory(id);
    if (!deleted) {
      throw new NotFoundException('Story not found');
    }
    FileStorageService.deleteFileFromStorage(STORY_MEDIA_PATH + story.icon);
    return deleted;
  }
}
