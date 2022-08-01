import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Status } from './Status';

export class UpdateApplicationStatus {
  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'id is required' })
  @IsNumber()
  id: number;

  @ApiProperty({ example: Status.Approved })
  @IsNotEmpty({ message: 'Application status is required' })
  @IsString({ message: 'Application status must be a string' })
  status: string;
}
