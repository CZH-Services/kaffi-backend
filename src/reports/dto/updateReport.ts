import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateReport {
  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'id is required' })
  id: number;

  @ApiProperty({
    required: false,
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

  @ApiProperty({
    required: true,
    example: true,
    type: Boolean,
  })
  @IsNotEmpty({ message: 'Show should not be a empty' })
  show: boolean;
}
