import { Injectable } from '@nestjs/common';
import { CreateFaq } from './dto/createFaq';
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
}
