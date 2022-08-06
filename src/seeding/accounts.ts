import { Permission } from 'src/permissions/entities/permission';
import { PermissionRepository } from 'src/permissions/permission.repository';
import { Role } from 'src/roles/entities/role';
import { hashString } from 'src/services/HashString';
import { CreateUser } from 'src/user/dto/createUser';
import { UserRepository } from 'src/user/repositories/users.repository';

export const initiateAdminUser = async (postgresService) => {
  const userRepository = new UserRepository(postgresService);

  const env = process.env;
  const hashedPassword = await hashString(env.ADMIN_PASSWORD);
  const adminUser: CreateUser = {
    email: env.ADMIN_EMAIL,
    password: hashedPassword,
    firstName: 'Admin',
    lastName: 'Admin',
    authWithGoogle: false,
    location: '',
    profile: undefined,
  };
  const user = await userRepository.findOne(adminUser.email);
  if (!user) {
    await userRepository.createUser(adminUser);
    const admin = await userRepository.findOne(adminUser.email);
    const permissionRepository = new PermissionRepository(postgresService);

    const adminPermission: Permission = {
      id: 0,
      userId: admin.id,
      role: Role.ADMIN,
      committee: null,
      isCommitteeHead: true,
    };
    await permissionRepository.assignPermissionToUser(adminPermission);
  }
};
