import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { authSwaggerConfiguration } from './auth/auth.swagger';
import { donationsSwaggerConfiguration } from './donations/donations.swagger';
import { programsSwaggerConfiguration } from './programs/programs.swagger';
import { webinarsSwaggerConfiguration } from './webinars/webinars.swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS for client app
  app.enableCors({ origin: process.env.CLIENT_URL });

  // Validations configuration
  app.useGlobalPipes(new ValidationPipe());

  // Swagger configuration
  const baseRoute = 'api';
  authSwaggerConfiguration(`${baseRoute}/auth`, app);
  webinarsSwaggerConfiguration(`${baseRoute}/webinars`, app);
  programsSwaggerConfiguration(`${baseRoute}/programs`, app);
  donationsSwaggerConfiguration(`${baseRoute}/donations`, app);

  await app.listen(process.env.PORT);
}
bootstrap();
