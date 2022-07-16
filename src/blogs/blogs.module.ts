import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PermissionModule } from 'src/permissions/permission.module';
import { PostgresModule } from 'src/postgres/postgres.module';
import { UserModule } from 'src/user/users.module';
import { BlogsController } from './blogs.controller';
import { BlogsRespository } from './blogs.repository';
import { BlogService } from './blogs.service';

@Module({
  imports: [PostgresModule, UserModule, PermissionModule],
  controllers: [BlogsController],
  providers: [BlogService, BlogsRespository, JwtService],
})
export class BlogModule {}
