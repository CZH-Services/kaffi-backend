import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateWebinarStepRequest {
  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'Id is required ' })
  id: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'rank is required ' })
  rank: number;

  @ApiProperty({ example: { en: 'Prepare documents' } })
  @IsNotEmpty({ message: 'title is required ' })
  title: Object;

  @ApiProperty({ example: { en: 'This is how you prepare for documents' } })
  @IsNotEmpty({ message: 'paragraph is required ' })
  paragraph: Object;
}
