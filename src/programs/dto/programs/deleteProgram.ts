import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class DeleteProgram {
  @ApiProperty({ type: Number, name: 'id', example: 1, required: true })
  @IsNumberString({ message: 'Program id must be a number' })
  id: number;
}
