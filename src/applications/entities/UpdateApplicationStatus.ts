import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Status } from './Status';

export class UpdateApplication {
  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'id is required' })
  @IsNumber()
  id: number;

  @ApiProperty({ example: '239487234' })
  @IsNotEmpty({ message: 'Application id is required' })
  @IsString({ message: 'Application id must be a string' })
  applicationId: string;

  @ApiProperty({ example: Status.Approved })
  @IsNotEmpty({ message: 'Application status is required' })
  @IsString({ message: 'Application status must be a string' })
  applicationStatus: string;

  @ApiProperty({ example: Status.Rejected })
  @IsNotEmpty({ message: 'Scholarship status is required' })
  @IsString({ message: 'Scholarship status must be a string' })
  scholarshipStatus: string;
}
