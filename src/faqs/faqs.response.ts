import { ApiProperty } from '@nestjs/swagger';

export class FAQResponse {
  @ApiProperty({ example: {en: "Question in English" , ar: "Question in Arabic"} })
  question: JSON;

  @ApiProperty({example: {en: "Answer in English" , ar: "Question in Arabic"}})
  answer: JSON

  @ApiProperty({ example: 3,})
  rank: number;

  @ApiProperty({ example: 3,})
  category_id: number;
}