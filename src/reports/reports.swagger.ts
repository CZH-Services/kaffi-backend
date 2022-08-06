import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ReportsModule } from './reports.module';

export const reportsSwaggerConfiguration = (
  route: string,
  app: INestApplication,
) => {
  const options = new DocumentBuilder()
    .setTitle('Reports')
    .setDescription('The Reports API description')
    .setVersion('1.0')
    .addTag('Reports')
    .addBearerAuth()
    .build();

  const reportsDocument = SwaggerModule.createDocument(app, options, {
    include: [ReportsModule],
  });
  SwaggerModule.setup(route, app, reportsDocument);
};
