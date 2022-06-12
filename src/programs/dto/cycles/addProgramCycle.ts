import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class AddProgramCycle {
  @ApiProperty({ type: Number, example: 1, required: true })
  @IsInt({ message: 'Program id must be a number' })
  programId: number;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'Fall' }),
    required: true,
  })
  name: object;

  @ApiProperty({ type: Boolean, example: true, required: true })
  @IsBoolean({ message: 'Is active must be a boolean' })
  active: boolean;

  @ApiProperty({ type: Date, example: new Date(), required: true })
  @IsDateString({ message: 'Submission date must be a date' })
  submission: Date;

  @ApiProperty({ type: Date, example: new Date(), required: true })
  @IsDateString({ message: 'Deadline date must be a date' })
  deadline: Date;

  @ApiProperty({ type: Date, example: new Date(), required: true })
  @IsDateString({ message: 'Results date must be a date' })
  results: Date;
}
