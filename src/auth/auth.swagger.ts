import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CommitteeModule } from 'src/committee/committee.module';
import { RoleModule } from 'src/roles/role.module';
import { UserModule } from 'src/user/users.module';
import { UserRoleModule } from 'src/userRoles/userRole.module';
import { AuthModule } from './auth.module';

export const authSwaggerConfiguration = (
  route: string,
  app: INestApplication,
) => {
  const options = new DocumentBuilder()
    .setTitle('Authentication')
    .setDescription('The authentication API description')
    .setVersion('1.0')
    .addTag('Authentication')
    .build();

  const programDocument = SwaggerModule.createDocument(app, options, {
    include: [
      AuthModule,
      CommitteeModule,
      RoleModule,
      UserModule,
      UserRoleModule,
    ],
  });
  SwaggerModule.setup(route, app, programDocument);
};
