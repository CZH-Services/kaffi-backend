import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FAQCategoryModule } from './faqcategories.module';

export const faqcategoriesSwaggerConfiguration = (
  route: string,
  app: INestApplication,
) => {
  const options = new DocumentBuilder()
    .setTitle('Donations')
    .setDescription('The faq categories API description')
    .setVersion('1.0')
    .addTag('FAQ Categories')
    .build();

  const programDocument = SwaggerModule.createDocument(app, options, {
    include: [FAQCategoryModule],
  });
  SwaggerModule.setup(route, app, programDocument);
};
