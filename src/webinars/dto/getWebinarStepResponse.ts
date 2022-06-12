import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetWebinarStepResponse {
  id: number;
  rank: number;
  title: Object;
  paragraph: Object;
  webinarId: number;
}
