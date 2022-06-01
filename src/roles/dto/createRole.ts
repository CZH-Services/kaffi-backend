import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRole {
  @ApiProperty({ example: 'Admin', required: true })
  @IsString({ message: 'Name should be a string' })
  @IsNotEmpty({ message: "Name shouldn't be empty" })
  readonly name: string;
}
