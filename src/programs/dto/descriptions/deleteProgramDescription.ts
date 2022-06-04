import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class DeleteProgramDescription {
  @ApiProperty({ name: 'id', example: 1, required: true })
  @IsNumberString({ message: 'Program description id must be a number' })
  id: number;
}
