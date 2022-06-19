import { ApiProperty } from '@nestjs/swagger';
import { IsMultiLingual } from 'src/validations/MultiLanguageValidations';

export class InsertCountryRequest {
  @ApiProperty({ example: { en: 'Lebanon' } })
  @IsMultiLingual({ message: 'Country name should be multi-lingual' })
  name: Object;
}
