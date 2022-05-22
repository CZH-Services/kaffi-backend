import { ApiProperty } from '@nestjs/swagger';

export class CreateDonation {
  @ApiProperty({ example: 'Zeinab Zeitoun', required: true })
  readonly name: string;

  @ApiProperty({ example: 20, required: true })
  readonly amount: number;
}
