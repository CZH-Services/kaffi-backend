import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/postgres/postgres.service';
import { GetInitialValues } from './dto/getInitialValues';
import { UpdateInitialValues } from './dto/updateInitialValues';

@Injectable()
export class InitialValuesRespository {
  constructor(private readonly database: PostgresService) {}

  async getInitialValues(): Promise<GetInitialValues> {
    return this.database
      .query(`SELECT volunteers, "scholarshipRecipients" FROM "initialValues"`)
      .then((res) => {
        if (res.rowCount > 0) {
          return res.rows[0];
        }
        return undefined;
      });
  }

  async addInitialValues(data: UpdateInitialValues): Promise<boolean> {
    if (await this.getInitialValues()) return true;
    return this.database
      .query(
        'INSERT INTO "initialValues" ("volunteers", "scholarshipRecipients") VALUES ($1, $2)',
        [data.volunteers, data.scholarshipRecipients],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async updateInitialValues(data: UpdateInitialValues): Promise<boolean> {
    return this.database
      .query(
        'UPDATE "initialValues" SET volunteers = $1, "scholarshipRecipients" = $2',
        [data.volunteers, data.scholarshipRecipients],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }
}
