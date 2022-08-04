import { Injectable } from '@nestjs/common';
import { ApplicationRepository } from './applications.repository';
import { AddApplication } from './entities/AddApplication';
import { Application } from './entities/Application';
import { ApplicationResponse } from './entities/ApplicationResponse';
import { Status } from './entities/Status';
import { UpdateApplication } from './entities/UpdateApplicationStatus';

@Injectable()
export class ApplicationService {
  constructor(private readonly applicationsRepository: ApplicationRepository) {}

  async addApplication(newApplication: AddApplication): Promise<boolean> {
    const application: Application = {
      id: 0,
      applicationStatus: Status.Pending,
      scholarshipStatus: Status.Pending,
      ...newApplication,
    };
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
