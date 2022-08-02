import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class DeleteStory {
  @ApiProperty({ type: Number, name: 'id', example: 1, required: true })
  @IsNumberString({ message: 'Story id must be a number' })
  id: number;
}
