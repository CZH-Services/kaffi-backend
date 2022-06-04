import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsInt } from 'class-validator';

export class UpdateProgramCycle {
  @ApiProperty({ type: Number, example: 1, required: true })
  @IsInt({ message: 'Cycle id must be a number' })
  id: number;

  @ApiProperty({ type: Number, example: 1, required: true })
  @IsInt({ message: 'Program id must be a number' })
  programId: number;

  @ApiProperty({ type: Boolean, example: true, required: true })
  @IsBoolean({ message: 'Is active must be a boolean' })
  active: boolean;

  @ApiProperty({ type: Date, example: new Date(), required: true })
  @IsDate({ message: 'Submission date must be a date' })
  submission: Date;

  @ApiProperty({ type: Date, example: new Date(), required: true })
  @IsDate({ message: 'Deadline date must be a date' })
  deadline: Date;

  @ApiProperty({ type: Date, example: new Date(), required: true })
  @IsDate({ message: 'Results date must be a date' })
  results: Date;
}
