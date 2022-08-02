import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddApplication {
  @ApiProperty({ example: 8 })
  @IsNotEmpty({ message: 'userId is required' })
  @IsNumber()
  userId: number;

  @ApiProperty({ example: '3239487239847' })
  @IsNotEmpty({ message: 'applicationId is required' })
  @IsString({ message: 'applicationId must be a string' })
  applicationId: string;

  @ApiProperty({ example: 28 })
  @IsNotEmpty({ message: 'programId is required' })
  @IsNumber()
  programId: number;

  @ApiProperty({ example: 8 })
  @IsNotEmpty({ message: 'cycleId is required' })
  @IsNumber()
  cycleId: number;
}
