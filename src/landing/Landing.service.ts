import { Injectable } from '@nestjs/common';
import { ApplicationService } from 'src/applications/applications.service';
import { DonationsService } from 'src/donations/donations.service';
import { InitialValuesService } from 'src/initialValues/initialValues.service';
import { PermissionServices } from 'src/permissions/permission.services';
import { LandingInfo } from './entites/LandingInfo';

@Injectable()
export class LandingService {
  constructor(
    private readonly donationService: DonationsService,
    private readonly applicationService: ApplicationService,
    private readonly permissionService: PermissionServices,
    private readonly initialValuesService: InitialValuesService,
  ) {}

  async getLandingInformation(): Promise<LandingInfo> {
    const initialValuesService =
      await this.initialValuesService.getInitialValues();
    const donations = <string>await this.donationService.getDonationAmount();
    const scholarshipRecipients =
      Number(
        <number>await this.applicationService.getTotalScholarshipRecipients(),
      ) + Number(<number>initialValuesService.scholarshipRecipients);
    const volunteers =
      Number(
        <number>await this.permissionService.getTotalNumberOfVolunteers(),
      ) + Number(<number>initialValuesService.volunteers);

    return { donations, scholarshipRecipients, volunteers };
  }
}
