import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/postgres/postgres.service';
import { Application } from './entities/Application';

@Injectable()
export class ApplicationRepository {
  constructor(private readonly database: PostgresService) {}

  async addApplication(application: Application): Promise<boolean> {
    return this.database
      .query(
        'INSERT INTO applications ("userId", "programId", "cycleId", "applicationStatus", "scholarshipStatus") VALUES ($1, $2, $3, $4)',
        [
          application.userId,
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

  async getApplications(): Promise<Application[]> {
    return this.database.query('SELECT * FROM applications').then((res) => {
      return <Application[]>res.rows;
    });
  }

  async updateApplicationStatus(id: number, status: string): Promise<boolean> {
    return this.database
      .query('UPDATE applications SET "applicationStatus" = $1 WHERE id = $2', [
        status,
        id,
      ])
      .then((res) => {
        return res.rowCount > 0;
      });
  }
}
