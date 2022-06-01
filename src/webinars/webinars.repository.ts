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

  async findOne(id: number): Promise<GetWebinarResponse> {
    return this.database
      .query(
        'SELECT w.id AS id, w.rank AS rank, w.youtubeUrl AS youtubeUrl, w.countryIconUrl AS countryIconUrl, c.name AS country, \
        c.id AS countryId FROM webinars AS w INNER JOIN countries AS c on w.countryId = c.id WHERE w.id = $1',
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
        'UPDATE webinars SET youtubeUrl = $1, countryIconUrl = $2, rank = $3 WHERE id = $4',
        [data.youtubeUrl, data.countryIconUrl, data.rank, data.id],
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
        'UPDATE webinars SET rank = rank - 1 WHERE rank >= $1 AND rank <= $2',
        [minRank, maxRank],
      );
    }
    return this.database.query(
      'UPDATE webinars SET rank = rank + 1 WHERE rank >= $1 AND rank <= $2',
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
}
