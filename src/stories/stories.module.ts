import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PermissionModule } from 'src/permissions/permission.module';
import { PostgresModule } from 'src/postgres/postgres.module';
import { UserModule } from 'src/user/users.module';
import { StoryController } from 'src/stories/stories.controller';
import { StoryRepository } from 'src/stories/stories.repository';
import { StoryService } from 'src/stories/stories.service';

@Module({
  imports: [PostgresModule, UserModule, PermissionModule],
  controllers: [StoryController],
  providers: [JwtService, StoryService, StoryRepository],
})
export class StoryModule {}
