import { ApiProperty } from '@nestjs/swagger';

export class PermissionResponse {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1, required: true })
  readonly userId: number;

  @ApiProperty({ example: 1, required: true })
  readonly roleId: number;

  @ApiProperty({ example: 1, required: true })
  readonly committeeId: number;
}
