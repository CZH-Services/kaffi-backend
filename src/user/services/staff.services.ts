import { HttpException, HttpStatus, Injectable, Scope } from '@nestjs/common';
import { CreateStaff } from '../dto/createStaff';
import { GetStaffResponse } from '../dto/getStaffResponse';
import { Staff } from '../entities/staff';
import { StaffTag } from '../entities/staffTag';
import { StaffRepository } from '../repositories/staff.repository';
import { UsersServices } from './users.services';
import { hashString } from 'src/services/HashString';

@Injectable()
export class StaffServices {
  constructor(
    private readonly staffRepository: StaffRepository,
    private readonly userServices: UsersServices,
  ) {}

  getStaffTags(): string[] {
    return Object.values(StaffTag);
  }

  async createStaff(staff: Staff): Promise<Boolean> {
    return await this.staffRepository.createStaff(staff);
  }

  async createStaffUser(staffUser: CreateStaff): Promise<Boolean> {
    staffUser.password = await hashString(staffUser.password);
    const user = await this.userServices.createAndGetUser({
      email: staffUser.email,
      password: staffUser.password,
      firstName: staffUser.firstName,
      lastName: staffUser.lastName,
      profile: null,
      location: staffUser.location,
      authWithGoogle: false,
    });

    const rank = (await this.staffRepository.getHighestStaffRank()) + 1;

    const staff = await this.staffRepository.createStaff({
      title: staffUser.title,
      tag: staffUser.tag,
      rank: rank,
      userId: user.id,
    });

    return Boolean(user);
  }

  async getStaffUsers(): Promise<GetStaffResponse[]> {
    return this.staffRepository.getStaff();
  }
}
