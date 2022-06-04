import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class GetProgramCycle {
  @ApiProperty({ type: Number, name: 'programId', example: 1, required: true })
  @IsNumberString({ message: 'Program id must be a number' })
  programId: number;
}
