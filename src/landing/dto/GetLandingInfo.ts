import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetLandingInfo {
  @ApiProperty({ example: 27000 })
  @IsNotEmpty({ message: 'donations is required' })
  @IsString({ message: 'donations must be a string' })
  donations: string;

  @ApiProperty({
    example: 100,
  })
  @IsNotEmpty({ message: "volunteers number shouldn't be empty" })
  @IsNumber()
  volunteers: number;

  @ApiProperty({
    example: 100,
  })
  @IsNotEmpty({
    message: "scholarship recipients number shouldn't be empty",
  })
  @IsNumber()
  scholarshipRecipients: number;
}
