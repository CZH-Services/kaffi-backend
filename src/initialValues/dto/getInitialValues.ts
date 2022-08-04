import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetInitialValues {
  @ApiProperty({
    example: 100,
  })
  @IsNotEmpty({ message: "volunteers initial number shouldn't be empty" })
  @IsNumber()
  volunteers: number;

  @ApiProperty({
    example: 100,
  })
  @IsNotEmpty({
    message: "scholarship recipients initial number shouldn't be empty",
  })
  @IsNumber()
  scholarshipRecipients: number;
}
