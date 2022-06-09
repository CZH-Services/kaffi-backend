import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FAQCategoryResponse } from './faqcategories.response';
import { FAQCategoryService } from './faqcategories.service';

@ApiTags('FAQ Categories')
@Controller('faq-categories')
export class FAQCategoryController {
  constructor(private readonly faqcategoryservice: FAQCategoryService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get all FAQ Categories' })
  @ApiResponse({ status: 200, type: 'here' })
  async getFAQCategories(): Promise<FAQCategoryResponse[]> {
    return await this.faqcategoryservice.getFAQCategories();
  }
}
