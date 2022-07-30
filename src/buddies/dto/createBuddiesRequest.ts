import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBuddiesRequest {
  @ApiProperty({ required: true, example: 1 })
  @IsNotEmpty({ message: 'buddyId is required' })
  @IsNumber()
  buddyId: number;

  @ApiProperty({ required: true, example: 1 })
  @IsNotEmpty({ message: 'buddyId is required' })
  @IsNumber()
  studentId: number;

  @ApiProperty({ required: true, example: 1 })
  @IsNotEmpty({ message: 'buddyId is required' })
  @IsNumber()
  connectedBy: number;
}
