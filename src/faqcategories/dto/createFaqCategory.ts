import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class createFaqCategory {
  @ApiProperty({
    example: { en: 'Volunteering' },
    required: true,
  })
  @IsNotEmpty({ message: "Name shouldn't be empty" })
  readonly name: JSON;
}
