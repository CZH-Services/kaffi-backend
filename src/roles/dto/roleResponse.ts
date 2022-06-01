import { ApiProperty } from '@nestjs/swagger';

export class RoleResponse {
  @ApiProperty({ example: 'Admin' })
  name: string;

  @ApiProperty({ example: 1 })
  id: number;
}
