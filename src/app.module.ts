import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { DonationModule } from './donations/donations.module';
import { FAQModule } from './faqs/faqs.module';
import { FAQCategoryModule } from './faqcategories/faqcategories.module';
import { UserModule } from './user/users.module';
import { CountryModule } from './countries/countries.module';
import { WebinarModule } from './webinars/webinars.module';
import { RoleModule } from './roles/role.module';
import { CommitteeModule } from './committee/committee.module';
import { AuthModule } from './auth/auth.module';
import { ProgramsModule } from './programs/programs.module';
import { PermissionModule } from './permissions/permission.module';
import { StoryModule } from './stories/stories.module';
import { BlogModule } from './blogs/blogs.module';
import { BuddiesModule } from './buddies/buddies.module';
import { ApplicationModule } from './applications/applications.module';
import { InitialValuesModule } from './initialValues/initialValues.module';
import { LandingModule } from './landing/Landing.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DonationModule,
    FAQModule,
    FAQCategoryModule,
    CountryModule,
    WebinarModule,
    UserModule,
    AuthModule,
    RoleModule,
    CommitteeModule,
    UserModule,
    PermissionModule,
    DonationModule,
    ProgramsModule,
    BlogModule,
    StoryModule,
    BuddiesModule,
    ApplicationModule,
    InitialValuesModule,
    LandingModule,
    ReportsModule,
  ],
})
export class AppModule {}
