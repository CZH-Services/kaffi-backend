import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class AssignPermission {
  @ApiProperty({ example: 1, required: true })
  @IsInt({ message: 'User ID must be an integer' })
  readonly userId: number;

  @ApiProperty({ example: 1, required: true })
  @IsString({ message: 'Role must be a string' })
  readonly role: string;

  @ApiProperty({ example: 1, required: true })
  @IsString({ message: 'Committee must be a string' })
  readonly committee: string;
}
