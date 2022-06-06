import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AddWebinarRequest } from './dto/addWebinarRequest';
import { AddWebinarStepRequest } from './dto/addWebinarStepRequest';
import { GetWebinarResponse } from './dto/getWebinarResponse';
import { UpdateWebinarRequest } from './dto/updateWebinarRequest';
import { UpdateWebinarStepRequest } from './dto/updateWebinarStepRequest';
import { WebinarStep } from './entities/webinarStep';
@Injectable()
export class WebinarRepository {
  constructor(private readonly database: DatabaseService) {}

  async findAllWebinars(): Promise<GetWebinarResponse[]> {
    return this.database
      .query(
        'SELECT w.id AS id, w.rank AS rank, w."youtubeUrl" AS "youtubeUrl", w."countryIconUrl" AS "countryIconUrl", \
         w."selectedCountryIconUrl" AS "selectedCountryIconUrl" ,c.name AS country, c.id AS "countryId"\
         FROM webinars AS w INNER JOIN countries AS c on w."countryId" = c.id ORDER BY rank',
      )
      .then((res) => {
        return res.rows.map((webinar: any) => <GetWebinarResponse>webinar);
      });
  }

  async findOne(id: number): Promise<GetWebinarResponse> {
    return this.database
      .query(
        'SELECT w.id AS id, w.rank AS rank, w."youtubeUrl" AS "youtubeUrl", w."countryIconUrl" AS "countryIconUrl", w."selectedCountryIconUrl" AS "selectedCountryIconUrl" ,\
         c.name AS country, c.id AS "countryId" FROM webinars AS w INNER JOIN countries AS c on w."countryId" = c.id WHERE w.id = $1',
        [id],
      )
      .then((res) => {
        if (res.rows.length === 1) {
          return <GetWebinarResponse>res.rows[0];
        }
        return undefined;
      });
  }

  async getCountryWebinar(countryId: number): Promise<GetWebinarResponse> {
    return this.database
      .query(
        'SELECT w.id AS id, w.rank AS rank, w."youtubeUrl" AS "youtubeUrl", w."countryIconUrl" AS "countryIconUrl",  w."selectedCountryIconUrl" AS "selectedCountryIconUrl" \
        , c.id AS "countryId", c.name AS country FROM webinars AS w INNER JOIN countries AS c on w."countryId" = c.id WHERE c.id = $1',
        [countryId],
      )
      .then((res) => {
        if (res.rows.length === 1) {
          return <GetWebinarResponse>res.rows[0];
        }
        return undefined;
      });
  }

  async addWebinar(data: AddWebinarRequest, rank: number): Promise<boolean> {
    return this.database
      .query(
        'INSERT INTO webinars (rank, "youtubeUrl", "countryIconUrl", "selectedCountryIconUrl", "countryId")\
        VALUES ($1, $2, $3, $4, $5)',
        [
          rank,
          data.youtubeUrl,
          data.countryIconUrl,
          data.selectedCountryIconUrl,
          data.countryId,
        ],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async updateWebinar(data: UpdateWebinarRequest): Promise<boolean> {
    return this.database
      .query(
        'UPDATE webinars SET "youtubeUrl" = $1, "countryIconUrl" = $2, "selectedCountryIconUrl" = $3, rank = $4 WHERE id = $5',
        [
          data.youtubeUrl,
          data.countryIconUrl,
          data.selectedCountryIconUrl,
          data.rank,
          data.id,
        ],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async updateWebinarsRank(
    minRank: number,
    maxRank: number,
    increment: boolean,
  ): Promise<void> {
    if (increment) {
      return this.database.query(
        'UPDATE webinars SET rank = rank + 1 WHERE rank >= $1 AND rank <= $2',
        [minRank, maxRank],
      );
    }
    return this.database.query(
      'UPDATE webinars SET rank = rank - 1 WHERE rank >= $1 AND rank <= $2',
      [minRank, maxRank],
    );
  }

  async getHighestWebinarRanks(): Promise<number> {
    return this.database
      .query('SELECT MAX(rank) AS max from webinars')
      .then((res) => {
        if (res.rows.length === 1) {
          return <number>res.rows[0].max;
        }
        return 0;
      });
  }

  async deleteWebinar(id: number): Promise<boolean> {
    return this.database
      .query('DELETE FROM webinars WHERE id = $1', [id])
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async deleteWebinarSteps(id: number): Promise<boolean> {
    return this.database
      .query('DELETE FROM WebinarSteps WHERE "webinarId" = $1', [id])
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async getAllWebinarSteps(webinarId: number): Promise<WebinarStep[]> {
    return this.database
      .query(
        'SELECT * FROM WebinarSteps WHERE "webinarId" = $1 ORDER BY rank',
        [webinarId],
      )
      .then((res) => {
        return res.rows.map((step: any) => <WebinarStep>step);
      });
  }

  async getWebinarStep(id: number): Promise<WebinarStep> {
    return this.database
      .query('SELECT * FROM WebinarSteps WHERE id = $1', [id])
      .then((res) => {
        if (res.rows.length === 1) {
          return <WebinarStep>res.rows[0];
        }
        return undefined;
      });
  }

  async addWebinarStep(
    step: AddWebinarStepRequest,
    rank: number,
  ): Promise<boolean> {
    return this.database
      .query(
        'INSERT INTO WebinarSteps ("webinarId", title, paragraph, rank) VALUES ($1, $2, $3, $4)',
        [step.webinarId, step.title, step.paragraph, rank],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async updateWebinarStep(step: UpdateWebinarStepRequest): Promise<boolean> {
    return this.database
      .query(
        'UPDATE WebinarSteps SET title = $1, paragraph = $2, rank = $3 WHERE id = $4',
        [step.title, step.paragraph, step.rank, step.id],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async deleteWebinarStep(id: number): Promise<boolean> {
    return this.database
      .query('DELETE FROM WebinarSteps WHERE id = $1', [id])
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async updateWebinarStepRank(
    minRank: number,
    maxRank: number,
    increment: boolean,
  ): Promise<void> {
    if (increment) {
      return this.database.query(
        'UPDATE WebinarSteps SET rank = rank + 1 WHERE rank >= $1 AND rank <= $2',
        [minRank, maxRank],
      );
    }
    return this.database.query(
      'UPDATE WebinarSteps SET rank = rank - 1 WHERE rank >= $1 AND rank <= $2',
      [minRank, maxRank],
    );
  }

  async getHighestWebinarStepsRanks(webinarId: number): Promise<number> {
    return this.database
      .query(
        'SELECT MAX(rank) AS max from WebinarSteps WHERE "webinarId" = $1',
        [webinarId],
      )
      .then((res) => {
        if (res.rows.length === 1) {
          return <number>res.rows[0].max;
        }
        return 0;
      });
  }
}
