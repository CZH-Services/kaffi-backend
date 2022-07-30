import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetBuddiesResponse {
  @ApiProperty({ required: true, example: 1 })
  @IsNotEmpty({ message: 'id is required' })
  @IsNumber()
  id: number;

  @ApiProperty({ required: true, example: 1 })
  @IsNotEmpty({ message: 'buddyId is required' })
  @IsNumber()
  buddyId: number;

  @ApiProperty({ required: true, example: 'John Doe' })
  @IsNotEmpty({ message: 'buddy Name is required' })
  @IsString({ message: 'buddy Name should be a string' })
  buddyFullName: string;

  @ApiProperty({ required: true, example: 'JohnDoe@gmail.com' })
  @IsNotEmpty({ message: 'buddy email is required' })
  @IsString({ message: 'buddy email should be a string' })
  buddyEmail: string;

  @ApiProperty({ required: true, example: 1 })
  @IsNotEmpty({ message: 'buddyId is required' })
  @IsNumber()
  studentId: number;

  @ApiProperty({ required: true, example: 'John Doe' })
  @IsNotEmpty({ message: 'studentName is required' })
  @IsString({ message: 'studentName should be a string' })
  studentFullName: string;

  @ApiProperty({ required: true, example: 'JohnDoe@gmail.com' })
  @IsNotEmpty({ message: 'student email is required' })
  @IsString({ message: 'student email should be a string' })
  studentEmail: string;

  @ApiProperty({ required: true, example: 1 })
  @IsNotEmpty({ message: 'buddyId is required' })
  @IsNumber()
  connectedBy: number;

  @ApiProperty({ required: true, example: 'John Doe' })
  @IsNotEmpty({ message: 'connectedBy name is required' })
  @IsString({ message: 'connectedBy name should be a string' })
  connectedByName: string;

  @ApiProperty({ required: true, example: 'JohnDoe@gmail.com' })
  @IsNotEmpty({ message: 'connectedBy email is required' })
  @IsString({ message: 'connectedBy email should be a string' })
  connectedByEmail: string;
}
