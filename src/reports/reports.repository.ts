import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/postgres/postgres.service';
import { Report } from './entities/Report';

@Injectable()
export class ReportsRepository {
  constructor(private readonly database: PostgresService) {}

  async findAllAdmin(): Promise<Report[]> {
    return this.database.query(`SELECT * FROM reports`).then((res) => {
      return <Report[]>res.rows;
    });
  }

  async findAll(): Promise<Report[]> {
    return this.database
      .query(`SELECT * FROM reports where show = true`)
      .then((res) => {
        return <Report[]>res.rows;
      });
  }

  async create(report: Report): Promise<boolean> {
    return this.database
      .query(
        `INSERT INTO reports ("externalLink", image, show) VALUES ($1, $2, $3)`,
        [report.externalLink, report.image, report.show],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async update(report: Report): Promise<boolean> {
    return this.database
      .query(
        `UPDATE reports SET "externalLink" = $1, image = $2, show = $3 WHERE id = $4`,
        [report.externalLink, report.image, report.show, report.id],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async delete(id: number): Promise<boolean> {
    return this.database
      .query('DELETE FROM reports WHERE id = $1', [id])
      .then((res) => {
        return res.rowCount > 0;
      });
  }
}
