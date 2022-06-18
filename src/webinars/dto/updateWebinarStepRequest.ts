import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IsMultiLingual } from 'src/validations/MultiLanguageValidations';

export class UpdateWebinarStepRequest {
  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'Id is required ' })
  id: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'rank is required ' })
  rank: number;

  @ApiProperty({ example: { en: 'Prepare documents' } })
  @IsNotEmpty({ message: 'title is required ' })
  @IsMultiLingual({ message: 'title has missing language(s) translation' })
  title: Object;

  @ApiProperty({ example: { en: 'This is how you prepare for documents' } })
  @IsNotEmpty({ message: 'paragraph is required ' })
  @IsMultiLingual({ message: 'paragraph has missing language(s) translation' })
  paragraph: Object;
}
