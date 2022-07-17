import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BlogModule } from './blogs.module';

export const blogsSwaggerConfiguration = (
  route: string,
  app: INestApplication,
) => {
  const options = new DocumentBuilder()
    .setTitle('Blogs')
    .setDescription('The Blogs API description')
    .setVersion('1.0')
    .addTag('Blogs')
    .addBearerAuth()
    .build();

  const programDocument = SwaggerModule.createDocument(app, options, {
    include: [BlogModule],
  });
  SwaggerModule.setup(route, app, programDocument);
};
