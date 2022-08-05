import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetLandingInfo } from './dto/GetLandingInfo';
import { LandingService } from './Landing.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Landing')
@Controller('landing')
export class LandingController {
  constructor(private readonly landingServices: LandingService) {}

  @Get()
  @ApiOperation({ summary: 'Get landing info' })
  @ApiResponse({
    status: 200,
    description: 'landing info record',
    type: GetLandingInfo,
  })
  async getLandingInformation(): Promise<GetLandingInfo> {
    return await this.landingServices.getLandingInformation();
  }
}
