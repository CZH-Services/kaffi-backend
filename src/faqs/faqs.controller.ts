import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateFaq } from './dto/createFaq';
import { FAQResponse } from './faqs.response';
import { FAQService } from './faqs.service';

@ApiTags('Faqs')
@Controller('faqs')
export class FAQController {
  constructor(private readonly faqService: FAQService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get FAQs' })
  @ApiResponse({ status: 200, type: [FAQResponse] })
  async getFaqs(): Promise<FAQResponse[]> {
    return await this.faqService.getFaqs();
  }

  @Post('/create')
  @ApiOperation({ summary: 'Create FAQ' })
  @ApiResponse({ status: 200, type: [FAQResponse] })
  async createFaq(@Body() faq: CreateFaq): Promise<void> {
    return await this.faqService.createFaq(faq);
  }
}
