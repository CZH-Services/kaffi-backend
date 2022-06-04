import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNumberString } from 'class-validator';

export class AddProgramCycle {
  @ApiProperty({ example: 1 })
  @IsNumberString({ message: 'Program id must be a number' })
  programId: number;

  @ApiProperty({ example: true })
  @IsBoolean({ message: 'Is active must be a boolean' })
  active: boolean;

  @ApiProperty({ example: new Date() })
  @IsDate({ message: 'Submission date must be a date' })
  submission: Date;

  @ApiProperty({ example: new Date() })
  @IsDate({ message: 'Deadline date must be a date' })
  deadline: Date;

  @ApiProperty({ example: new Date() })
  @IsDate({ message: 'Results date must be a date' })
  results: Date;
}
