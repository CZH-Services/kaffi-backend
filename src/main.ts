import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS for client app
  app.enableCors({ origin: process.env.CLIENT_URL });

  // Validations configuration
  app.useGlobalPipes(new ValidationPipe());

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Kaffi')
    .setDescription('Kaffi API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
