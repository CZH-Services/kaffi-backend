import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class GetProgramDescriptions {
  @ApiProperty({
    type: Number,
    name: 'programId',
    example: 20,
    required: true,
  })
  @IsNumberString({ message: 'Please enter a valid program id' })
  programId: number;
}
