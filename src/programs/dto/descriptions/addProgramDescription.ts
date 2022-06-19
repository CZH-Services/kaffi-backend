import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { IsMultiLingual } from 'src/validations/MultiLanguageValidations';

export class AddProgramDescription {
  @ApiProperty({ type: Number, example: 1, required: true })
  @IsInt({ message: 'Program id must be a number' })
  programId: number;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'A program description' }),
    required: true,
  })
  @IsMultiLingual({ message: 'Program description should be multi-lingual' })
  description: Object;
}
