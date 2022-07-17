import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsMultiLingual } from 'src/validations/MultiLanguageValidations';
import { GetBlogResponse } from './blogResponse';

export class GetBlogResponseForAdmin extends GetBlogResponse {
  @ApiProperty({
    example: {
      en: '<div>html string here</div>',
      de: '<div>html string here</div>',
    },
  })
  @IsMultiLingual({ message: 'HTMLString must be multilingual' })
  @IsNotEmpty({ message: 'HTMLString is required' })
  HTMLString: object;
}
