import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class DeleteCommittee {
  @ApiProperty({ example: 1, type: Number })
  @IsNumberString({ message: 'Id should be a number ' })
  id: number;
}
