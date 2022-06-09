import { Injectable } from '@nestjs/common';
import { FAQCategoryRepository } from './faqcategories.repository';
import { FAQCategoryResponse } from './faqcategories.response';

@Injectable()
export class FAQCategoryService {
  constructor(private readonly faqcategoryrepository: FAQCategoryRepository) {}

  async getFAQCategories(): Promise<FAQCategoryResponse[]> {
    const faqcategories = this.faqcategoryrepository.getFaqCategories();
    return (await faqcategories).map(
      (faqcategory) => <FAQCategoryResponse>faqcategory,
    );
  }
}
