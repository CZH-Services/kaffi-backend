import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/postgres/postgres.service';
import { Story } from './entities/story';

@Injectable()
export class StoryRepository {
  constructor(private readonly database: PostgresService) {}

  async createStory(story: Story): Promise<boolean> {
    return this.database
      .query(
        `INSERT INTO success_stories (name, quote, major, image, cycle, primary_story, country_code) VALUES($1, $2, $3, $4, $5, $6, $7);`,
        [
          story.name,
          story.quote,
          story.major,
          story.icon,
          story.cycle,
          story.primary,
          story.country_code,
        ],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async getSuccessStory(id: number): Promise<Story> {
    return this.database
      .query(`SELECT image as icon , * FROM success_stories WHERE id = $1;`, [
        id,
      ])
      .then((res) => {
        if (res.rowCount > 0) {
          return <Story>res.rows[0];
        }
        return undefined;
      });
  }

  async getPrimarySuccessStories(): Promise<Story[]> {
    return this.database
      .query(`SELECT * FROM success_stories WHERE primary_story = true;`)
      .then((res) => {
        return res.rows;
      });
  }

  async getSuccessStories(): Promise<Story[]> {
    return this.database.query(`SELECT * FROM success_stories`).then((res) => {
      return res.rows;
    });
  }

  async updateStory(story: Story): Promise<boolean> {
    const query = `UPDATE success_stories SET name = $1, quote = $2, major = $3, cycle = $5, country_code = $6 , primary_story = $7 `;
    const queryWithoutIcon = query + 'WHERE id = $8';
    const queryWithIcon = query + ', image = $4 where id = $8';

    return this.database
      .query(story.icon ? queryWithIcon : queryWithoutIcon, [
        story.name,
        story.quote,
        story.major,
        story.icon,
        story.cycle,
        story.country_code,
        story.primary,
        story.id,
      ])
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async deleteStory(id: number): Promise<boolean> {
    return this.database
      .query(`DELETE FROM success_stories WHERE id = $1;`, [id])
      .then((res) => {
        return res.rowCount > 0;
      });
  }
}
