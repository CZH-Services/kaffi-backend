import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { StoryModule } from './stories.module';

export const storySwaggerConfiguration = (
  route: string,
  app: INestApplication,
) => {
  const options = new DocumentBuilder()
    .setTitle('Stories')
    .setDescription('The stories API description')
    .setVersion('1.0')
    .addTag('Stories')
    .build();

  const storyDocument = SwaggerModule.createDocument(app, options, {
    include: [StoryModule],
  });
  SwaggerModule.setup(route, app, storyDocument);
};
