import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApplicationModule } from './applications.module';

export const applicationSwaggerConfiguration = (
  route: string,
  app: INestApplication,
) => {
  const options = new DocumentBuilder()
    .setTitle('Applications')
    .setDescription('The Applications API description')
    .setVersion('1.0')
    .addTag('Applications')
    .addBearerAuth()
    .build();

  const applicationDocument = SwaggerModule.createDocument(app, options, {
    include: [ApplicationModule],
  });
  SwaggerModule.setup(route, app, applicationDocument);
};
