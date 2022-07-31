import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PermissionServices } from 'src/permissions/permission.services';
import { BuddyRespository } from './buddies.respository';
import { CreateBuddiesRequest } from './dto/createBuddiesRequest';
import { GetBuddiesResponse } from './dto/getBuddiesResponse';
import { firstPermissionIsEquivalientToSecond } from 'src/services/PermissionsHelpers';
import { Role } from '../roles/entities/role';
import { Committee } from 'src/committee/entities/committee';

@Injectable()
export class BuddyService {
  constructor(
    private readonly buddyRespository: BuddyRespository,
    private readonly permissionServices: PermissionServices,
  ) {}

  async findAllBuddies(): Promise<GetBuddiesResponse[]> {
    return await this.buddyRespository.findAllBuddies();
  }

  async findUserBuddies(userId: number): Promise<GetBuddiesResponse[]> {
    return await this.buddyRespository.findUserBuddies(userId);
  }

  async createBuddiesConnection(data: CreateBuddiesRequest): Promise<boolean> {
    const studentPermissions = await this.permissionServices.getPermissions(
      data.studentId,
    );

    if (
      !studentPermissions.some((permission) => {
        return firstPermissionIsEquivalientToSecond(permission, {
          role: Role.STUDENT,
          committee: Committee.ADVISING,
        });
      })
    ) {
      throw new ForbiddenException(
        'Student does not have permission to connect',
      );
    }

    const buddyPermissions = await this.permissionServices.getPermissions(
      data.buddyId,
    );

    if (
      !buddyPermissions.some((permission) => {
        return firstPermissionIsEquivalientToSecond(permission, {
          role: Role.BUDDY,
        });
      })
    ) {
      throw new ForbiddenException('Buddy does not have permission to connect');
    }

    if (
      await this.buddyRespository.findOneBuddyConnection(
        data.studentId,
        data.buddyId,
      )
    ) {
      throw new HttpException(
        'Buddy connection already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.buddyRespository.createBuddiesConnection(data);
  }

  async deleteBuddiesConnection(id: number): Promise<boolean> {
    const deleteResponse = await this.buddyRespository.deleteBuddiesConnection(
      id,
    );
    if (!deleteResponse) {
      throw new HttpException(
        'Buddy connection not Found',
        HttpStatus.NOT_FOUND,
      );
    }
    return deleteResponse;
  }
}
