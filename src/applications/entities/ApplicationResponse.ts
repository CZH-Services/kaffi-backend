import { ApiProperty } from '@nestjs/swagger';
import { Status } from './Status';

export class ApplicationResponse {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '40392843209' })
  applicationId: string;

  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 'Hussein Khamis' })
  fullname: string;

  @ApiProperty({ example: 1 })
  programId: number;

  @ApiProperty({ example: 'Program 1' })
  programname: string;

  @ApiProperty({ example: 1 })
  cycleId: number;

  @ApiProperty({ example: 'Cycle 1' })
  cyclename: string;

  @ApiProperty({ example: Status.Approved })
  applicationStatus: string;

  @ApiProperty({ example: Status.Approved })
  scholarshipStatus: string;
}
