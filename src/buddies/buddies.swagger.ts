import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BuddiesModule } from './buddies.module';

export const buddiesSwaggerConfiguration = (
  route: string,
  app: INestApplication,
) => {
  const options = new DocumentBuilder()
    .setTitle('Bduddies')
    .setDescription('The Buddies API description')
    .setVersion('1.0')
    .addTag('Buddies')
    .addBearerAuth()
    .build();

  const programDocument = SwaggerModule.createDocument(app, options, {
    include: [BuddiesModule],
  });
  SwaggerModule.setup(route, app, programDocument);
};
