import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AddWebinarRequest } from './dto/addWebinarRequest';
import { GetWebinarResponse } from './dto/getWebinarResponse';
import { UpdateWebinarRequest } from './dto/updateWebinarRequest';
@Injectable()
export class WebinarRepository {
  constructor(private readonly database: DatabaseService) {}

  async findAllWebinars(): Promise<GetWebinarResponse[]> {
    return this.database
      .query(
        'SELECT w.id AS id, w.rank AS rank, w.youtubeUrl AS youtubeUrl, w.countryIconUrl AS countryIconUrl, c.name AS country FROM webinars AS w INNER JOIN countries AS c on w.countryId = c.id',
      )
      .then((res) => {
        return res.rows.map((webinar: any) => <GetWebinarResponse>webinar);
      });
  }

  async getCountryWebinar(countryId: number): Promise<GetWebinarResponse> {
    return this.database
      .query(
        'SELECT w.id AS id, w.rank AS rank, w.youtubeUrl AS youtubeUrl, w.countryIconUrl AS countryIconUrl, c.name AS country\
         FROM webinars AS w INNER JOIN countries AS c on w.countryId = c.id WHERE c.id = $1',
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
        'INSERT INTO webinars (rank, youtubeUrl, countryIconUrl, countryId)\
        VALUES ($1, $2, $3, $4)',
        [rank, data.youtubeUrl, data.countryIconUrl, data.countryId],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async updateWebinar(data: UpdateWebinarRequest): Promise<boolean> {
    return this.database
      .query(
        'UPDATE webinars SET youtubeUrl = $1, countryIconUrl = $2 WHERE id = $3',
        [data.youtubeUrl, data.countryIconUrl, data.id],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
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
}
