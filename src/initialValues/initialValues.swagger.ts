import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { InitialValuesModule } from './initialValues.module';

export const initialValuesSwaggerConfiguration = (
  route: string,
  app: INestApplication,
) => {
  const options = new DocumentBuilder()
    .setTitle('initialValues')
    .setDescription('The initialValues API description')
    .setVersion('1.0')
    .addTag('initialValues')
    .addBearerAuth()
    .build();

  const programDocument = SwaggerModule.createDocument(app, options, {
    include: [InitialValuesModule],
  });
  SwaggerModule.setup(route, app, programDocument);
};
