import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IsAdminGuard } from 'src/guards/isAdmin.guard';
import { CreateFaq } from './dto/createFaq';
import { DeleteFaq } from './dto/deleteFaq';
import { getFaqsOfCategory } from './dto/getsFaqsofCategory';
import { UpdateFaq } from './dto/updateFaq';
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

  @ApiBearerAuth()
  @UseGuards(IsAdminGuard)
  @Post('/create')
  @ApiOperation({ summary: 'Create FAQ' })
  @ApiResponse({ status: 200, type: [FAQResponse] })
  async createFaq(@Body() faq: CreateFaq): Promise<boolean> {
    return await this.faqService.createFaq(faq);
  }

  @Get('/category-faqs/:id')
  @ApiOperation({ summary: 'Get all FAQs of a certain FAQ Category' })
  @ApiResponse({
    status: 200,
    description: 'FAQs of Category',
    type: Boolean,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getFaqsofCategory(
    @Param() id: getFaqsOfCategory,
  ): Promise<FAQResponse[]> {
    return this.faqService.getFaqsofCategory(id.id);
  }

  @Get('/category-faqs/max-rank/:id')
  @ApiOperation({
    summary: 'Gets the max rank for FAQs of a certain FAQ Category',
  })
  @ApiResponse({
    status: 200,
    description: 'Max rank for FAQs',
    type: Boolean,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getMaxFaqRank(id: Number): Promise<Number> {
    return this.faqService.getMaxRankOfFaqs(id);
  }

  @ApiBearerAuth()
  @UseGuards(IsAdminGuard)
  @Delete('/:id')
  @ApiOperation({ summary: 'Delete an FAQ' })
  @ApiResponse({
    status: 200,
    description: 'FAQ Category',
    type: Boolean,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async delete(@Param() id: DeleteFaq): Promise<boolean> {
    return this.faqService.deleteFaq(id.id);
  }

  @ApiBearerAuth()
  @UseGuards(IsAdminGuard)
  @Put('/:id')
  @ApiOperation({ summary: 'Update an FAQ' })
  @ApiResponse({
    status: 200,
    description: 'FAQ updated',
    type: Boolean,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async update(@Body() faq: UpdateFaq): Promise<boolean> {
    return this.faqService.updateFaq(faq);
  }
}
