import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { IsMultiLingual } from 'src/validations/MultiLanguageValidations';

export class GetProgramNamesAndIds {
  @ApiProperty({ type: Number, name: 'id', required: true, example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({
    type: Object,
    example: { en: 'Kaffi-Launch', de: 'Kaffi-Launch de' },
    required: true,
  })
  @IsMultiLingual({ message: 'Program name must be a multilingual object' })
  name: Object;
}
