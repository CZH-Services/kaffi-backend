import { Module } from '@nestjs/common';
import { FAQRepository } from './faqs.repository';
import { FAQController } from './faqs.controller';
import { FAQService } from './faqs.service';
import { PostgresModule } from 'src/postgres/postgres.module';
import { JwtService } from '@nestjs/jwt';
import { PermissionModule } from 'src/permissions/permission.module';
import { UserModule } from 'src/user/users.module';

@Module({
  imports: [PostgresModule, UserModule, PermissionModule],
  controllers: [FAQController],
  providers: [FAQService, FAQRepository, JwtService],
})
export class FAQModule {}
