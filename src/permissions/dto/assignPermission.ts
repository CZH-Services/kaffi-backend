import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class AssignPermission {
  @ApiProperty({ example: 1, required: true })
  @IsInt({ message: 'User ID must be an integer' })
  readonly userId: number;

  @ApiProperty({ example: 1, required: true })
  @IsInt({ message: 'Role ID must be an integer' })
  readonly roleId: number;

  @ApiProperty({ example: 1, required: true })
  @IsInt({ message: 'Committee ID must be an integer' })
  readonly committeeId: number;
}
