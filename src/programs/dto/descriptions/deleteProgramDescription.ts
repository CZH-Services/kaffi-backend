import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class DeleteProgramDescription {
  @ApiProperty({ example: 1 })
  @IsNumberString({ message: 'Program description id must be a number' })
  id: number;
}
