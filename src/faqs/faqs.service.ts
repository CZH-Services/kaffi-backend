import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFaq } from './dto/createFaq';
import { UpdateFaq } from './dto/updateFaq';
import { FAQ } from './entities/faq';
import { FAQRepository } from './faqs.repository';
import { FAQResponse } from './faqs.response';

@Injectable()
export class FAQService {
  constructor(private readonly faqRepository: FAQRepository) {}

  async getFaqs(): Promise<FAQResponse[]> {
    const faqs = this.faqRepository.getFaqs();

    return (await faqs).map((faq) => <FAQResponse>faq);
  }

  async createFaq(faq: CreateFaq): Promise<void> {
    await this.faqRepository.createFaq(<FAQ>faq);
  }

  async updateFaq(faq: UpdateFaq): Promise<boolean> {
    const updated = await this.faqRepository.updateFaq(<FAQ>faq);
    if (!updated) {
      throw new NotFoundException('FAQ not found');
    }
    return updated;
  }

  async deleteFaq(id: number): Promise<boolean> {
    const deleted = await this.faqRepository.deleteFaq(id);
    if (!deleted) {
      throw new NotFoundException('FAQ not found');
    }
    return deleted;
  }
}
