import { ApiProperty } from '@nestjs/swagger';
export class DeleteWebinarRequest {
  @ApiProperty({ example: 1 })
  id: number;
}
