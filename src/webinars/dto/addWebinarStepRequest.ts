import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IsMultiLingual } from 'src/validations/MultiLanguageValidations';

export class AddWebinarStepRequest {
  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'Webinar id is required' })
  webinarId: number;

  @ApiProperty({ example: { en: 'Prepare documents' } })
  @IsNotEmpty({ message: 'Webinar title is required' })
  @IsMultiLingual({ message: 'Webinar title should be multi-lingual' })
  title: Object;

  @ApiProperty({ example: { en: 'This is how you prepare for documents' } })
  @IsNotEmpty({ message: 'Webinar paragraph is required' })
  @IsMultiLingual({ message: 'Webinar paragraph should be multi-lingual' })
  paragraph: Object;
}
