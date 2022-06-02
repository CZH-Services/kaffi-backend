import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddWebinarStepRequest {
  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'Webinar id is required' })
  webinarId: number;

  @ApiProperty({ example: { en: 'Prepare documents' } })
  @IsNotEmpty({ message: 'Webinar title is required' })
  title: Object;

  @ApiProperty({ example: { en: 'This is how you prepare for documents' } })
  @IsNotEmpty({ message: 'Webinar paragraph is required' })
  paragraph: Object;
}
