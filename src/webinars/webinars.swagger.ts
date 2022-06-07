import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CountryModule } from 'src/countries/countries.module';
import { WebinarModule } from './webinars.module';

export const webinarsSwaggerConfiguration = (
  route: string,
  app: INestApplication,
) => {
  const options = new DocumentBuilder()
    .setTitle('Webinars')
    .setDescription('The webinars API description')
    .setVersion('1.0')
    .addTag('Webinars')
    .build();

  const programDocument = SwaggerModule.createDocument(app, options, {
    include: [WebinarModule, CountryModule],
  });
  SwaggerModule.setup(route, app, programDocument);
};
