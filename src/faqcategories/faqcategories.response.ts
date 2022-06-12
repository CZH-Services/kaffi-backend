import { ApiProperty } from '@nestjs/swagger';

export class FAQCategoryResponse {
  @ApiProperty({ example: { en: 'Volunteering' } })
  name: JSON;

  @ApiProperty({ example: 3 })
  rank: number;
}
