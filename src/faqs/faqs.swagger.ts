import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FAQModule } from './faqs.module';

export const faqsSwaggerConfiguration = (
  route: string,
  app: INestApplication,
) => {
  const options = new DocumentBuilder()
    .setTitle('Donations')
    .setDescription('The faqs API description')
    .setVersion('1.0')
    .addTag('Donations')
    .build();

  const programDocument = SwaggerModule.createDocument(app, options, {
    include: [FAQModule],
  });
  SwaggerModule.setup(route, app, programDocument);
};
