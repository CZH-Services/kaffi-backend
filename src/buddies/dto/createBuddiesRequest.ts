import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBuddiesRequest {
  @ApiProperty({ required: true, example: 1 })
  @IsNotEmpty({ message: 'buddyId is required' })
  @IsNumber()
  buddyId: number;

  @ApiProperty({ required: true, example: 1 })
  @IsNotEmpty({ message: 'studentId is required' })
  @IsNumber()
  studentId: number;
}
