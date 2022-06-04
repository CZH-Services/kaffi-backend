import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ProgramsModule } from './programs.module';

export const programsSwaggerConfiguration = (
  route: string,
  app: INestApplication,
) => {
  const options = new DocumentBuilder()
    .setTitle('Programs')
    .setDescription('The programs API description')
    .setVersion('1.0')
    .addTag('Programs')
    .build();

  const programDocument = SwaggerModule.createDocument(app, options, {
    include: [ProgramsModule],
  });
  SwaggerModule.setup(route, app, programDocument);
};
