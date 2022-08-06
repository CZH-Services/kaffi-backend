import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async getMaxRankOfFaqs(id: Number): Promise<Number> {
    const rank = this.faqRepository.getHighestFAQRank(id);
    return await rank;
  }

  async createFaq(faq: CreateFaq): Promise<boolean> {
    const rank = await this.faqRepository.getHighestFAQRank(faq.category_id);
    const newfaq = <FAQ>faq;
    newfaq.rank = rank + 1;

    const created = await this.faqRepository.createFaq(<FAQ>newfaq);
    if (!created) {
      throw new NotFoundException('FAQ could not be created');
    }
    return created;
  }

  async updateFaq(updatedfaq: UpdateFaq): Promise<boolean> {
    const faq = await this.faqRepository.getFaq(updatedfaq.id);
    const maxRank = await this.faqRepository.getHighestFAQRank(faq.category_id);

    if (updatedfaq.rank > maxRank || updatedfaq.rank <= 0) {
      throw new ForbiddenException('Invalid rank');
    }

    if (updatedfaq.rank !== faq.rank) {
      const increment = updatedfaq.rank > faq.rank;
      const minRank = increment ? faq.rank + 1 : updatedfaq.rank;
      const maxRank = increment ? updatedfaq.rank : faq.rank - 1;
      await this.faqRepository.updateFAQRanks(
        faq.category_id,
        minRank,
        maxRank,
        !increment,
      );
    }

    const updated = await this.faqRepository.updateFaq(<FAQ>updatedfaq);

    if (!updated) {
      throw new NotFoundException('FAQ not found');
    }
    return updated;
  }

  async deleteFaq(id: number): Promise<boolean> {
    const faq = await this.faqRepository.getFaq(id);
    await this.faqRepository.decreaseFaqRanks(faq.category_id, faq.rank);

    const deleted = await this.faqRepository.deleteFaq(id);
    if (!deleted) {
      throw new NotFoundException('FAQ not found');
    }

    return deleted;
  }
}
