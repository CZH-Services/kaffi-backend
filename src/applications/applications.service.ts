import { ForbiddenException, Injectable } from '@nestjs/common';
import { Committee } from 'src/committee/entities/committee';
import { PermissionResponse } from 'src/permissions/dto/permissionResponse';
import { PermissionServices } from 'src/permissions/permission.services';
import { ProgramCyclesService } from 'src/programs/services/programCycles.service';
import { ProgramServices } from 'src/programs/services/programs.service';
import { Role } from 'src/roles/entities/role';
import { ApplicationRepository } from './applications.repository';
import { AddApplication } from './entities/AddApplication';
import { Application } from './entities/Application';
import { ApplicationResponse } from './entities/ApplicationResponse';
import { Status } from './entities/Status';
import { UpdateApplication } from './entities/UpdateApplicationStatus';

@Injectable()
export class ApplicationService {
  constructor(
    private readonly applicationsRepository: ApplicationRepository,
    private readonly permissionsServices: PermissionServices,
    private readonly programServices: ProgramServices,
    private readonly cycleServices: ProgramCyclesService,
  ) {}

  async addApplication(newApplication: AddApplication): Promise<boolean> {
    const application: Application = {
      id: 0,
      applicationStatus: Status.Pending,
      scholarshipStatus: Status.Pending,
      ...newApplication,
    };

    const studentPermissions = await this.permissionsServices.getPermissions(
      newApplication.userId,
    );

    const currentPermissions = studentPermissions.filter(
      (permission: PermissionResponse) =>
        permission.role == Role.STUDENT &&
        permission.committee == Committee.SCHOLARSHIP,
    );

    if (currentPermissions.length == 0) {
      throw new ForbiddenException(
        'Student should have a student role in the scholarship committee',
      );
    }

    await this.programServices.getProgram(newApplication.programId);
    await this.cycleServices.getProgramCycle(newApplication.cycleId);

    return this.applicationsRepository.addApplication(application);
  }

  async getApplications(): Promise<ApplicationResponse[]> {
    return <ApplicationResponse[]>(
      await this.applicationsRepository.getApplications()
    );
  }

  async updateApplication(
    updateApplication: UpdateApplication,
  ): Promise<boolean> {
    return await this.applicationsRepository.updateApplicationStatus(
      updateApplication,
    );
  }
}
