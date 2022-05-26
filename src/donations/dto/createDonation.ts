import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateDonation {
  @ApiProperty({ example: 'Zeinab Zeitoun', required: true })
  @IsString({ message: 'Name should be a string' })
  @IsNotEmpty({ message: "Name shouldn't be empty" })
  readonly name: string;

  @ApiProperty({ example: 20, required: true })
  @IsInt({ message: 'Amount should be a number' })
  @Min(5, {
    message: 'Minimum amount to donate should be bigger or equal to 5',
  })
  readonly amount: number;
}
