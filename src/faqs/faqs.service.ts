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

  async getFaqsofCategory(id: Number): Promise<FAQResponse[]> {
    const faqs = this.faqRepository.getFaqsOfCategory(id);

    return (await faqs).map((faq) => <FAQResponse>faq);
  }

  async createFaq(faq: CreateFaq): Promise<boolean> {
    const created = await this.faqRepository.createFaq(<FAQ>faq);
    if (!created) {
      throw new NotFoundException('FAQ could not be created');
    }
    return created;
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
