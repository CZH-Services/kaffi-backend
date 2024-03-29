import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { authSwaggerConfiguration } from './auth/auth.swagger';
import { donationsSwaggerConfiguration } from './donations/donations.swagger';
import { faqcategoriesSwaggerConfiguration } from './faqcategories/faqcategories.swagger';
import { faqsSwaggerConfiguration } from './faqs/faqs.swagger';
import { programsSwaggerConfiguration } from './programs/programs.swagger';
import { webinarsSwaggerConfiguration } from './webinars/webinars.swagger';
import { blogsSwaggerConfiguration } from './blogs/blogs.swagger';
import { storySwaggerConfiguration } from './stories/stories.swagger';
import { buddiesSwaggerConfiguration } from './buddies/buddies.swagger';
import { applicationSwaggerConfiguration } from './applications/applications.swagger';
import { initialValuesSwaggerConfiguration } from './initialValues/initialValues.swagger';
import { landingSwaggerConfiguration } from './landing/Landing.swagger';
import { seeding } from './seeding/seeding';
import { reportsSwaggerConfiguration } from './reports/reports.swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // CORS for client app
  app.enableCors({ origin: '*' });

  // Validations configuration
  app.useGlobalPipes(new ValidationPipe());

  await seeding();

  // Swagger configuration
  const baseRoute = 'api';
  authSwaggerConfiguration(`${baseRoute}/auth`, app);
  webinarsSwaggerConfiguration(`${baseRoute}/webinars`, app);
  programsSwaggerConfiguration(`${baseRoute}/programs`, app);
  donationsSwaggerConfiguration(`${baseRoute}/donations`, app);
  faqsSwaggerConfiguration(`${baseRoute}/faqs`, app);
  faqcategoriesSwaggerConfiguration(`${baseRoute}/faq-categories`, app);
  blogsSwaggerConfiguration(`${baseRoute}/blogs`, app);
  storySwaggerConfiguration(`${baseRoute}/stories`, app);
  buddiesSwaggerConfiguration(`${baseRoute}/buddies`, app);
  applicationSwaggerConfiguration(`${baseRoute}/applications`, app);
  initialValuesSwaggerConfiguration(`${baseRoute}/initial-values`, app);
  landingSwaggerConfiguration(`${baseRoute}/landing`, app);
  reportsSwaggerConfiguration(`${baseRoute}/reports`, app);

  await app.listen(process.env.PORT);
}
bootstrap();
