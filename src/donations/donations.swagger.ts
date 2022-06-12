import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DonationModule } from './donations.module';

export const donationsSwaggerConfiguration = (
  route: string,
  app: INestApplication,
) => {
  const options = new DocumentBuilder()
    .setTitle('Donations')
    .setDescription('The donations API description')
    .setVersion('1.0')
    .addTag('Donations')
    .build();

  const programDocument = SwaggerModule.createDocument(app, options, {
    include: [DonationModule],
  });
  SwaggerModule.setup(route, app, programDocument);
};
