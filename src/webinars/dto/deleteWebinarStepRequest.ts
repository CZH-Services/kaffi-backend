import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class DeleteWebinarStepRequest {
  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'id is required' })
  id: number;
}
