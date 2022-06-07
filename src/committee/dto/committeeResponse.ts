import { ApiProperty } from '@nestjs/swagger';

export class CommitteeResponse {
  @ApiProperty({ example: 'Finance' })
  name: string;

  @ApiProperty({ example: 1 })
  id: number;
}
