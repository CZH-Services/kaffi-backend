import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/postgres/postgres.service';
import { AddBlogRequest } from './dto/addBlogRequest';
import { GetBlogResponse } from './dto/blogResponse';
import { GetBlogResponseForAdmin } from './dto/blogResponseForAdmin';
import { UpdateBlogRequest } from './dto/updateBlog';

@Injectable()
export class BlogsRespository {
  constructor(private readonly database: PostgresService) {}

  async findAllBlogs(): Promise<GetBlogResponse[]> {
    return this.database
      .query(
        `SELECT b.id AS id, b."title" AS "title", 
         b."summary" AS "summary", b."image" AS "image", 
         b."date" AS "date", b."externalLink" AS "externalLink"
         FROM blogs AS b ORDER BY date DESC`,
      )
      .then((res) => {
        return res.rows;
      });
  }

  async findAllBlogsForAdmin(): Promise<GetBlogResponseForAdmin[]> {
    return this.database
      .query(
        `SELECT b.id AS id, b."title" AS "title", 
         b."summary" AS "summary", b."image" AS "image", 
         b."date" AS "date", b."externalLink" AS "externalLink",
         b."HTMLString" AS "HTMLString"
         FROM blogs AS b ORDER BY date DESC`,
      )
      .then((res) => {
        return res.rows;
      });
  }

  async createBlog(data: AddBlogRequest): Promise<boolean> {
    return this.database
      .query(
        'INSERT INTO blogs ("title", "summary", "image", "date", "externalLink", "HTMLString")\
         VALUES ($1, $2, $3, $4, $5, $6)',
        [
          data.title,
          data.summary,
          data.image,
          data.date,
          data.externalLink,
          data.HTMLString,
        ],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async deleteBlog(id: number): Promise<boolean> {
    return this.database
      .query('DELETE FROM blogs WHERE id = $1', [id])
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async updateBlog(data: UpdateBlogRequest): Promise<boolean> {
    return this.database
      .query(
        `UPDATE blogs SET "title" = $1, "summary" = $2,
         "image" = $3, "date" = $4, "externalLink" = $5, 
         "HTMLString" = $6 WHERE id = $7`,
        [
          data.title,
          data.summary,
          data.image,
          data.date,
          data.externalLink,
          data.HTMLString,
          data.id,
        ],
      )
      .then((res) => {
        return res.rowCount > 0;
      });
  }

  async getBlogHtmlString(id: number): Promise<{ HTMLString: string }> {
    return this.database
      .query(`SELECT "HTMLString" FROM blogs WHERE id = $1`, [id])
      .then((res) => {
        return res.rows[0];
      });
  }
}
