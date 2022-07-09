import { HttpException, HttpStatus, Injectable, Scope } from '@nestjs/common';
import { CreateStaff } from '../dto/createStaff';
import { GetStaffResponse } from '../dto/getStaffResponse';
import { StaffTag } from '../entities/staffTag';
import { StaffRepository } from '../repositories/staff.repository';
import { UsersServices } from './users.services';
import { hashString } from 'src/services/HashString';
import { UpdateStaffInfoByAdminRequest } from '../dto/updateStaffInfoByAdminRequest';
import { AddStaffInfo } from '../dto/addStaffInfo';
import { PermissionServices } from 'src/permissions/permission.services';
import { GetStaffByTagWithCommitteesHead } from '../dto/getStaffByTagWithCommitteesHead';

@Injectable()
export class StaffServices {
  constructor(
    private readonly staffRepository: StaffRepository,
    private readonly userServices: UsersServices,
    private readonly permissionServices: PermissionServices,
  ) {}

  getStaffTags(): string[] {
    return Object.values(StaffTag);
  }

  async addStaffInfo(staff: AddStaffInfo): Promise<Boolean> {
    const rank = (await this.staffRepository.getHighestStaffRank()) + 1;
    return await this.staffRepository.createStaff({
      ...staff,
      rank: rank,
      userId: staff.id,
    });
  }

  async removeFromStaff(userId: number): Promise<Boolean> {
    await this.permissionServices.deleteUserStaffRoles(userId);
    return await this.staffRepository.deleteStaffRow(userId);
  }

  async deleteStaff(userId: number): Promise<Boolean> {
    const staff = await this.staffRepository.findOne(userId);
    if (!staff) {
      throw new HttpException('staff not Found', HttpStatus.NOT_FOUND);
    }
    this.staffRepository.updateStaffRank(staff.rank + 1, -1, false);
    return await this.userServices.deleteUser(userId);
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

    this.staffRepository.createStaff({
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

  async getStaffByTag(tag: string): Promise<GetStaffResponse[]> {
    return this.staffRepository.getStaffByTag(tag);
  }

  async getstaffGroupedByTagWithCommitteeHeads(): Promise<GetStaffByTagWithCommitteesHead> {
    const boardStaff = await this.getStaffByTag('Board');
    const memberStaff = await this.getStaffByTag('Member');

    let boardStaffWithCommitteeHeads = [];
    for (let staff of boardStaff) {
      const committeeHeads = await this.staffRepository.getStaffCommitteesHead(
        staff.id,
      );
      boardStaffWithCommitteeHeads = [
        ...boardStaffWithCommitteeHeads,
        { ...staff, committeeHeads },
      ];
    }

    let memberStaffWithCommitteeHeads = [];
    for (let staff of memberStaff) {
      const committeeHeads = await this.staffRepository.getStaffCommitteesHead(
        staff.id,
      );
      memberStaffWithCommitteeHeads = [
        ...memberStaffWithCommitteeHeads,
        { ...staff, committeeHeads },
      ];
    }
    return {
      board: boardStaffWithCommitteeHeads,
      member: memberStaffWithCommitteeHeads,
    };
  }

  async updateStaff(staff: UpdateStaffInfoByAdminRequest): Promise<Boolean> {
    const highestRank = await this.staffRepository.getHighestStaffRank();
    if (staff.rank > highestRank || staff.rank <= 0) {
      throw new HttpException(
        'Rank must be less than or equal to highest rank',
        HttpStatus.BAD_REQUEST,
      );
    }

    const prevStaff = await this.staffRepository.findOne(<number>staff.id);
    if (!prevStaff) {
      throw new HttpException('Webinar not Found', HttpStatus.NOT_FOUND);
    }

    if (staff.rank !== prevStaff.rank) {
      const increment = staff.rank > prevStaff.rank;
      const minRank = increment ? prevStaff.rank + 1 : staff.rank;
      const maxRank = increment ? staff.rank : prevStaff.rank - 1;
      await this.staffRepository.updateStaffRank(minRank, maxRank, !increment);
    }

    return await this.staffRepository.updateStaff(staff);
  }
}
