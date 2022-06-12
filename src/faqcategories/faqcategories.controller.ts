import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createFaqCategory } from './dto/createFaqCategory';
import { DeleteFaqCategory } from './dto/deleteFaqCategory';
import { updateFaqCategory } from './dto/updateFaqCategory';
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

  @Post('/create')
  @ApiOperation({ summary: 'Create an FAQ Category' })
  @ApiResponse({ status: 200, type: [FAQCategoryResponse] })
  async createFaq(@Body() category: createFaqCategory): Promise<boolean> {
    return await this.faqcategoryservice.createFaqCategory(category);
  }

  @Put()
  @ApiOperation({ summary: 'Update an FAQ Category' })
  @ApiResponse({
    status: 200,
    description: 'FAQ Category updated',
    type: Boolean,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async update(@Body() category: updateFaqCategory): Promise<boolean> {
    return this.faqcategoryservice.updateFaqCategory(category);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete an FAQ Category' })
  @ApiResponse({
    status: 200,
    description: 'FAQ Category deleted',
    type: Boolean,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async delete(@Param() id: DeleteFaqCategory): Promise<boolean> {
    return this.faqcategoryservice.deleteFaqCategory(id.id);
  }
}
