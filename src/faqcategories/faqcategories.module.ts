import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PermissionModule } from 'src/permissions/permission.module';
import { PostgresModule } from 'src/postgres/postgres.module';
import { UserModule } from 'src/user/users.module';
import { FAQCategoryController } from './faqcategories.controller';
import { FAQCategoryRepository } from './faqcategories.repository';
import { FAQCategoryService } from './faqcategories.service';

@Module({
  imports: [PostgresModule, UserModule, PermissionModule],
  controllers: [FAQCategoryController],
  providers: [FAQCategoryService, FAQCategoryRepository, JwtService],
})
export class FAQCategoryModule {}
