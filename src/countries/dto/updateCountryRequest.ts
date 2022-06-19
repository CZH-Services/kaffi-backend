import { ApiProperty } from '@nestjs/swagger';
import { IsMultiLingual } from 'src/validations/MultiLanguageValidations';

export class UpdateCountryRequest {
  @ApiProperty()
  id: number;

  @ApiProperty({ example: JSON.stringify({ en: 'Lebanon' }) })
  @IsMultiLingual({ message: 'Country name should be multi-lingual' })
  name: Object;
}
