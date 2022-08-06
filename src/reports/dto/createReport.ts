import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateReport {
  @ApiProperty({
    required: true,
    example:
      'https://drive.google.com/file/d/1tDlbVR9JDEDhB_lL-aprjeK11iAalaIR/view',
  })
  @IsString({ message: 'externalLink should be a string' })
  externalLink: string;

  @ApiProperty({
    type: String,
    format: 'binary',
    required: true,
    name: 'image',
  })
  image: string;
}
