import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class getFaqsOfCategory {
  @ApiProperty({
    example: 1,
    required: true,
  })
  @IsNotEmpty({ message: "ID shouldn't be empty" })
  readonly id: Number;
}
