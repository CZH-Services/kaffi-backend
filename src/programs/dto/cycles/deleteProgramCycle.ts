import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class DeleteProgramCycle {
  @ApiProperty({ type: Number, name: 'id', example: 1, required: true })
  @IsNumberString({ message: 'Cycle id must be a number' })
  id: number;
}
