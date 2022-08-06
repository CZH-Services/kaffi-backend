import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/postgres/postgres.service';
import { Application } from './entities/Application';
import { Status } from './entities/Status';
import { UpdateApplication } from './entities/UpdateApplicationStatus';

@Injectable()
export class ApplicationRepository {
  constructor(private readonly database: PostgresService) {}

  async addApplication(application: Application): Promise<boolean> {
    return this.database
      .query(
        'INSERT INTO applications ("userId", "applicationId", "programId", "cycleId", "applicationStatus", "scholarshipStatus") VALUES ($1, $2, $3, $4, $5, $6)',
        [
          application.userId,
          application.applicationId,
          application.programId,
          application.cycleId,
          application.applicationStatus,
          application.scholarshipStatus,
        ],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async getApplications() {
    return this.database
      .query(
        `
    SELECT a.id, a."userId", k."firstname" || ' ' || k."lastname" as "fullname", 
    a."programId", p."name" as "programname",
    a."cycleId", pc."name" as "cyclename",
    a."applicationId", a."applicationStatus", a."scholarshipStatus"
    FROM public.applications a
    INNER JOIN public.kaffiuser k on a."userId" = k.id   
    INNER JOIN public.program p on a."programId" = p.id
    INNER JOIN public.programcycle pc on a."cycleId" = pc.id
    `,
      )
      .then((res) => {
        return res.rows;
      });
  }

  async updateApplicationStatus(
    updateApplication: UpdateApplication,
  ): Promise<boolean> {
    return this.database
      .query(
        'UPDATE applications SET "applicationStatus" = $1, "scholarshipStatus" = $2, "applicationId" = $3 WHERE id = $4',
        [
          updateApplication.applicationStatus,
          updateApplication.scholarshipStatus,
          updateApplication.applicationId,
          updateApplication.id,
        ],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async getTotalScholarshipRecipients(): Promise<number> {
    return this.database
      .query(
        'SELECT COUNT(*) FROM applications WHERE "scholarshipStatus" = $1',
        [Status.Approved],
      )
      .then((res) => {
        return res.rows[0].count;
      });
  }
}
