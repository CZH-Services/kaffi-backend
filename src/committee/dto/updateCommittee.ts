import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateCommittee {
  @ApiProperty({ example: 'Social Media', required: true })
  @IsString({ message: 'Name should be a string' })
  @IsNotEmpty({ message: "Name shouldn't be empty" })
  readonly name: string;

  @ApiProperty({ example: 20, required: true })
  @IsInt({ message: 'Please enter a valid id' })
  readonly id: number;
}
