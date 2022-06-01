import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommittee {
  @ApiProperty({ example: 'Finance', required: true })
  @IsString({ message: 'Name should be a string' })
  @IsNotEmpty({ message: "Name shouldn't be empty" })
  readonly name: string;
}
