import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class AssignPermission {
  @ApiProperty({ example: 1, required: true })
  @IsInt({ message: 'User ID must be an integer' })
  readonly userId: number;

  @ApiProperty({ example: 'Admin', required: true })
  @IsString({ message: 'Role must be a string' })
  readonly role: string;

  @ApiProperty({ example: 'Finance', required: true })
  @IsOptional()
  @IsString({ message: 'Committee must be a string' })
  readonly committee: string;

  @ApiProperty({ example: 'true', required: true })
  @IsOptional()
  @IsBoolean({ message: 'isCommitteeHead must be a boolean' })
  isCommitteeHead: boolean;
}
