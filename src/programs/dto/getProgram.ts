import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class GetProgram {
  @ApiProperty({ example: 1 })
  @IsNumberString({ message: 'Program id must be a number' })
  id: number;
}
