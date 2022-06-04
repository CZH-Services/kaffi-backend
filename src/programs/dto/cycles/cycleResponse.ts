import { ApiProperty } from '@nestjs/swagger';

export class CycleResponse {
  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @ApiProperty({ type: Number, example: 1 })
  programId: number;

  @ApiProperty({ type: Boolean, example: 1 })
  active: boolean;

  @ApiProperty({ type: Date, example: '2020-01-01' })
  submission: Date;

  @ApiProperty({ type: Date, example: '2020-01-01' })
  deadline: Date;

  @ApiProperty({ type: Date, example: '2020-01-01' })
  results: Date;
}