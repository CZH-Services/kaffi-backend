import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LandingModule } from './Landing.module';

export const landingSwaggerConfiguration = (
  route: string,
  app: INestApplication,
) => {
  const options = new DocumentBuilder()
    .setTitle('landing')
    .setDescription('The landing API description')
    .setVersion('1.0')
    .addTag('landing')
    .addBearerAuth()
    .build();

  const programDocument = SwaggerModule.createDocument(app, options, {
    include: [LandingModule],
  });
  SwaggerModule.setup(route, app, programDocument);
};
