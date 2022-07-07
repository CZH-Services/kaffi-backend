import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class PermissionResponse {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1, required: true })
  readonly userId: number;

  @ApiProperty({ example: 'Admin', required: true })
  @IsString({ message: 'Role must be a string' })
  readonly role: string;

  @ApiProperty({ example: 'Finance', required: true })
  @IsString({ message: 'Committee must be a string' })
  readonly committee: string;

  @ApiProperty({ example: 'true', required: true })
  @IsOptional()
  @IsBoolean({ message: 'isCommitteeHead must be a boolean' })
  isCommitteeHead: boolean;
}
